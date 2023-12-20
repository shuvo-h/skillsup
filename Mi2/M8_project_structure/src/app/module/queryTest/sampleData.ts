const Patients = [
  {
    _id: '5fd9b5ebf183a1ef9bf5e7d0',
    patient_id: 'A123456789',
    personal_info: {
      name: 'John Doe',
      dob: '1980-05-15',
      gender: 'Male',
      address: {
        street: '123 Main St',
        city: 'Metropolis',
        state: 'CA',
        zip: '98765',
      },
    },
    medical_history: {
      conditions: [
        '5fd9b5ebf183a1ef9bf5e7d1', // Reference to Hypertension condition
        '5fd9b5ebf183a1ef9bf5e7d2', // Reference to Type 2 Diabetes condition
      ],
      surgeries: [
        '5fd9b5ebf183a1ef9bf5e7d3', // Reference to Coronary Artery Bypass Grafting surgery
      ],
    },
    insurance_info: {
      provider: 'HealthGuard',
      policy_number: 'HG987654321',
      coverage: {
        outpatient: true,
        inpatient: true,
        prescriptions: true,
      },
    },
  },
];

const medicalConditions = [
  {
    _id: '5fd9b5ebf183a1ef9bf5e7d1',
    name: 'Hypertension',
    diagnosed_date: '2010-03-20',
    treatments: [
      '5fd9b5ebf183a1ef9bf5e7d4', // Reference to Ace Inhibitors treatment
      '5fd9b5ebf183a1ef9bf5e7d5', // Reference to Diuretics treatment
    ],
  },

  {
    _id: '5fd9b5ebf183a1ef9bf5e7d2',
    name: 'Type 2 Diabetes',
    diagnosed_date: '2015-10-10',
    treatments: [
      '5fd9b5ebf183a1ef9bf5e7d6', // Reference to Insulin treatment
      '5fd9b5ebf183a1ef9bf5e7d7', // Reference to Metformin treatment
    ],
  },
];

const treatments = [
  {
    _id: '5fd9b5ebf183a1ef9bf5e7d4',
    name: 'Ace Inhibitors',
    dosage: '10mg',
    start_date: '2010-04-01',
  },

  {
    _id: '5fd9b5ebf183a1ef9bf5e7d5',
    name: 'Diuretics',
    dosage: '25mg',
    start_date: '2012-08-15',
  },

  {
    _id: '5fd9b5ebf183a1ef9bf5e7d6',
    name: 'Insulin',
    dosage: '20 units',
    start_date: '2015-11-01',
  },

  {
    _id: '5fd9b5ebf183a1ef9bf5e7d7',
    name: 'Metformin',
    dosage: '1000mg',
    start_date: '2016-02-20',
  },
];

const surgeries = [
  {
    _id: '5fd9b5ebf183a1ef9bf5e7d3',
    procedure: 'Coronary Artery Bypass Grafting',
    date: '2018-06-05',
    hospital: 'City Medical Center',
  },
];

/*
  
  Certainly! Here's a list of 50 complex MongoDB queries based on the provided collections:

1. Retrieve the personal information of the patient with ID "A123456789."
2. Find all patients who have been diagnosed with hypertension.
3. Get the details of the insurance coverage for the patient with policy number "HG987654321."
4. Find patients who have undergone surgery at "City Medical Center."
5. Retrieve the names of patients who have been prescribed "Insulin."
6. Find patients with a genetic variant in the "BRCA1" gene with a mutation impact of "High."
7. Get a list of patients who participated in the clinical trial with ID "CT1001."
8. Retrieve patients who have both hypertension and type 2 diabetes.
9. Find patients with an expression level of the gene "TP53" greater than 2.0.
10. Get the count of patients with more than one medical condition.
11. Find patients whose surgery date is after "2018-01-01."
12. Retrieve the names of patients who have been prescribed "Ace Inhibitors" with a dosage of "10mg."
13. Find patients whose insurance coverage includes outpatient but not inpatient.
14. Get the details of patients who participated in clinical trials with an enrollment status of "Open."
15. Find patients with a genetic variant in the "BRCA1" gene and a surgery at "City Medical Center."
16. Retrieve patients who have a diagnosed medical condition before the age of 30.
17. Find patients who have a genetic variant with a carrier count greater than 10.
18. Get the count of patients who have participated in more than one clinical trial.
19. Retrieve patients who have not undergone any surgeries.
20. Find patients with a specific address, e.g., "123 Main St, Metropolis, CA."
21. Get the details of patients with a surgery at "City Medical Center" and prescribed "Insulin."
22. Retrieve patients who have a genetic variant in the "BRCA1" gene but not diagnosed with type 2 diabetes.
23. Find patients who participated in clinical trials that ended after "2022-01-01."
24. Get the count of patients who have been prescribed both "Ace Inhibitors" and "Insulin."
25. Find patients with a surgery date between "2018-01-01" and "2019-01-01."
26. Retrieve patients who have a genetic variant in the "BRCA1" gene and an expression level of "TP53" greater than 2.0.
27. Find patients who have a surgery at "City Medical Center" and are enrolled in the clinical trial with ID "CT1001."
28. Get the details of patients who have participated in clinical trials with an enrollment status of "Closed."
29. Find patients who have undergone surgery at a hospital other than "City Medical Center."
30. Retrieve patients who have both hypertension and a genetic variant in the "BRCA1" gene.
31. Find patients who have participated in more than one clinical trial with an enrollment status of "Open."
32. Get the details of patients who have a genetic variant in the "BRCA1" gene and a surgery date after "2018-01-01."
33. Retrieve patients who have been prescribed "Diuretics" with a dosage of "25mg."
34. Find patients who have participated in clinical trials with an enrollment status of "Open" and a surgery date after "2018-01-01."
35. Get the count of patients who have a genetic variant in the "BRCA1" gene and an expression level of "TP53" greater than 2.0.
36. Find patients who have participated in clinical trials with an enrollment status of "Open" and are prescribed "Insulin."
37. Retrieve patients who have both hypertension and type 2 diabetes and a surgery date after "2018-01-01."
38. Find patients who have participated in clinical trials with an enrollment status of "Open" and have not undergone any surgeries.
39. Get the details of patients who have a genetic variant in the "BRCA1" gene, an expression level of "TP53" greater than 2.0, and a surgery at "City Medical Center."
40. Retrieve patients who have been prescribed both "Ace Inhibitors" and "Diuretics."
41. Find patients who have participated in clinical trials with an enrollment status of "Open" and have a surgery at "City Medical Center."
42. Get the count of patients who have a genetic variant in the "BRCA1" gene and a surgery at "City Medical Center."
43. Retrieve patients who have been prescribed "Insulin" and have a surgery date after "2018-01-01."
44. Find patients who have a surgery date after "2018-01-01" and an expression level of the gene "TP53" greater than 2.0.
45. Get the details of patients who have been prescribed "Ace Inhibitors" and have a surgery at "City Medical Center."
46. Retrieve patients who have participated in clinical trials with an enrollment status of "Open" and have a surgery at a hospital other than "City Medical Center."
47. Find patients who have been prescribed both "Insulin" and "Metformin."
48. Get the count of patients who have a surgery date after "2018-01-01" and have not participated in any clinical trials.
49. Retrieve patients who have been prescribed "Metformin" and have a surgery at a hospital other than "City Medical Center."
50. Find patients who have participated in clinical trials with an enrollment status of "Open" and have not been prescribed any medications.

These queries cover a wide range of scenarios and should provide a good exercise for working with MongoDB collections.
  
  */
