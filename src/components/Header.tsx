import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, BarChart2, Star, Zap } from 'lucide-react';

export function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 mb-16"
    >
      <div className="text-center">
        <motion.div 
          className="flex items-center justify-center space-x-4 mb-8"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <div className="absolute inset-0 premium-gradient rounded-full blur-xl opacity-20"></div>
            <Bot className="text-blue-600 floating-animation" size={48} />
          </div>
          <h1 className="text-6xl font-bold text-gradient">
            AI Review Summarizer
          </h1>
          <div className="relative">
            <div className="absolute inset-0 premium-gradient rounded-full blur-xl opacity-20"></div>
            <Sparkles className="text-blue-600 floating-animation" size={48} />
          </div>
        </motion.div>
        
        <div className="flex justify-center gap-12 mb-12">
          {[
            { icon: BarChart2, text: "Real-time Analysis" },
            { icon: Bot, text: "AI-Powered Insights" },
            { icon: Star, text: "Smart Summaries" },
            { icon: Zap, text: "Instant Results" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex items-center space-x-3 px-6 py-3 rounded-2xl glass-card premium-shadow hover:scale-105 transition-all duration-300"
            >
              <feature.icon className="text-blue-600 group-hover:scale-110 transition-transform duration-300" size={24} />
              <span className="text-gray-700 font-medium">{feature.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          Transform your customer feedback into actionable insights with our
          <span className="text-gradient font-semibold"> enterprise-grade </span>
          AI analysis platform. Get comprehensive summaries, sentiment analysis, and key trends in seconds.
        </motion.p>
      </div>
    </motion.div>
  );
}