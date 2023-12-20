import mongoose from 'mongoose';

// Define the MedicalCondition schema
const medicalConditionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  diagnosed_date: { type: Date, required: true },
  treatments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TestTreatment' }],
});

// Create the MedicalCondition model
export const testMedicalConditionModel = mongoose.model(
  'TestMedicalCondition',
  medicalConditionSchema,
);
