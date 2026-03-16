import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { topics, getTopicQuestions } from '@/data/topics';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const TestPage: React.FC = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const topic = topics.find(t => t.id === topicId);

  const allQuestions = useMemo(() => {
    const qs = getTopicQuestions(topicId || '');
    return [...qs].sort(() => Math.random() - 0.5);
  }, [topicId]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!topic || allQuestions.length === 0) return <div className="p-8 text-center text-muted-foreground">No questions found.</div>;

  const q = allQuestions[currentIdx];
  const totalQ = allQuestions.length;
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  const handleSelect = (optIdx: number) => {
    setAnswers(prev => ({ ...prev, [q.id]: optIdx }));
  };

  const handleSubmit = () => {
    let score = 0;
    allQuestions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) score++;
    });
    const accuracy = Math.round((score / totalQ) * 100);
    navigate('/result', {
      state: {
        topicId: topic.id,
        topicTitle: topic.title,
        score,
        total: totalQ,
        accuracy,
        timeTaken: elapsed,
        answers,
        questions: allQuestions,
      },
    });
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
            Question {String(currentIdx + 1).padStart(2, '0')}/{String(totalQ).padStart(2, '0')}
          </span>
          <div className="mt-1 h-1 w-32 rounded-full bg-muted">
            <div className="h-1 rounded-full bg-primary transition-all" style={{ width: `${((currentIdx + 1) / totalQ) * 100}%` }} />
          </div>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-sm tabular-nums text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
          className="shadow-card rounded-xl bg-card p-6 lg:p-8"
        >
          <h2 className="text-lg font-semibold text-foreground leading-snug text-balance">{q.question}</h2>
          <div className="mt-6 space-y-3">
            {q.options.map((opt, idx) => {
              const isSelected = answers[q.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 flex items-center gap-4 active:scale-[0.99] ${
                    isSelected ? 'shadow-option-selected bg-primary/5' : 'shadow-option hover:bg-muted/50'
                  }`}
                >
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className={`text-sm ${isSelected ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{opt}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentIdx(i => Math.max(0, i - 1))}
          disabled={currentIdx === 0}
          className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>

        {currentIdx === totalQ - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={answeredCount < totalQ}
            className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-all active:scale-[0.99]"
          >
            Submit Assessment ({answeredCount}/{totalQ})
          </button>
        ) : (
          <button
            onClick={() => setCurrentIdx(i => Math.min(totalQ - 1, i + 1))}
            className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-primary hover:opacity-80 transition-colors"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Question Map */}
      <div className="shadow-card rounded-xl bg-card p-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">Question Map</p>
        <div className="flex flex-wrap gap-1.5">
          {allQuestions.map((question, idx) => (
            <button
              key={question.id}
              onClick={() => setCurrentIdx(idx)}
              className={`h-7 w-7 rounded text-xs font-mono font-medium transition-all ${
                idx === currentIdx
                  ? 'bg-primary text-primary-foreground'
                  : answers[question.id] !== undefined
                    ? 'bg-primary/15 text-primary'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
