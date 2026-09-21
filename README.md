# SwasthID — Unified Health Record & Real-Time Safety Alerts

SIH prototype: an Aadhaar-linked digital health ID (built on the existing ABHA/ABDM model)
that adds two things ABHA doesn't currently do — **real-time allergy/drug-interaction alerts**
at the point of prescribing, and a **no-login emergency access mode** for critical care.

This is a demo/prototype using mock data — it does **not** call real Aadhaar/ABHA/UIDAI APIs.

## What's built (MVP)

1. **Mock ABHA login** — enter a demo ABHA ID, OTP is always `1234`.
2. **Patient dashboard** — allergies, chronic conditions, current medications, visit history.
3. **Doctor prescribing view** — pick a patient, type a medicine, get an instant
   allergy/interaction/condition-conflict alert (or a "safe to prescribe" confirmation).
   This is the core demo moment — the health-ID card itself changes color (teal → red/green)
   when a conflict is found.
4. **Emergency access mode** — no login required, simulates scanning a patient's QR/ID card
   to pull up only critical info (blood group, allergies, conditions, meds) — for use when a
   patient is unconscious or unaccompanied.

**Not built (mention as future roadmap in your pitch):** rural/offline SMS mode, small clinic
onboarding flow, real ABDM/UIDAI API integration.

## Try it — demo script

1. Log in as **Ramesh Iyer** (`14-1234-5678-9012`, OTP `1234`) — he has a severe penicillin allergy.
2. Go to **Doctor View**, select Ramesh, type **Amoxicillin** → watch the red alert fire and the
   ID card glow red. This is your strongest live-demo moment.
3. Try **Paracetamol** instead for the same patient → green "no conflicts" state.
4. Go to **Emergency** and enter Ramesh's ABHA ID without logging in — shows only critical info,
   simulating an ER doctor scanning his card.

## Running locally

Requires Node.js 18+.

### 1. Backend
```bash
cd backend
npm install
npm start
```
Runs on `http://localhost:4000`.

### 2. Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`. Open that URL in your browser.

## Project structure
```
backend/
  server.js       # Express API: login, patient profile, prescription check, emergency access
  data.js         # Mock patients + drug/allergy interaction rules — edit this to add demo cases
frontend/
  src/
    pages/        # Login, Dashboard, DoctorPrescribe, Emergency
    components/   # HealthCard — the reusable ID-card visual used across all screens
    api.js        # fetch wrappers for the backend
```

## Extending the interaction rules
Add more demo cases in `backend/data.js` under `drugRules` — each rule can trigger off
`allergyTriggers`, `conditionTriggers`, or `medicationTriggers`.
