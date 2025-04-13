import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { AppDispatch } from "../store";
import 'bootstrap/dist/css/bootstrap.min.css';
import generated from "../../public/generated.jpg"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate("/movies");
      toast.success("Successfully logged in!");
    } catch (err) {
      toast.error("Failed to login. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100">
        {/* Illustration Section */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <img
            src={generated}
            alt="Login Illustration"
            className="img-fluid"
            style={{ maxWidth: '80%' }}
          />
        </div>

        {/* Form Section */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
            <h3 className="text-center mb-3">Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 text-end">
                <Link to="/forgot-password" className="text-decoration-none text-primary">Forgot password?</Link>
              </div>
              <button 
                type="submit" 
                className="btn btn-danger w-100"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="text-center mt-3">
              Don't have an account? <Link to="/register" className="text-decoration-none text-primary">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;