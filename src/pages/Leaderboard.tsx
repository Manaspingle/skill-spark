import React from 'react';
import { mockLeaderboard } from '@/data/mockData';
import { motion } from 'framer-motion';
import { Trophy, Medal } from 'lucide-react';

const Leaderboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Leaderboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Top performers across all assessments.</p>
      </motion.div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4">
        {mockLeaderboard.slice(0, 3).map((entry, i) => {
          const colors = ['text-gold', 'text-silver', 'text-bronze'];
          const bgs = ['bg-gold/10', 'bg-silver/10', 'bg-bronze/10'];
          return (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`shadow-card rounded-xl bg-card p-5 text-center ${i === 0 ? 'ring-1 ring-gold/20' : ''}`}
            >
              <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full ${bgs[i]}`}>
                <Trophy className={`h-5 w-5 ${colors[i]}`} />
              </div>
              <p className="text-sm font-semibold text-foreground">{entry.name}</p>
              <p className="font-mono text-2xl font-semibold tabular-nums text-foreground mt-1">{entry.points}</p>
              <p className="text-xs text-muted-foreground">points</p>
              <div className="mt-3 flex justify-center gap-3 text-xs text-muted-foreground">
                <span>{entry.accuracy}% acc</span>
                <span>{entry.testsCompleted} tests</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full Table */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="shadow-card rounded-xl bg-card overflow-hidden">
        <div className="grid grid-cols-[3rem_1fr_5rem_5rem_5rem_5rem] gap-2 px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-border">
          <span>Rank</span><span>Name</span><span className="text-right">Points</span><span className="text-right">Accuracy</span><span className="text-right">Tests</span><span className="text-right">Badge</span>
        </div>
        {mockLeaderboard.map((entry, i) => (
          <div key={entry.rank} className="grid grid-cols-[3rem_1fr_5rem_5rem_5rem_5rem] gap-2 px-5 py-3 items-center hover:bg-muted/30 transition-colors">
            <span className="font-mono text-sm font-semibold tabular-nums text-foreground">#{entry.rank}</span>
            <span className="text-sm text-foreground">{entry.name}</span>
            <span className="font-mono text-sm tabular-nums text-foreground text-right">{entry.points}</span>
            <span className="font-mono text-sm tabular-nums text-foreground text-right">{entry.accuracy}%</span>
            <span className="font-mono text-sm tabular-nums text-muted-foreground text-right">{entry.testsCompleted}</span>
            <span className="text-right">
              {entry.badge !== 'none' && (
                <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium ${
                  entry.badge === 'gold' ? 'bg-gold/10 text-gold' :
                  entry.badge === 'silver' ? 'bg-silver/10 text-silver' :
                  'bg-bronze/10 text-bronze'
                }`}>
                  <Medal className="h-3 w-3" />{entry.badge}
                </span>
              )}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Leaderboard;
