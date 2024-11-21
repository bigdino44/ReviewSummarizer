import React, { useState, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { ReviewInput } from './components/ReviewInput';
import { LoadingOverlay } from './components/LoadingOverlay';
import { ErrorBoundary } from './components/ErrorBoundary';
import { analyzeReviews } from './utils/reviewAnalyzer';

// Lazy load the Summary component
const Summary = React.lazy(() => import('./components/Summary'));

export default function App() {
  const [summary, setSummary] = useState<ReturnType<typeof analyzeReviews> | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReviewSubmit = async (reviews: string) => {
    try {
      setIsAnalyzing(true);
      setError(null);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const result = analyzeReviews(reviews);
      setSummary(result);
    } catch (err) {
      setError('Failed to analyze reviews. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-50 via-indigo-50/50 to-white"></div>
        <div className="container mx-auto relative z-10">
          <Header />
          <div className="flex flex-col items-center space-y-16">
            <ReviewInput onSubmit={handleReviewSubmit} error={error} />
            <AnimatePresence>
              {isAnalyzing && <LoadingOverlay />}
            </AnimatePresence>
            <Suspense fallback={<LoadingOverlay />}>
              {summary && <Summary summary={summary} />}
            </Suspense>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}