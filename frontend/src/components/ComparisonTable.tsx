import React from 'react';

export default function ComparisonTable({ data }: { data: any[] }) {
  return (
    <table>
      <thead><tr><th>Product</th><th>Fee</th><th>Risk</th></tr></thead>
      <tbody>
        {data.map((row, i) => <tr key={i}><td>{row.product}</td><td>{row.fee}</td><td>{row.risk}</td></tr>)}
      </tbody>
    </table>
  );
}
