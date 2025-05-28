import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../Firebase";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const [photoFile, setPhotoFile] = useState(null);
  const [photoURL, setPhotoURL] = useState("");

  const auth = getAuth(app);
  const database = getDatabase(app);
  const storage = getStorage(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const profileRef = ref(database, `users/${user.uid}/`);
      onValue(profileRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setProfile(data);
          if (data.photoURL) {
            setPhotoURL(data.photoURL);
          }
        }
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user) return;
    const profileRef = ref(database, `users/${user.uid}/profile`);
    await update(profileRef, profile);
    alert("Profile updated!");
  };

  const handlePhotoUpload = async () => {
    if (!photoFile || !user) return;
    const imgRef = storageRef(storage, `profilePhotos/${user.uid}`);
    await uploadBytes(imgRef, photoFile);
    const url = await getDownloadURL(imgRef);
    const profileRef = ref(database, `users/${user.uid}/profile`);
    await update(profileRef, { photoURL: url });
    setPhotoURL(url);
    alert("Photo uploaded!");
  };

  const fields = [
    { label: "Name", name: "name" },
    { label: "Email", name: "email" },
    { label: "Phone", name: "phone" },
    { label: "Address Line 1", name: "address1" },
    { label: "Address Line 2", name: "address2" },
    { label: "Pincode", name: "pincode" },
    { label: "District", name: "district" },
    { label: "Joining Date", name: "joiningDate" },
    { label: "Gender", name: "gender" },
    { label: "DOB", name: "dob" },
  ];

  return (
    <div className="profile-container">
      <h2 className="heading__btn heading">Profile</h2>
      <div className="profile-wrapper">
        {/* Left Panel */}
        <div className="profile-left">
          <h3 className="small-head">Personal Details</h3>
          

          {fields.map((field, index) => (
  <div className={`form-group group-${field.name}`} key={field.name}>
    <label htmlFor={field.name}>{field.label}</label>
    <input
      type="text"
      id={field.name}
      name={field.name}
      className={`input-${field.name}`}
      value={profile[field.name] || ""}
      onChange={handleInputChange}
    />
  </div>
))}

          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>

        {/* Right Panel */}
        <div className="profile-right">
          <h3 className="small-head">Change Password</h3>
          <div className="form-group">
            <label>Old Password</label>
            <input type="password" />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input type="password" />
          </div>
          <div className="form-group">
            <label>Repeat Password</label>
            <input type="password" />
          </div>
          <button className="update-btn" onClick={() => alert("Password update not implemented")}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
