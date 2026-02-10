'use client';

import Link from 'next/link';
import { Shield, ArrowLeft, Calendar, Clock, TrendingUp, TrendingDown, Eye } from 'lucide-react';

export default function HistoryPage() {
  const interviews = [
    {
      id: 1,
      date: 'Feb 8, 2026',
      project: 'E-commerce App',
      score: 78,
      duration: '25 min',
      trend: 'up',
      change: '+12'
    },
    {
      id: 2,
      date: 'Feb 5, 2026',
      project: 'E-commerce App',
      score: 66,
      duration: '22 min',
      trend: 'up',
      change: '+8'
    },
    {
      id: 3,
      date: 'Feb 2, 2026',
      project: 'Todo App',
      score: 58,
      duration: '18 min',
      trend: 'down',
      change: '-5'
    },
    {
      id: 4,
      date: 'Jan 30, 2026',
      project: 'Weather App',
      score: 63,
      duration: '20 min',
      trend: 'up',
      change: '+15'
    },
    {
      id: 5,
      date: 'Jan 27, 2026',
      project: 'Weather App',
      score: 48,
      duration: '15 min',
      trend: 'up',
      change: '+8'
    }
  ];

  const stats = {
    totalInterviews: 15,
    averageScore: 65,
    improvement: 30,
    hoursSpent: 6.5
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview History</h1>
          <p className="text-gray-600">Track your progress and review past interviews</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalInterviews}</div>
            <div className="text-sm text-gray-600">Total Interviews</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">{stats.averageScore}</div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="text-3xl font-bold text-green-600 mb-2">+{stats.improvement}</div>
            <div className="text-sm text-gray-600">Points Improved</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="text-3xl font-bold text-orange-600 mb-2">{stats.hoursSpent}h</div>
            <div className="text-sm text-gray-600">Practice Time</div>
          </div>
        </div>

        {/* Progress Chart Placeholder */}
        <div className="bg-white rounded-xl p-8 mb-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Score Progress Over Time</h2>
          <div className="h-64 flex items-end justify-between space-x-2">
            {interviews.reverse().map((interview, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${(interview.score / 100) * 100}%` }}
                />
                <div className="text-xs text-gray-600 mt-2">{interview.score}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500">
            <span>Jan 27</span>
            <span>Feb 8</span>
          </div>
        </div>

        {/* Interview List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Interviews</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {interviews.reverse().map((interview) => (
              <div key={interview.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="font-bold text-gray-900">{interview.project}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        interview.score >= 70 
                          ? 'bg-green-100 text-green-800' 
                          : interview.score >= 50 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        Score: {interview.score}/100
                      </span>
                      <div className={`flex items-center text-sm font-semibold ${
                        interview.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {interview.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {interview.change}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {interview.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {interview.duration}
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/dashboard/report"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center text-sm font-semibold"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Report
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <Link
            href="/dashboard/interview"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-semibold text-lg flex items-center justify-center"
          >
            Start New Interview
          </Link>
        </div>
      </div>
    </div>
  );
}
