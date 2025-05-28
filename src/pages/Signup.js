import React from "react";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../Firebase";
import Logo from "../images/logo.svg";
import { Link } from "react-router-dom";

// Firebase Database
const database = getDatabase(app);
const auth = getAuth(app);

// Signup Component
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    try {
      // Ensure name, email, and password are not empty
      if (!name || !email || !password) {
        throw new Error("Name, email, and password are required");
      }
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // Create user-specific node in database
      await set(ref(database, `/users/${user.uid}`), {
        email: user.email,
        name: name,
        // Other user data if needed
      });
      // Redirect to success page after signup
      window.location.href = "/dashboard";
    } catch (error) {
      // Handle errors
      setError(error.message);
    }
  };

  return (
    <section>
      <div className="logo_full">
        <img src={Logo} alt="Logo" />
      </div>

      <div className="form_login">
        <h2>Signup</h2>
        <input
          placeholder="Enter Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn primary" onClick={handleSignup}>
          Sign Up
        </button>
        {error && <p>{error}</p>}
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
