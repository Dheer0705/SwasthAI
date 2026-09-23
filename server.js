import express from "express";
import cors from "cors";
import { patients, drugRules, knownDrugs } from "./data.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

function findPatient(abhaId) {
  return patients.find((p) => p.abhaId === abhaId);
}

// --- Auth: mock ABHA login (Aadhaar-linked ID + OTP) ---
app.post("/api/login/request-otp", (req, res) => {
  const { abhaId } = req.body;
  const patient = findPatient(abhaId);
  if (!patient) return res.status(404).json({ error: "No ABHA ID found with that number." });
  // In production this would trigger an Aadhaar-linked mobile OTP via UIDAI/ABDM gateway.
  res.json({ message: "OTP sent to Aadhaar-linked mobile number.", demoOtp: patient.otp });
});

app.post("/api/login/verify-otp", (req, res) => {
  const { abhaId, otp } = req.body;
  const patient = findPatient(abhaId);
  if (!patient) return res.status(404).json({ error: "No ABHA ID found with that number." });
  if (otp !== patient.otp) return res.status(401).json({ error: "Incorrect OTP." });
  const { otp: _omit, ...safePatient } = patient;
  res.json({ patient: safePatient });
});

// --- Full patient profile (for patient dashboard / doctor view, consent assumed granted) ---
app.get("/api/patient/:abhaId", (req, res) => {
  const patient = findPatient(req.params.abhaId);
  if (!patient) return res.status(404).json({ error: "Patient not found." });
  const { otp: _omit, ...safePatient } = patient;
  res.json(safePatient);
});

app.get("/api/patients", (req, res) => {
  res.json(patients.map(({ otp, ...p }) => ({ abhaId: p.abhaId, name: p.name, age: p.age, photo: p.photo })));
});

app.get("/api/drugs", (req, res) => {
  res.json(knownDrugs);
});

// --- Real-time allergy / interaction check when a doctor enters a prescription ---
app.post("/api/prescribe/check", (req, res) => {
  const { abhaId, drugName } = req.body;
  const patient = findPatient(abhaId);
  if (!patient) return res.status(404).json({ error: "Patient not found." });

  const alerts = [];
  const rule = drugRules.find((r) => r.drug.toLowerCase() === String(drugName).toLowerCase());

  if (rule) {
    if (rule.allergyTriggers) {
      const hasAllergy = patient.allergies.some((a) => rule.allergyTriggers.includes(a.substance));
      if (hasAllergy) alerts.push({ type: "allergy", severity: rule.severity, message: rule.message });
    }
    if (rule.conditionTriggers) {
      const hasCondition = patient.chronicConditions.some((c) => rule.conditionTriggers.includes(c));
      if (hasCondition) alerts.push({ type: "condition", severity: rule.severity, message: rule.message });
    }
    if (rule.medicationTriggers) {
      const hasMed = patient.currentMedications.some((m) => rule.medicationTriggers.includes(m.name));
      if (hasMed) alerts.push({ type: "interaction", severity: rule.severity, message: rule.message });
    }
  }

  res.json({
    drugName,
    patientName: patient.name,
    safe: alerts.length === 0,
    alerts
  });
});

// --- Emergency access: no OTP required, returns only critical info (simulates QR scan in ER) ---
app.get("/api/emergency/:abhaId", (req, res) => {
  const patient = findPatient(req.params.abhaId);
  if (!patient) return res.status(404).json({ error: "Patient not found." });
  res.json({
    name: patient.name,
    age: patient.age,
    gender: patient.gender,
    bloodGroup: patient.bloodGroup,
    allergies: patient.allergies,
    chronicConditions: patient.chronicConditions,
    currentMedications: patient.currentMedications.map((m) => m.name)
  });
});

app.listen(PORT, () => {
  console.log(`SIH Health-ID backend running on http://localhost:${PORT}`);
});
