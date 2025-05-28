// components/ApplyLeaveModal.js
import React, { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { app } from "../Firebase";

const ApplyLeaveModal = ({ onClose, onLeaveSubmitted }) => {
  const [type, setType] = useState("Casual Leave");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = async () => {
    if (!fromDate || !toDate || !email || !reason) {
      alert("Please fill all fields.");
      return;
    }

    const auth = getAuth(app);
    const user = auth.currentUser;
    if (!user) return;

    const db = getDatabase(app);
    const leaveRef = ref(db, `users/${user.uid}/leaveTracker/records`);
    const days = Math.ceil(
      (new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24)
    ) + 1;

    const newLeave = {
      type,
      fromDate,
      toDate,
      email,
      reason,
      status: "Pending",
      appliedDate: new Date().toDateString(),
      days: days > 1 ? `${days} Days` : `${days} Day`,
    };

    await push(leaveRef, newLeave);
    onLeaveSubmitted();
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content leave-tracker">
        <h3>Apply Leave</h3>
        <label>Leave Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>Casual Leave</option>
            <option>Earned Leave</option>
            <option>Sick Leave</option>
            <option>Paternity Leave</option>
          </select>
        </label>

        <label className="time_outer"><p>Date:</p>
          <div className="time__date">
           <div className="from"> From <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} /></div>
           <div className="from from_to"> To <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} /></div>
          </div>
        </label>

        <label>Team Email ID:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>Reason for Leave:
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
        </label>

        <div className="modal-actions">
          <button  className="cancel" onClick={onClose}>Cancel</button>
          <button className="submit" onClick={handleSubmit}>Apply Leave</button>
        </div>
      </div>
    </div>
  );
};

export default ApplyLeaveModal;
