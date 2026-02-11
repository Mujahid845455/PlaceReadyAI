'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Mic, MicOff, SkipForward, Lightbulb, XCircle, ArrowLeft } from 'lucide-react';

export default function InterviewPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timer, setTimer] = useState(0);
  const [nervousness, setNervousness] = useState(40);
  const [confidence, setConfidence] = useState(60);
  const [fillerWords, setFillerWords] = useState(3);

  const questions = [
    "Explain the useEffect hook in your component. Why did you choose this approach?",
    "In your UserAuth component, you used useEffect with an empty dependency array. Why did you choose this approach instead of useLayoutEffect?",
    "How did you handle state management in your e-commerce application?",
    "Explain your authentication flow and why you chose this implementation.",
    "What performance optimizations did you implement in your React application?"
  ];

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimer(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setIsRecording(false);
      setTimer(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link href="/dashboard" className="flex items-center space-x-1 sm:space-x-2">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PlaceReady AI
              </span>
            </Link>
            <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-blue-600 transition text-sm sm:text-base">
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Mock Interview Session</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Answer questions about your React.js project</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-xs sm:text-sm text-gray-600">Question</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-600">{currentQuestion} / {questions.length}</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-semibold text-gray-700">Interview Progress</span>
            <span className="text-xs sm:text-sm text-gray-600">{Math.round((currentQuestion / questions.length) * 100)}%</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full h-2 transition-all duration-500"
              style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Interview Card */}
        <div className="bg-white rounded-xl p-4 sm:p-8 mb-4 sm:mb-6 border border-gray-200">
          {/* Question */}
          <div className="mb-6 sm:mb-8">
            <div className="text-xs sm:text-sm font-semibold text-gray-500 mb-2">CURRENT QUESTION</div>
            <div className="text-base sm:text-xl font-semibold text-gray-900 leading-relaxed">
              "{questions[currentQuestion - 1]}"
            </div>
          </div>

          {/* Recording Interface */}
          <div className="flex flex-col items-center py-6 sm:py-8">
            <button
              onClick={toggleRecording}
              className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center transition-all duration-300 ${isRecording
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {isRecording ? (
                <MicOff className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
              ) : (
                <Mic className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
              )}
            </button>

            <div className="mt-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{formatTime(timer)}</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">
                {isRecording ? 'Recording...' : 'Click to start recording'}
              </div>
            </div>
          </div>

          {/* Real-time Feedback */}
          {isRecording && (
            <div className="mt-8 space-y-4 animate-fade-in">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-blue-900">Nervousness Meter</span>
                  <span className="text-sm font-bold text-blue-900">{nervousness}%</span>
                </div>
                <div className="bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 rounded-full h-2 transition-all duration-500"
                    style={{ width: `${nervousness}%` }}
                  />
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-green-900">Confidence Level</span>
                  <span className="text-sm font-bold text-green-900">{confidence}%</span>
                </div>
                <div className="bg-green-200 rounded-full h-2">
                  <div
                    className="bg-green-600 rounded-full h-2 transition-all duration-500"
                    style={{ width: `${confidence}%` }}
                  />
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-orange-900">Filler Words Detected</span>
                  <span className="text-sm font-bold text-orange-900">{fillerWords} (um, uh)</span>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-purple-900">Speaking Pace</span>
                  <span className="text-sm font-bold text-purple-900">Good ✓</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={nextQuestion}
              disabled={currentQuestion >= questions.length}
              className="w-full sm:flex-1 bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
            >
              <SkipForward className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              {currentQuestion >= questions.length ? 'Last Question' : 'Skip Question'}
            </button>

            <button className="w-full sm:flex-1 bg-purple-600 text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center text-sm sm:text-base">
              <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Get Hint
            </button>

            <Link
              href="/dashboard/report"
              className="w-full sm:flex-1 bg-red-600 text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-red-700 transition flex items-center justify-center text-sm sm:text-base"
            >
              <XCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              End Interview
            </Link>
          </div>
        </div>

        {/* Tips Card */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 sm:p-6 border border-blue-200">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center text-sm sm:text-base">
            <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-600" />
            Interview Tips
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
            <li>• Take a deep breath before answering</li>
            <li>• Structure your answer: Context → Action → Result</li>
            <li>• Use specific examples from your code</li>
            <li>• It's okay to pause and think before speaking</li>
            <li>• Speak clearly and at a moderate pace</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
