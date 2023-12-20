import mongoose from 'mongoose';

// Define the PersonalInfo schema
const personalInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
});

// Define the MedicalHistory schema
const medicalHistorySchema = new mongoose.Schema({
  conditions: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'TestMedicalCondition' },
  ],
  surgeries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TestSurgery' }],
});

// Define the InsuranceInfo schema
const insuranceInfoSchema = new mongoose.Schema({
  provider: { type: String, required: true },
  policy_number: { type: String, required: true },
  coverage: {
    outpatient: { type: Boolean, required: true },
    inpatient: { type: Boolean, required: true },
    prescriptions: { type: Boolean, required: true },
  },
});

// Define the Patient schema
const patientSchema = new mongoose.Schema({
  patient_id: { type: String, required: true },
  personal_info: personalInfoSchema,
  medical_history: medicalHistorySchema,
  insurance_info: insuranceInfoSchema,
});

// Create the Patient model
export const TestPatientModel = mongoose.model('TestPatient', patientSchema);
