import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { topics, getTopicQuestions } from '@/data/topics';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, CheckCircle2, Play } from 'lucide-react';

const TopicDetail: React.FC = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const topic = topics.find(t => t.id === topicId);
  const questionCount = getTopicQuestions(topicId || '').length;

  if (!topic) return <div className="p-8 text-center text-muted-foreground">Topic not found.</div>;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}>
        <button onClick={() => navigate('/topics')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Topics
        </button>

        <div className="shadow-card rounded-xl bg-card p-6 space-y-6">
          <div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary uppercase tracking-wider">
              <BookOpen className="h-3 w-3" /> Learning Module
            </span>
            <h1 className="mt-2 text-xl font-semibold tracking-tight text-foreground text-balance">{topic.title}</h1>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{topic.content}</p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-foreground mb-3">Key Points</h2>
            <div className="space-y-2">
              {topic.keyPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-2.5 rounded-lg bg-muted/50 px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-primary/5 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-foreground">Ready to test?</p>
              <p className="text-xs text-muted-foreground">{questionCount} questions available</p>
            </div>
            <Link
              to={`/test/${topic.id}`}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity active:scale-[0.99]"
            >
              <Play className="h-3.5 w-3.5" /> Start Assessment
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TopicDetail;
