import React, { useState } from 'react';

export default function SearchBox() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="search-box">
      <input type="text" placeholder="Enter your question..." />
      <button onClick={() => setLoading(true)}>{loading ? 'Searching...' : 'Ask'}</button>
    </div>
  );
}
