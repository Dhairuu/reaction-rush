import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Scatter } from 'recharts';
import userProgressData from '../data/userProgress.json';

export default function UserProgress() {
  const data = userProgressData.slice(-10).map((match, index) => ({
    name: `Match ${index + 1}`,
    score: match.score,
    accuracy: match.accuracy,
  }));

  return (
    <div className="w-full max-w-4xl mx-auto my-6">
      <h2 className="text-center text-xl font-pixel mb-4 text-white">📈 User Progress</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#ccc" fontSize={12} />
          <YAxis yAxisId="left" stroke="#ccc" fontSize={12} label={{ value: 'Score', angle: -90, position: 'insideLeft', offset:10 }} />
          <YAxis yAxisId="right" orientation="right" stroke="#ccc" fontSize={12} label={{ value: 'Accuracy (%)', angle: -90, position: 'insideRight' }} />
          <Tooltip />
          <Line yAxisId="left" type="monotone" dataKey="score" stroke="#82ca9d" activeDot={{ r: 8 }} name="Score" />
          <Scatter yAxisId="right" data={data} fill="#8884d8" name="Accuracy" line shape="circle" dataKey="accuracy" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}