import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register as reduxRegister } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import { AppDispatch } from '../store';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import generated from '../../public/generated.jpg'; // Adjust the path as necessary

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { login: authLogin, theme } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Call Redux register
      const userData = await dispatch(reduxRegister({ name, email, password })).unwrap();
      
      // Update auth context
      authLogin(userData);
      
      navigate("/home");
      toast.success("Registration successful!");
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container-fluid vh-100 d-flex align-items-center justify-content-center auth-page-bg`}>
      <div className="row w-100">
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <img
            src={generated}
            alt="Register Illustration"
            className="img-fluid rounded shadow"
            style={{ maxWidth: "80%" }}
          />
        </div>
  
        {/* Form Section */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card form-card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
            <h3 className="text-center mb-3">Register</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className={`form-label ${theme === 'dark' ? 'text-light' : 'text-dark'}`}>Full Name</label>
                <input
                  type="text"
                  className={`form-control ${theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}`}
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className={`form-label ${theme === 'dark' ? 'text-light' : 'text-dark'}`}>Email</label>
                <input
                  type="email"
                  className={`form-control ${theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}`}
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className={`form-label ${theme === 'dark' ? 'text-light' : 'text-dark'}`}>Password</label>
                <input
                  type="password"
                  className={`form-control ${theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}`}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-danger w-100"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </form>
            <p className="text-center mt-3">
      Have an account?{' '}
      <Link 
        to="/login" 
        className="text-decoration-none text-primary"
      >
        Login
      </Link>
    </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;