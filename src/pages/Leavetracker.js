import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { app } from "../Firebase";
import './LeaveTracker.css'; 
import ApplyLeaveModal from "../components/ApplyLeaveModal";

const LeaveTracker = () => {
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState({});
  const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleApply = (leaveData) => {
    // Save to Firebase here
    console.log(leaveData);
  };

  const database = getDatabase(app);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const summaryRef = ref(database, `users/${user.uid}/leaveTracker/summary`);
    const recordsRef = ref(database, `users/${user.uid}/leaveTracker/records`);

    onValue(summaryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setSummary(data);
    });

    onValue(recordsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const leaveList = Object.entries(data).map(([id, val]) => ({
          id,
          ...val,
        }));
        setRecords(leaveList);
      }
    });
  }, [user]);

  const leaveTypes = [
    { label: "Casual Leaves", key: "casual", color: "#62b5f5" },
    { label: "Earned Leaves", key: "earned", color: "#b38cf7" },
    { label: "Sick Leaves", key: "sick", color: "#f472b6" },
    { label: "Paternity Leave", key: "paternity", color: "#fda29b" },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending": return "pending";
      case "Approved": return "approved";
      case "Rejected": return "rejected";
      default: return "";
    }
  };

  return (
    <div className="leave-tracker">
      <div className="header">
        <h3>Leave Tracker</h3>
        <button className="submit" onClick={() => setShowModal(true)}>Apply Leave</button>
      {showModal && (
        <ApplyLeaveModal
  onClose={() => setShowModal(false)}
  onLeaveSubmitted={handleApply}
/>
      )}
      </div>

<div className="summary">
  {leaveTypes.map((type) => {
    const total = summary[type.key]?.total ?? 0;
    const booked = summary[type.key]?.booked ?? 0;
    const available = total - booked;

    return (
      <div className="card" key={type.key}>
        <p className="heading-small"><strong>{type.label}</strong></p>
        <div className="circle" style={{ borderColor: type.color, color: type.color }}>
          {available.toString().padStart(2, "0")}
        </div>
        
        <p>Total Leaves: {total}</p>
        <p>Booked: {booked}</p>
      </div>
    );
  })}
</div>

      <div className="header"><h3>All Leaves</h3></div>
      <div className="task-list">
      <table className="leave-table">
        <thead>
          <tr>
            <th>Date Applied</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>No. of days</th>
            <th>Type</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.
appliedDate}</td>
              <td>{leave.fromDate}</td>
              <td>{leave.toDate}</td>
              <td>{leave.days}</td>
              <td>{leave.type}</td>
              <td>{leave.reason}</td>
              <td className={getStatusClass(leave.status)}>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </div>
  );
};

export default LeaveTracker;
