import React, { useState, useEffect } from 'react';

function TestConnection() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/TestConnection')  
    .then(response => {
        console.log(response); // Log the entire response object
        return response.json();
      })
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  }, []);
  
  return (
    <div>
      <h2>Connection Test</h2>
      <p>Server response: {message}</p>
    </div>
  );
}

export default TestConnection;
