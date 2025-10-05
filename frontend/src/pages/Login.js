import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.userName || 'User');
        localStorage.setItem('userRole', 'User');

        alert('Login successful!');
        navigate('/dashboard');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Login to Your Account</h2>
        <p style={styles.subtext}>Welcome back! Please enter your details.</p>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Log In</button>
        </form>
        <p style={styles.footerText}>
          Don't have an account?
          <Link to="/signup" style={styles.link}> Sign up</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #e0eafc, #cfdef3)',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '40px 30px',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#222',
    marginBottom: '8px',
  },
  subtext: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    padding: '12px 14px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '15px',
    transition: 'all 0.2s ease',
    outline: 'none',
  },
  button: {
    padding: '12px 16px',
    backgroundColor: '#4a90e2',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  footerText: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#333',
  },
  link: {
    marginLeft: '6px',
    color: '#4a90e2',
    fontWeight: '500',
    textDecoration: 'none',
  },
};

export default Login;
