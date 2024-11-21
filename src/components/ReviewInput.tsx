import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquarePlus, Upload, AlertCircle, X } from 'lucide-react';

interface ReviewInputProps {
  onSubmit: (reviews: string) => void;
  error?: string | null;
}

export function ReviewInput({ onSubmit, error }: ReviewInputProps) {
  const [reviews, setReviews] = React.useState('');
  const [charCount, setCharCount] = React.useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reviews.trim()) {
      onSubmit(reviews);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviews(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData('text');
    setReviews(pastedText);
    setCharCount(pastedText.length);
  };

  const clearInput = () => {
    setReviews('');
    setCharCount(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <div className="absolute inset-0 premium-gradient rounded-2xl blur opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
          
          <div className="absolute top-4 right-4 flex items-center space-x-3 z-10">
            <MessageSquarePlus className="text-blue-500" size={20} />
            <span className="text-sm text-gray-500 bg-white/80 px-3 py-1 rounded-full premium-shadow">
              {charCount} characters
            </span>
            {reviews && (
              <button
                type="button"
                onClick={clearInput}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={16} className="text-gray-500" />
              </button>
            )}
          </div>

          <textarea
            value={reviews}
            onChange={handleTextChange}
            onPaste={handlePaste}
            placeholder="Paste your customer reviews here... Our enterprise AI will analyze the content and provide valuable insights."
            className="w-full h-64 p-6 text-gray-700 bg-white/80 backdrop-blur-lg border border-gray-100 rounded-2xl premium-shadow focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all duration-300 text-lg relative z-0"
          />

          <div className="absolute bottom-4 right-4 text-sm text-gray-500 bg-white/80 px-3 py-1 rounded-full premium-shadow">
            Enterprise Analysis
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg"
          >
            <AlertCircle size={16} />
            <p className="text-sm font-medium">{error}</p>
          </motion.div>
        )}

        <div className="flex justify-between items-center px-2">
          <div className="flex items-center space-x-2 text-gray-600">
            <AlertCircle size={16} className="text-blue-500" />
            <p className="text-sm">
              For optimal results, include 3+ reviews
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!reviews.trim()}
            className={`py-4 px-8 rounded-2xl premium-shadow font-medium flex items-center space-x-3 ${
              !reviews.trim()
                ? 'bg-gray-200 cursor-not-allowed'
                : 'premium-gradient text-white hover:shadow-lg hover:shadow-blue-500/20'
            } transition-all duration-300`}
          >
            <Upload size={20} />
            <span>Analyze Reviews</span>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}