import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ThumbsUp, ThumbsDown, MessageCircle, Star, Clock, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

interface SummaryProps {
  summary: {
    sentiment: string;
    keyPoints: string[];
    commonPhrases: string[];
    score: number;
    reviewCount: number;
  };
}

export default function Summary({ summary }: SummaryProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-4xl space-y-8"
    >
      <motion.div variants={item} className="grid grid-cols-3 gap-6">
        {[
          { value: summary.reviewCount, label: "Reviews Analyzed" },
          { value: summary.score.toFixed(1), label: "Average Rating" },
          { value: format(new Date(), 'MMM d, yyyy'), label: "Analysis Date" }
        ].map((stat, index) => (
          <div key={index} className="group relative">
            <div className="absolute inset-0 premium-gradient rounded-2xl blur opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="glass-card rounded-2xl p-6 premium-shadow relative z-10 flex flex-col items-center justify-center group-hover:scale-[1.02] transition-transform duration-300">
              <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div variants={item} className="relative group">
        <div className="absolute inset-0 premium-gradient rounded-2xl blur opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
        <div className="glass-card rounded-2xl p-8 premium-shadow relative z-10">
          <div className="flex items-center space-x-3 mb-6">
            <Star className="text-blue-600" size={28} />
            <h2 className="text-2xl font-bold text-gradient">Sentiment Analysis</h2>
          </div>
          <div className="bg-white/50 p-6 rounded-xl backdrop-blur-sm">
            {summary.sentiment === 'positive' ? (
              <ThumbsUp className="text-green-500 h-12 w-12 mb-4" />
            ) : (
              <ThumbsDown className="text-red-500 h-12 w-12 mb-4" />
            )}
            <p className="text-2xl font-semibold text-gray-800 capitalize mb-2">{summary.sentiment}</p>
            <p className="text-gray-600">Overall customer sentiment based on AI analysis</p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="relative group">
        <div className="absolute inset-0 premium-gradient rounded-2xl blur opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
        <div className="glass-card rounded-2xl p-8 premium-shadow relative z-10">
          <div className="flex items-center space-x-3 mb-6">
            <MessageCircle className="text-blue-600" size={28} />
            <h2 className="text-2xl font-bold text-gradient">Key Insights</h2>
          </div>
          <ul className="space-y-4">
            {summary.keyPoints.map((point, index) => (
              <motion.li
                key={index}
                variants={item}
                className="group flex items-start space-x-4 bg-white/50 p-6 rounded-xl backdrop-blur-sm hover:bg-white/70 transition-colors duration-300"
              >
                <span className="flex-shrink-0 w-10 h-10 premium-gradient rounded-xl flex items-center justify-center text-lg font-semibold text-white">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-gray-700 text-lg">{point}</p>
                </div>
                <ChevronRight className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.div variants={item} className="relative group">
        <div className="absolute inset-0 premium-gradient rounded-2xl blur opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
        <div className="glass-card rounded-2xl p-8 premium-shadow relative z-10">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="text-blue-600" size={28} />
            <h2 className="text-2xl font-bold text-gradient">Trending Phrases</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {summary.commonPhrases.map((phrase, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-white/50 backdrop-blur-sm text-blue-600 rounded-xl text-base font-medium hover:bg-white/70 hover:scale-105 transition-all duration-300 cursor-default premium-shadow"
              >
                {phrase}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 rounded-full premium-shadow">
          <Clock className="text-blue-500" size={16} />
          <span className="text-gray-600">
            Last updated {format(new Date(), 'MMMM d, yyyy HH:mm')}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}