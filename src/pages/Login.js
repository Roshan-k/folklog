import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../Firebase";
import Logo from "../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";

const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  // Set up authentication state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Redirect to home page after successful login
        navigate("/");
      }
    });

    return () => unsubscribe(); // Clean-up the observer
  }, [navigate]); // Include navigate in the dependency array

  return (
    <>
      <section>
        <div className="logo_full">
          <img src={Logo} alt="Logo" />
        </div>

        <div className="form_login">
          <h2>Login</h2>
          <input
            placeholder="Enter Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn primary" onClick={handleLogin}>
            Login
          </button>
          {error && <p>{error}</p>}
          <p>
            Do not have an account? <Link to="/signup">Signup here</Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Login;
