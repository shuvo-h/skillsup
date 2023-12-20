import express from 'express';
import { conditionControllers } from './conditionControllers';
import { patientControllers } from './patientControllers';
import { surgeryControllers } from './surgeryControllers';
import { treatmentControllers } from './treatmentControllers';

export const testRouter = express.Router();

testRouter.post('/surgery/create', surgeryControllers.createSetgery);

testRouter.post('/treatment/create', treatmentControllers.createTreatment);
testRouter.post('/conditions/create', conditionControllers.createCondition);
testRouter.post('/patients/create', patientControllers.createPatient);
