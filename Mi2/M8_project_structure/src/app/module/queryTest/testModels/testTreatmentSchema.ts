import mongoose from 'mongoose';

// Define the Treatment schema
const treatmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  start_date: { type: Date, required: true },
});

// Create the Treatment model
export const testTreatmentModel = mongoose.model(
  'TestTreatment',
  treatmentSchema,
);

// Define the Surgery schema
const surgerySchema = new mongoose.Schema({
  procedure: { type: String, required: true },
  date: { type: Date, required: true },
  hospital: { type: String, required: true },
});

// Create the Surgery model
export const testSurgeryModel = mongoose.model('TestSurgery', surgerySchema);
