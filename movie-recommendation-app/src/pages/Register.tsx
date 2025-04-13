// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { register } from '../store/slices/authSlice';
// import { toast } from 'react-toastify';
// import { AppDispatch } from '../store';

// const Register = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [passwordError, setPasswordError] = useState('');
    
//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate();

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
        
//         if (password !== confirmPassword) {
//             setPasswordError('Passwords do not match');
//             return;
//         }
//         setPasswordError('');

//         try {
//             await dispatch(register({ name, email, password })).unwrap();
//             toast.success('Registration successful!');
//             navigate('/login');
//         } catch (error) {
//             toast.error('Registration failed. Please try again.');
//         }
//     };

//     const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setPassword(e.target.value);
//         if (confirmPassword && e.target.value !== confirmPassword) {
//             setPasswordError('Passwords do not match');
//         } else {
//             setPasswordError('');
//         }
//     };

//     const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setConfirmPassword(e.target.value);
//         if (e.target.value !== password) {
//             setPasswordError('Passwords do not match');
//         } else {
//             setPasswordError('');
//         }
//     };

//     return (
//         <div className="auth-page">
//             <div className="auth-container">
//                 <div className="auth-illustration">
//                     <img src="/auth-illustration.svg" alt="Register illustration" />
//                 </div>
//                 <div className="auth-form-container">
//                     <div className="auth-header">
//                         <h1 className="auth-title">Create Account</h1>
//                         <p className="auth-subtitle">Join us to get personalized movie recommendations</p>
//                     </div>
//                     <form className="auth-form" onSubmit={handleSubmit}>
//                         <div className="form-floating">
//                             <input
//                                 type="text"
//                                 id="name"
//                                 placeholder="Full Name"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 required
//                             />
//                             <label htmlFor="name">Full Name</label>
//                         </div>
//                         <div className="form-floating">
//                             <input
//                                 type="email"
//                                 id="email"
//                                 placeholder="Email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                             />
//                             <label htmlFor="email">Email</label>
//                         </div>
//                         <div className="form-floating">
//                             <input
//                                 type="password"
//                                 id="password"
//                                 placeholder="Password"
//                                 value={password}
//                                 onChange={handlePasswordChange}
//                                 required
//                                 minLength={6}
//                             />
//                             <label htmlFor="password">Password</label>
//                         </div>
//                         <div className="form-floating">
//                             <input
//                                 type="password"
//                                 id="confirmPassword"
//                                 placeholder="Confirm Password"
//                                 value={confirmPassword}
//                                 onChange={handleConfirmPasswordChange}
//                                 required
//                                 minLength={6}
//                             />
//                             <label htmlFor="confirmPassword">Confirm Password</label>
//                             {passwordError && <div className="text-danger mt-1">{passwordError}</div>}
//                         </div>
//                         <button type="submit" className="auth-button">
//                             Create Account
//                         </button>
//                         <div className="auth-links">
//                             Already have an account? <Link to="/login">Login</Link>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import generated from '../../public/generated.jpg'; // Adjust the path as necessary

const Register = () => {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100">
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <img
            src={generated}
            alt="Register Illustration"
            className="img-fluid"
            style={{ maxWidth: '80%' }}
          />
        </div>

        {/* Form Section */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
            <h3 className="text-center mb-3">Register</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
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
                  required
                />
              </div>
              <button type="submit" className="btn btn-danger w-100">Register</button>
            </form>
            <p className="text-center mt-3">
              Have an account? <a href="/login" className="text-decoration-none text-primary">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;