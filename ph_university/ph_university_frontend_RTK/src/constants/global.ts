export const monthNames = [
    'January',
    'February',
    'March',
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
export const monthOptions = monthNames.map(item=>({value: item, label:item}))

export const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const bloodOptions =  bloodGroup.map(item=>({value: item, label:item}));

export const genderGroup = ['Male', 'Female', 'Non-Binary', 'Other'];


export const genderOptions =  genderGroup.map(item=>({value: item, label:item}));

export const weekDaysOptions = [
    { value: "Sun", label: "Sunday" },
    { value: "Mon", label: "Monday" },
    { value: "Tue", label: "Tuesday" },
    { value: "Wed", label: "Wednesday" },
    { value: "Thu", label: "Thursday" },
    { value: "Fri", label: "Friday" },
    { value: "Sat", label: "Saturday" }
];