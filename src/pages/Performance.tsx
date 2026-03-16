import React from 'react';
import { mockResults } from '@/data/mockData';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line } from 'recharts';

const Performance: React.FC = () => {
  const results = mockResults;
  const totalCorrect = results.reduce((a, r) => a + r.score, 0);
  const totalQuestions = results.reduce((a, r) => a + r.total, 0);
  const totalWrong = totalQuestions - totalCorrect;
  const avgAccuracy = Math.round((totalCorrect / totalQuestions) * 100);

  const pieData = [
    { name: 'Correct', value: totalCorrect },
    { name: 'Incorrect', value: totalWrong },
  ];
  const PIE_COLORS = ['hsl(142, 76%, 36%)', 'hsl(0, 84%, 60%)'];

  const barData = results.map(r => ({ topic: r.topicTitle.split(' ').slice(0, 2).join(' '), accuracy: r.accuracy }));
  const lineData = results.map(r => ({ date: r.date.slice(5), accuracy: r.accuracy })).reverse();

  const weakAreas = results.filter(r => r.accuracy < 75).flatMap(r => r.incorrectTags);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Performance Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Track your progress and identify areas for improvement.</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Overall Accuracy', value: `${avgAccuracy}%` },
          { label: 'Total Correct', value: totalCorrect },
          { label: 'Tests Taken', value: results.length },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="shadow-card rounded-xl bg-card p-5 text-center">
            <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Pie */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="shadow-card rounded-xl bg-card p-5">
          <h2 className="text-sm font-medium text-foreground mb-4">Correct vs Incorrect</h2>
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,.1)', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-2">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="h-2 w-2 rounded-full bg-success" /> Correct ({totalCorrect})</span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="h-2 w-2 rounded-full bg-destructive" /> Incorrect ({totalWrong})</span>
          </div>
        </motion.div>

        {/* Bar */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="shadow-card rounded-xl bg-card p-5">
          <h2 className="text-sm font-medium text-foreground mb-4">Topic Performance</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: 'hsl(215 16% 47%)' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="topic" tick={{ fontSize: 11, fill: 'hsl(215 16% 47%)' }} axisLine={false} tickLine={false} width={100} />
                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,.1)', fontSize: 12 }} formatter={(v: number) => [`${v}%`, 'Accuracy']} />
                <Bar dataKey="accuracy" fill="hsl(243 75% 59%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Line chart */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="shadow-card rounded-xl bg-card p-5">
        <h2 className="text-sm font-medium text-foreground mb-4">Progress Over Time</h2>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'hsl(215 16% 47%)' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: 'hsl(215 16% 47%)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,.1)', fontSize: 12 }} formatter={(v: number) => [`${v}%`, 'Accuracy']} />
              <Line type="monotone" dataKey="accuracy" stroke="hsl(199 89% 48%)" strokeWidth={2} dot={{ r: 4, fill: 'hsl(199 89% 48%)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Weak Areas */}
      {weakAreas.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="shadow-card rounded-xl bg-card p-5">
          <h2 className="text-sm font-medium text-foreground mb-3">Weak Areas to Focus</h2>
          <div className="flex flex-wrap gap-2">
            {[...new Set(weakAreas)].map(tag => (
              <span key={tag} className="rounded-md bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">{tag}</span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Performance;
