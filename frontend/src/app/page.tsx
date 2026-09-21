import React from 'react';
import SearchBox from '../components/SearchBox';
import Answer from '../components/Answer';

export default function Home() {
  return (
    <main className="container">
      <h1>Wealth Knowledge Assistant</h1>
      <p>Ask a question based on approved bank materials.</p>
      <SearchBox />
      <Answer text="Example answer" citations={[]} />
    </main>
  );
}
