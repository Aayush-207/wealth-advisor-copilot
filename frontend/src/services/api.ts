export async function askQuestion(query: string) {
  const res = await fetch('http://localhost:8000/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer test-token' },
    body: JSON.stringify({ query })
  });
  return res.json();
}
