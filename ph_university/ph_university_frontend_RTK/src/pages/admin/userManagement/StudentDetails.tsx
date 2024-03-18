import { useParams } from "react-router-dom";

const StudentDetails = () => {
    const params = useParams();
    console.log(params);
    
    return (
        <div>
            StudentDetails
        </div>
    );
};

export default StudentDetails;