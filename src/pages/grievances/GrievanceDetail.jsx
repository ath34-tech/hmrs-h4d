import { useEffect, useState } from "react";
import {
  getGrievanceById,
  getGrievanceUpdates,
  addGrievanceUpdate,
} from "../../services/grievanceService";
import { useParams } from "react-router-dom";
import "./grievances.css";

export default function GrievanceDetail() {
  const { id } = useParams();
  const [grievance, setGrievance] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [message, setMessage] = useState("");

  const profileId = localStorage.getItem("profile_id");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const g = await getGrievanceById(id);
    const u = await getGrievanceUpdates(id);
    setGrievance(g);
    setUpdates(u);
  };

  const submitUpdate = async () => {
    await addGrievanceUpdate(id, message, profileId);
    setMessage("");
    loadData();
  };

  if (!grievance) return null;

  return (
    <div className="grievance-detail">
      <h2>{grievance.category}</h2>
      <p>{grievance.description}</p>

      <h3>Updates</h3>

      <div className="updates">
        {updates.map((u) => (
          <div key={u.id} className="update-item">
            <strong>{u.profiles?.email}</strong>
            <span>{u.message}</span>
          </div>
        ))}
      </div>

      <textarea
        placeholder="Add update..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={submitUpdate}>Add Update</button>
    </div>
  );
}
