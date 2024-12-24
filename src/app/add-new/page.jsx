'use client';

import { useState } from 'react';

export default function page() {
  const [userId, setUserId] = useState('');
  const [newRole, setNewRole] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/change-role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, newRole }),
    });

    if (response.ok) {
      setMessage('User role updated successfully!');
    } else {
      setMessage('Failed to update user role.');
    }
  };

  return (
    <div>
      <h1>Change User Role</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="role">New Role:</label>
          <select
            id="role"
            name="role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            required
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="editor">Editor</option>
          </select>
        </div>
        <button type="submit">Change Role</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}