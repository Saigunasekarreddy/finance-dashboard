// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';  // Importing useNavigate

// const Signup = () => {
//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const navigate = useNavigate();  // Initialize useNavigate

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch('http://localhost:5000/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem('token', data.token);
//         alert('Signup successful!');
//         // Navigate to login page after successful signup
//         navigate('/login');  // Assuming '/Userlogin' is the login page route
//       } else {
//         alert(data.message || 'Signup failed');
//       }
//     } catch (error) {
//       console.error('Signup error:', error);
//       alert('Something went wrong!');
//     }
//   };

//   return (
//     <form onSubmit={handleSignup}>
//       <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
//       <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
//       <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        alert('Signup successful!');
        navigate('/login');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Your Account</h2>
        <p style={styles.subtitle}>Join us and manage your finances easily</p>
        <form onSubmit={handleSignup} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
  type="number"
  name="number"
  placeholder="Enter a number (1-100)"
  value={form.number}
  onChange={handleChange}
  required
  min="1"
  max="100"
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
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
        <p style={styles.text}>
          Already have an account?
          <Link to="/login" style={styles.link}> Login here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  background: {
    minHeight: '100vh',
    background: '#f4f6f9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '45px 40px',
    borderRadius: '14px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    maxWidth: '440px',
    width: '100%',
    textAlign: 'center',
    transition: '0.3s ease-in-out',
  },
  title: {
    fontSize: '26px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#222',
  },
  subtitle: {
    fontSize: '15px',
    marginBottom: '28px',
    color: '#555',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
    color: '#333',
    backgroundColor: '#fff',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  },
  button: {
    padding: '12px 16px',
    marginTop: '10px',
    backgroundColor: '#0052cc',
    color: '#fff',
    fontSize: '15px',
    fontWeight: '500',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  text: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#555',
  },
  link: {
    color: '#0052cc',
    fontWeight: '500',
    textDecoration: 'none',
    marginLeft: '5px',
  },
};

export default Signup;
