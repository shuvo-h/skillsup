import { catchAsync, TControllerFunction, wrapAsync } from '../../../utils/catchAsync';
import { TestPatientModel } from './testPatients';

const createPatient:TControllerFunction = async (req, res) => {
  const result = await TestPatientModel.insertMany(req.body);
  res.json(result);
};

const queryTesting:TControllerFunction = async (req, res) => {
  /*
  // 2) if array contain an Element, return the list 
  const treatmentId = '65845f0c480fb4c10cd350fa';
  const result = await TestPatientModel.find({
    'medical_history.conditions': {$all: [treatmentId]}
  }).select('medical_history');
  */
 console.log('HiT');
 
 // 2) if array contain an Element, return the list 
 const treatmentId = '65845e04480fb4c10cd350e4';

 
 const resultX = await TestPatientModel.aggregate([
  {
    $lookup: {
      from: 'testmedicalconditions',
      localField: 'medical_history.conditions',
      foreignField: '_id',
      as: 'medical_history.conditions',
    }
  },
/*
  {
    $unwind: {
      path: "$medical_history.conditions",
      preserveNullAndEmptyArrays: true,
    }
  },
  {
    $lookup: {
      from: "testtreatments",
      localField: "medical_history.conditions.treatments",
      foreignField: "_id",
      as: "medical_history.conditions.treatments",
    }
  },
 */
  
  
  
  {
    $project: {
      __v: 0,
      
    }
  }
 
]);

const result = await TestPatientModel.aggregate([
  
  {
    $lookup: {
      from: 'testmedicalconditions',
      localField: 'medical_history.conditions',
      foreignField: '_id',
      as: 'medical_history.conditions',
    }
  },

  {
    $project: {
      __v: 0,
      personal_info:0,
      insurance_info:0,
      
    }
  }
]);



  res.json(result);
};

export const patientControllers = wrapAsync({
  createPatient,
  queryTesting
});
