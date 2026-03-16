import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBadgeForScore } from '@/data/mockData';
import { Trophy, RotateCcw, BarChart3, CheckCircle2, XCircle } from 'lucide-react';
import type { Question } from '@/data/topics';

const TestResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showResult, setShowResult] = useState(false);
  const [progress, setProgress] = useState(0);

  const state = location.state as {
    topicId: string;
    topicTitle: string;
    score: number;
    total: number;
    accuracy: number;
    timeTaken: number;
    answers: Record<string, number>;
    questions: Question[];
  } | null;

  useEffect(() => {
    if (!state) { navigate('/dashboard'); return; }
    const timer1 = setTimeout(() => setProgress(100), 100);
    const timer2 = setTimeout(() => setShowResult(true), 1600);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, [state, navigate]);

  if (!state) return null;

  const { topicTitle, score, total, accuracy, timeTaken, answers, questions, topicId } = state;
  const badge = getBadgeForScore(accuracy);
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  if (!showResult) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4 w-64">
          <p className="text-sm font-medium text-muted-foreground">Calculating your results...</p>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all duration-[1.5s] ease-out" style={{ width: `${progress}%` }} />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}>
        {/* Score Card */}
        <div className="shadow-card rounded-xl bg-card p-6 text-center space-y-4">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Assessment Complete</span>
          <div className="flex items-center justify-center gap-2">
            <Trophy className={`h-6 w-6 ${badge.badge === 'gold' ? 'text-gold' : badge.badge === 'silver' ? 'text-silver' : badge.badge === 'bronze' ? 'text-bronze' : 'text-muted-foreground'}`} />
            <span className="text-sm font-semibold text-foreground">{badge.label}</span>
          </div>
          <p className="font-mono text-5xl font-semibold tabular-nums text-foreground">{accuracy}%</p>
          <p className="text-sm text-muted-foreground">{topicTitle}</p>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div>
              <p className="font-mono text-lg font-semibold tabular-nums text-foreground">{score}/{total}</p>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>
            <div>
              <p className="font-mono text-lg font-semibold tabular-nums text-foreground">{total - score}</p>
              <p className="text-xs text-muted-foreground">Wrong</p>
            </div>
            <div>
              <p className="font-mono text-lg font-semibold tabular-nums text-foreground">{minutes}:{String(seconds).padStart(2, '0')}</p>
              <p className="text-xs text-muted-foreground">Time</p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Link
              to={`/test/${topicId}`}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-muted py-2.5 text-sm font-medium text-foreground hover:bg-muted/80 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Retake
            </Link>
            <Link
              to="/performance"
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <BarChart3 className="h-3.5 w-3.5" /> Analytics
            </Link>
          </div>
        </div>

        {/* Answer Review */}
        <div className="mt-6 shadow-card rounded-xl bg-card p-5">
          <h2 className="text-sm font-medium text-foreground mb-4">Answer Review</h2>
          <div className="space-y-3">
            {questions.map((q, idx) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div key={q.id} className={`rounded-lg px-4 py-3 ${isCorrect ? 'bg-success/5' : 'bg-destructive/5'}`}>
                  <div className="flex items-start gap-2">
                    {isCorrect ? <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" /> : <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{idx + 1}. {q.question}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your answer: <span className={isCorrect ? 'text-success' : 'text-destructive'}>{q.options[userAnswer]}</span>
                        {!isCorrect && <span className="text-success ml-2">Correct: {q.options[q.correctAnswer]}</span>}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TestResult;
