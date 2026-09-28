// Mock data simulating what would live in ABHA / ABDM health records.
// In a real system this would come from the Health Information Exchange (HIE-CM).

export const patients = [
  {
    abhaId: "14-1234-5678-9012",
    name: "Ramesh Iyer",
    age: 58,
    gender: "Male",
    bloodGroup: "B+",
    photo: "RI",
    otp: "1234",
    allergies: [
      { substance: "Penicillin", severity: "Severe", reaction: "Anaphylaxis" },
      { substance: "Peanuts", severity: "Moderate", reaction: "Hives, swelling" }
    ],
    chronicConditions: ["Type 2 Diabetes", "Hypertension"],
    currentMedications: [
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
      { name: "Amlodipine", dosage: "5mg", frequency: "Once daily" }
    ],
    history: [
      { date: "2026-06-02", facility: "Apollo Hospital, Chennai", note: "Routine diabetes check-up. HbA1c 7.1%." },
      { date: "2025-11-14", facility: "Fortis Clinic, Chennai", note: "Hypertension follow-up. BP 138/88." },
      { date: "2024-03-20", facility: "Govt. General Hospital", note: "Allergic reaction to amoxicillin course. Switched to azithromycin." }
    ]
  },
  {
    abhaId: "14-2345-6789-0123",
    name: "Fatima Sheikh",
    age: 34,
    gender: "Female",
    bloodGroup: "O-",
    photo: "FS",
    otp: "1234",
    allergies: [
      { substance: "Sulfa drugs", severity: "Severe", reaction: "Rash, breathing difficulty" }
    ],
    chronicConditions: ["Asthma"],
    currentMedications: [
      { name: "Salbutamol Inhaler", dosage: "100mcg", frequency: "As needed" }
    ],
    history: [
      { date: "2026-07-10", facility: "Manipal Hospital, Bengaluru", note: "Mild asthma exacerbation, inhaler dose adjusted." },
      { date: "2025-09-02", facility: "PHC Whitefield", note: "Seasonal flu, prescribed azithromycin." }
    ]
  },
  {
    abhaId: "14-3456-7890-1234",
    name: "Arjun Nair",
    age: 8,
    gender: "Male",
    bloodGroup: "A+",
    photo: "AN",
    otp: "1234",
    allergies: [],
    chronicConditions: [],
    currentMedications: [],
    history: [
      { date: "2026-05-18", facility: "Rainbow Children's Hospital", note: "Routine vaccination — DTP booster." }
    ]
  }
];

// Simplified clinical interaction/allergy rule set for the demo.
// Real system would call a drug-interaction / allergen-mapping service.
export const drugRules = [
  {
    drug: "Amoxicillin",
    allergyTriggers: ["Penicillin"],
    severity: "Severe",
    message: "Amoxicillin is a penicillin-class antibiotic. Patient has a recorded SEVERE penicillin allergy (anaphylaxis risk)."
  },
  {
    drug: "Ampicillin",
    allergyTriggers: ["Penicillin"],
    severity: "Severe",
    message: "Ampicillin is a penicillin-class antibiotic. Patient has a recorded SEVERE penicillin allergy."
  },
  {
    drug: "Co-trimoxazole",
    allergyTriggers: ["Sulfa drugs"],
    severity: "Severe",
    message: "Co-trimoxazole contains a sulfonamide. Patient has a recorded sulfa drug allergy."
  },
  {
    drug: "Ibuprofen",
    conditionTriggers: ["Hypertension"],
    severity: "Moderate",
    message: "NSAIDs like Ibuprofen can raise blood pressure and reduce the effect of antihypertensives. Patient has Hypertension on record."
  },
  {
    drug: "Glimepiride",
    medicationTriggers: ["Metformin"],
    severity: "Moderate",
    message: "Combining Glimepiride with existing Metformin increases hypoglycemia risk. Monitor blood glucose closely."
  }
];

export const knownDrugs = [
  "Amoxicillin", "Ampicillin", "Azithromycin", "Co-trimoxazole", "Ibuprofen",
  "Paracetamol", "Glimepiride", "Metformin", "Amlodipine", "Cetirizine"
];
