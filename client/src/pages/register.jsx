import React, { useState } from 'react';
import API from './api';

function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/register', form);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
    } catch (err) {
      setError('Registration failed');
    }
  };
    return (
      <div>
        <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
      </form>
      </div> 
    );
}

export default Register;
