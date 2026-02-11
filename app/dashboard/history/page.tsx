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

  // Create a reversed copy for chronological display (oldest to newest)
  const reversedInterviews = [...interviews].reverse();

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

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Interview History</h1>
          <p className="text-sm sm:text-base text-gray-600">Track your progress and review past interviews</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">{stats.totalInterviews}</div>
            <div className="text-xs sm:text-sm text-gray-600">Total Interviews</div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">{stats.averageScore}</div>
            <div className="text-xs sm:text-sm text-gray-600">Average Score</div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">+{stats.improvement}</div>
            <div className="text-xs sm:text-sm text-gray-600">Points Improved</div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1 sm:mb-2">{stats.hoursSpent}h</div>
            <div className="text-xs sm:text-sm text-gray-600">Practice Time</div>
          </div>
        </div>

        {/* Progress Chart */}
        <div className="bg-white rounded-xl p-4 sm:p-8 mb-6 sm:mb-8 border border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Score Progress Over Time</h2>
          <div className="relative h-64">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] sm:text-xs text-gray-500 pr-2">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            {/* Chart area */}
            <div className="ml-6 sm:ml-8 h-full flex items-end justify-between space-x-1 sm:space-x-2 border-l border-b border-gray-200 pl-2 sm:pl-4 pb-4">
              {reversedInterviews.map((interview, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div className="relative w-full">
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-[10px] sm:text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      Score: {interview.score}
                      <div className="text-gray-300">{interview.date}</div>
                    </div>
                    {/* Bar */}
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-sm sm:rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                      style={{ height: `${(interview.score / 100) * 200}px` }}
                    />
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-600 mt-2 transform -rotate-45 sm:-rotate-45 origin-top-left whitespace-nowrap">
                    {interview.date.split(' ')[0]} {interview.date.split(' ')[1]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interview List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Interviews</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {reversedInterviews.map((interview) => (
              <div key={interview.id} className="p-4 sm:p-6 hover:bg-gray-50 transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2">
                      <h3 className="font-bold text-gray-900">{interview.project}</h3>
                      <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold ${interview.score >= 70
                        ? 'bg-green-100 text-green-800'
                        : interview.score >= 50
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                        }`}>
                        Score: {interview.score}/100
                      </span>
                      <div className={`flex items-center text-xs sm:text-sm font-semibold ${interview.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {interview.trend === 'up' ? (
                          <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        )}
                        {interview.change}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        {interview.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        {interview.duration}
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/dashboard/report"
                    className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center text-sm font-semibold"
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
