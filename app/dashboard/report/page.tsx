'use client';

import Link from 'next/link';
import { Shield, Download, Calendar, ArrowLeft, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

export default function ReportPage() {
  const reportData = {
    score: 78,
    date: 'Feb 8, 2026',
    technicalAccuracy: 85,
    communication: 65,
    codeLogic: 80,
    confidence: 55,
    strengths: [
      'Strong understanding of React hooks',
      'Good explanation of component lifecycle',
      'Clear code structure and organization'
    ],
    improvements: [
      'Reduce filler words (um: 12, uh: 8)',
      'Explain async/await concepts more clearly',
      'Practice state management explanations'
    ],
    recommendations: [
      'Practice explaining async patterns',
      'Review Redux/Context API concepts',
      'Take 3 more mock interviews this week'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PlaceReady AI
              </span>
            </Link>
            <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-blue-600 transition">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Report</h1>
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Interview Date: {reportData.date}</span>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Download Report
          </button>
        </div>

        {/* Overall Score */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Overall Readiness Score</h2>
            <div className="flex items-baseline justify-center space-x-2">
              <span className="text-7xl font-bold">{reportData.score}</span>
              <span className="text-4xl">/100</span>
            </div>
            <p className="mt-4 text-blue-100 text-lg">
              {reportData.score >= 70 
                ? 'Great job! You\'re well prepared for interviews.' 
                : 'Keep practicing to improve your readiness score.'}
            </p>
          </div>
        </div>

        {/* Performance Breakdown */}
        <div className="bg-white rounded-xl p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Breakdown</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-900">Technical Accuracy</span>
                <span className="font-bold text-blue-600">{reportData.technicalAccuracy}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 rounded-full h-3 transition-all duration-1000"
                  style={{ width: `${reportData.technicalAccuracy}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-900">Communication</span>
                <span className="font-bold text-purple-600">{reportData.communication}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-purple-600 rounded-full h-3 transition-all duration-1000"
                  style={{ width: `${reportData.communication}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-900">Code Logic</span>
                <span className="font-bold text-green-600">{reportData.codeLogic}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-600 rounded-full h-3 transition-all duration-1000"
                  style={{ width: `${reportData.codeLogic}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-900">Confidence</span>
                <span className="font-bold text-orange-600">{reportData.confidence}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-orange-600 rounded-full h-3 transition-all duration-1000"
                  style={{ width: `${reportData.confidence}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Feedback */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Strengths */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              Strengths
            </h3>
            <div className="space-y-3">
              {reportData.strengths.map((strength, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Areas to Improve */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <AlertCircle className="h-6 w-6 text-orange-600 mr-2" />
              Areas to Improve
            </h3>
            <div className="space-y-3">
              {reportData.improvements.map((improvement, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{improvement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="bg-white rounded-xl p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
            Recommended Actions
          </h2>
          <div className="space-y-4">
            {reportData.recommendations.map((recommendation, idx) => (
              <div key={idx} className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-blue-900">{recommendation}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/dashboard/interview"
            className="bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition text-center font-semibold"
          >
            Schedule Next Interview
          </Link>
          <Link
            href="/dashboard"
            className="bg-gray-200 text-gray-700 px-6 py-4 rounded-lg hover:bg-gray-300 transition text-center font-semibold"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
