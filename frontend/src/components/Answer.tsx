import React from 'react';

export default function Answer({ text, citations }: { text: string, citations: any[] }) {
  return (
    <div className="answer-box">
      <p>{text}</p>
      <div className="citations">
        {citations.map((c, i) => <span key={i}>[{i + 1}] {c.text}</span>)}
      </div>
    </div>
  );
}
