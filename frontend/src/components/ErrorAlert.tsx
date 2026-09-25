import React from 'react';

export default function ErrorAlert({ message }: { message: string }) {
  return (
    <div className="error-alert">
      ⚠️ {message}
    </div>
  );
}
