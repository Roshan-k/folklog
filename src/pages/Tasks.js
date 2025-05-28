import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import { app } from "../Firebase";
import { useLocation } from 'react-router-dom';

const Tasks = () => {
  const location = useLocation();
  const isTask = location.pathname === '/task';
  const database = getDatabase(app);
  const auth = getAuth(app);

  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const path = `users/${user.uid}/task`;
    const tasksRef = ref(database, path);

    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const taskList = Object.entries(data).map(([id, task]) => ({
          id,
          ...task,
        }));
        setTasks(taskList);
      } else {
        setTasks([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

const handleSubmit = async () => {
  if (!selectedTask) return;

  const taskRef = ref(database, `users/${user.uid}/task/${selectedTask.id}`);
  await update(taskRef, {
    ...selectedTask,
    note,
    status,
  });

  setSelectedTask(null);
  setNote("");
  setStatus("");
};
  

  return (
    <div className={isTask ? 'task-list' : 'task-list small'}>
      <h3>Task List</h3>
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Assigned Date</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Assigned By</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
               <button
  className="link-btn"
 onClick={() => {
  setSelectedTask(task);
  setNote(task.note || "");
  setStatus(task.status || "Open");
}}
>
  {task.taskName}
</button>
              </td>
              <td>{task.assignDate}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.assignedBy}</td>
              <td>{user?.displayName || user?.email}</td>
              <td><span className={`status ${
    task.status === "Done" ? "status-done" :
    task.status === "Due" ? "status-due" :
    "status-open"
  }`}>
    {task.status}
  </span></td>
              <td>{task.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTask && (
        <div className="modal">
          <div className="modal-content">
            <h3>Submit Task</h3>
            <label>Task Name: <input type="text" value={selectedTask.taskName} readOnly /></label>
            <label>Assigned Date: <input type="text" value={selectedTask.assignDate} readOnly /></label>
            <label>Due Date: <input type="text" value={selectedTask.dueDate} readOnly /></label>
            <label>Priority: <input type="text" value={selectedTask.priority} readOnly /></label>
            <label>Assigned By: <input type="text" value={selectedTask.assignedBy} readOnly /></label>
            <label>Status:
  <select value={status} onChange={(e) => setStatus(e.target.value)}>
    <option value="Open">Open</option>
    <option value="Due">Due</option>
    <option value="Done">Done</option>
  </select>
</label>
            <label>Description: <input type="text" value={selectedTask.description} readOnly /></label>
            <label className="note">Note:
              <textarea value={note} onChange={(e) => setNote(e.target.value)} />
            </label>
            <div className="modal-actions">
              <button className="cancel" onClick={() => setSelectedTask(null)}>Cancel</button>
              <button className="submit" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
