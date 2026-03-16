import React from 'react';
import { Link } from 'react-router-dom';
import { topics } from '@/data/topics';
import { motion } from 'framer-motion';
import { Code2, Braces, Network, Brain, Cpu, Lightbulb, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Code2, Braces, Network, Brain, Cpu, Lightbulb,
};

const Topics: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Topics</h1>
        <p className="text-sm text-muted-foreground mt-1">Select a topic to learn and test your knowledge.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic, i) => {
          const Icon = iconMap[topic.icon] || Code2;
          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.05, ease: [0.2, 0, 0, 1] }}
            >
              <Link
                to={`/topics/${topic.id}`}
                className="group block shadow-card hover:shadow-card-hover rounded-xl bg-card p-5 transition-shadow"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{topic.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{topic.description}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Topics;
