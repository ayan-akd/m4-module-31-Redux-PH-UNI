import { useParams } from "react-router-dom";

export default function StudentDetails() {
    const {studentId} = useParams();
    return (
        <div>
            <h1>This is the StudentDetails of {studentId}</h1>
        </div>
    );
}