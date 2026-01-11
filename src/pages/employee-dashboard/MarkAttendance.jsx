import { useState } from "react";
import { markAttendance } from "../../services/employeeActionsService";
import "./employeeActions.css";

export default function MarkAttendance() {
  const [status, setStatus] = useState("present");

  const handleSubmit = async () => {
    await markAttendance({
      status,
      check_in: "09:30",
      check_out: "18:00",
    });
    alert("Attendance marked");
  };

  return (
    <div className="action-page">
      <h1>Mark Attendance</h1>

      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="present">Present</option>
        <option value="late">Late</option>
        <option value="absent">Absent</option>
      </select>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
