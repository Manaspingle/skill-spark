import React, { useState } from 'react';
import { topics, questions } from '@/data/topics';
import { mockLeaderboard, mockResults } from '@/data/mockData';
import { motion } from 'framer-motion';
import { Users, BookOpen, HelpCircle, BarChart3, Plus, Trash2, Edit2 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'questions' | 'students'>('overview');

  const totalStudents = mockLeaderboard.length;
  const avgScore = Math.round(mockResults.reduce((a, r) => a + r.accuracy, 0) / mockResults.length);

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'questions' as const, label: 'Question Bank' },
    { id: 'students' as const, label: 'Students' },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage topics, questions, and monitor student progress.</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-lg p-1 w-fit">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${
              activeTab === t.id ? 'bg-card shadow-card text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Students', value: totalStudents, icon: Users },
              { label: 'Avg Accuracy', value: `${avgScore}%`, icon: BarChart3 },
              { label: 'Topics', value: topics.length, icon: BookOpen },
              { label: 'Questions', value: questions.length, icon: HelpCircle },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="shadow-card rounded-xl bg-card p-5">
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

          {/* Hardest Topics */}
          <div className="shadow-card rounded-xl bg-card p-5">
            <h2 className="text-sm font-medium text-foreground mb-3">Hardest Topics (Lowest Avg Accuracy)</h2>
            <div className="space-y-2">
              {mockResults.sort((a, b) => a.accuracy - b.accuracy).slice(0, 3).map(r => (
                <div key={r.id} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                  <span className="text-sm text-foreground">{r.topicTitle}</span>
                  <span className="font-mono text-sm tabular-nums text-destructive">{r.accuracy}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'questions' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
              <Plus className="h-4 w-4" /> Add Question
            </button>
          </div>
          {topics.map(topic => {
            const topicQs = questions.filter(q => q.topicId === topic.id);
            return (
              <div key={topic.id} className="shadow-card rounded-xl bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">{topic.title} ({topicQs.length} questions)</h3>
                <div className="space-y-2">
                  {topicQs.slice(0, 3).map(q => (
                    <div key={q.id} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                      <p className="text-sm text-foreground truncate flex-1 mr-4">{q.question}</p>
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded hover:bg-muted transition-colors"><Edit2 className="h-3.5 w-3.5 text-muted-foreground" /></button>
                        <button className="p-1.5 rounded hover:bg-destructive/10 transition-colors"><Trash2 className="h-3.5 w-3.5 text-destructive" /></button>
                      </div>
                    </div>
                  ))}
                  {topicQs.length > 3 && <p className="text-xs text-muted-foreground pl-4">+{topicQs.length - 3} more questions</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'students' && (
        <div className="shadow-card rounded-xl bg-card overflow-hidden">
          <div className="grid grid-cols-[1fr_5rem_5rem_5rem] gap-2 px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-border">
            <span>Name</span><span className="text-right">Points</span><span className="text-right">Accuracy</span><span className="text-right">Tests</span>
          </div>
          {mockLeaderboard.map(s => (
            <div key={s.rank} className="grid grid-cols-[1fr_5rem_5rem_5rem] gap-2 px-5 py-3 items-center hover:bg-muted/30 transition-colors">
              <span className="text-sm text-foreground">{s.name}</span>
              <span className="font-mono text-sm tabular-nums text-foreground text-right">{s.points}</span>
              <span className="font-mono text-sm tabular-nums text-foreground text-right">{s.accuracy}%</span>
              <span className="font-mono text-sm tabular-nums text-muted-foreground text-right">{s.testsCompleted}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
