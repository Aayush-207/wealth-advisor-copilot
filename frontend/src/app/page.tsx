import SearchBox from '../components/SearchBox';

export default function Home() {
  return (
    <main className="container">
      <h1>Wealth Knowledge Assistant</h1>
      <p>Ask a question based on approved bank materials.</p>
      <SearchBox />
    </main>
  );
}
