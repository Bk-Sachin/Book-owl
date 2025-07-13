import React, { useState, useRef } from 'react';
import './LoginPage.css';
const API_URL = 'http://localhost:5000/auth';

function PasswordInput({ value, onChange, placeholder, autoComplete }) {
  const [show, setShow] = useState(false);
  const inputRef = useRef();
  const handleToggle = () => {
    setShow((prev) => !prev);
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
  };
  return (
    <div className="password-input-wrapper">
      <input
        ref={inputRef}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        className="password-toggle-btn"
        onClick={handleToggle}
        onMouseDown={e => e.preventDefault()}
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? '🙈' : '👁'}
      </button>
    </div>
  );
}

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false);

  const validateRegister = () => {
    if (!signUpName || !signUpEmail || !signUpPassword || !signUpConfirmPassword) return 'All fields are required.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(signUpEmail)) return 'Invalid email address.';
    if (signUpPassword.length < 6) return 'Password must be at least 6 characters.';
    if (signUpPassword !== signUpConfirmPassword) return 'Passwords do not match.';
    return '';
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signInEmail, password: signInPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const validation = validateRegister();
    if (validation) {
      setError(validation);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: signUpName, email: signUpEmail, password: signUpPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      setIsSignUp(false);
      setError('Registration successful. Please sign in.');
      setSignUpPassword('');
      setSignUpConfirmPassword('');
      setSignUpEmail('');
      setSignUpName('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      
      <div className="login-page-bg">
        
        <div className={`container${isSignUp ? ' right-panel-active' : ''}`} id="container">
          <div className="form-container sign-up-container">
            <form onSubmit={handleSignUp} autoComplete="off">
              <h1>Create Account</h1>
              
      
              <input type="text" placeholder="Name" value={signUpName} onChange={e => setSignUpName(e.target.value)} />
              <input type="email" placeholder="Email" value={signUpEmail} onChange={e => setSignUpEmail(e.target.value)} />
              {/* Password field with toggle for sign up */}
              <PasswordInput
                value={signUpPassword}
                onChange={e => setSignUpPassword(e.target.value)}
                placeholder="Password"
                autoComplete="new-password"
              />
              {/* Confirm Password field with toggle for sign up */}
              <PasswordInput
                value={signUpConfirmPassword}
                onChange={e => setSignUpConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                autoComplete="new-password"
              />
              {error && isSignUp && <div className="alert alert-danger py-2">{error}</div>}
              <button type="submit" disabled={loading}>{loading ? 'Please wait...' : 'Sign Up'}</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form onSubmit={handleSignIn} autoComplete="off">
              <h1>Sign in</h1>
              
              
              <input type="email" placeholder="Email" value={signInEmail} onChange={e => setSignInEmail(e.target.value)} />
              {/* Password field with toggle for sign in */}
              <PasswordInput
                value={signInPassword}
                onChange={e => setSignInPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
              />
              <a href="#">Forgot your password?</a>
              {error && !isSignUp && <div className="alert alert-danger py-2">{error}</div>}
              <button type="submit" disabled={loading}>{loading ? 'Please wait...' : 'Sign In'}</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" id="signIn" type="button" onClick={() => { setIsSignUp(false); setError(''); }}>Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" id="signUp" type="button" onClick={() => { setIsSignUp(true); setError(''); }}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 