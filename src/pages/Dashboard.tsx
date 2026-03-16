import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { mockResults } from '@/data/mockData';
import { topics } from '@/data/topics';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Target, TrendingUp, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const results = mockResults;
  const avgAccuracy = results.length ? Math.round(results.reduce((a, r) => a + r.accuracy, 0) / results.length) : 0;

  const chartData = results.map(r => ({
    topic: r.topicTitle.split(' ')[0],
    accuracy: r.accuracy,
  }));

  const lowPerformance = results.filter(r => r.accuracy < 70);

  const stats = [
    { label: 'Tests Completed', value: results.length, icon: Target },
    { label: 'Avg Accuracy', value: `${avgAccuracy}%`, icon: TrendingUp },
    { label: 'Topics Available', value: topics.length, icon: BookOpen },
    { label: 'Points Earned', value: user?.points || 0, icon: Award },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Welcome back, {user?.name?.split(' ')[0]}</h1>
        <p className="text-sm text-muted-foreground mt-1">Here's your learning progress overview.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05, ease: [0.2, 0, 0, 1] }}
            className="shadow-card rounded-xl bg-card p-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <s.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-mono text-xl font-semibold tabular-nums text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.2, ease: [0.2, 0, 0, 1] }}
          className="shadow-card rounded-xl bg-card p-5 lg:col-span-2"
        >
          <h2 className="text-sm font-medium text-foreground mb-4">Topic Performance</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="topic" tick={{ fontSize: 11, fill: 'hsl(215 16% 47%)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(215 16% 47%)' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,.1)', fontSize: 12 }}
                  formatter={(value: number) => [`${value}%`, 'Accuracy']}
                />
                <Bar dataKey="accuracy" fill="hsl(243 75% 59%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Smart Suggestion */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.25, ease: [0.2, 0, 0, 1] }}
          className="shadow-card rounded-xl bg-card p-5 space-y-4"
        >
          <h2 className="text-sm font-medium text-foreground">Smart Suggestions</h2>
          {lowPerformance.length > 0 ? (
            <div className="rounded-lg bg-destructive/5 p-4 space-y-2">
              <p className="text-sm text-foreground font-medium">Areas to improve</p>
              {lowPerformance.map(r => (
                <p key={r.id} className="text-xs text-muted-foreground">
                  Your accuracy in <span className="font-medium text-foreground">{r.topicTitle}</span> is {r.accuracy}%. Consider revising.
                </p>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Great work! Keep up the consistency.</p>
          )}
          <Link
            to="/topics"
            className="block w-full rounded-lg bg-primary py-2 text-center text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Browse Topics
          </Link>
        </motion.div>
      </div>

      {/* Recent Results */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.3, ease: [0.2, 0, 0, 1] }}
        className="shadow-card rounded-xl bg-card p-5"
      >
        <h2 className="text-sm font-medium text-foreground mb-4">Recent Results</h2>
        <div className="space-y-2">
          {results.slice(0, 5).map(r => (
            <div key={r.id} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">{r.topicTitle}</p>
                <p className="text-xs text-muted-foreground">{r.date}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm font-semibold tabular-nums text-foreground">{r.score}/{r.total}</p>
                <p className={`font-mono text-xs tabular-nums ${r.accuracy >= 70 ? 'text-success' : 'text-destructive'}`}>
                  {r.accuracy}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
