'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, Github, Code, MessageSquare, BarChart3, 
  TrendingUp, Clock, Award, ArrowRight, Upload,
  CheckCircle, AlertCircle
} from 'lucide-react';

export default function Dashboard() {
  const [readinessScore] = useState(78);
  const [skillLevel] = useState(80);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PlaceReady AI
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-blue-600 transition">Profile</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Student!</h1>
          <p className="text-gray-600">Track your progress and continue your interview preparation</p>
        </div>

        {/* Readiness Score Card */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Overall Readiness Score</h2>
              <div className="flex items-baseline space-x-2">
                <span className="text-6xl font-bold">{readinessScore}</span>
                <span className="text-3xl">/100</span>
              </div>
              <p className="mt-2 text-blue-100">
                You're {readinessScore >= 70 ? 'well prepared' : 'making good progress'}! Keep practicing to improve.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm mb-2">Current Skill Level</div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-white/30 rounded-full h-3 w-48">
                    <div 
                      className="bg-white rounded-full h-3 transition-all duration-500"
                      style={{ width: `${skillLevel}%` }}
                    />
                  </div>
                  <span className="font-bold">{skillLevel}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Badge */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 flex items-center space-x-3">
          <CheckCircle className="h-6 w-6 text-green-600" />
          <div>
            <div className="font-semibold text-green-900">Project Verified Badge</div>
            <div className="text-sm text-green-700">✅ React.js Project - E-commerce App</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/dashboard/interview" className="bg-white rounded-xl p-6 hover:shadow-lg transition border border-gray-200">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Start Interview</h3>
            <p className="text-gray-600 text-sm mb-4">Practice mock interviews with AI in Hinglish</p>
            <div className="flex items-center text-blue-600 font-semibold">
              Start Now <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </Link>

          <Link href="/dashboard/history" className="bg-white rounded-xl p-6 hover:shadow-lg transition border border-gray-200">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">View History</h3>
            <p className="text-gray-600 text-sm mb-4">Review past interviews and track progress</p>
            <div className="flex items-center text-purple-600 font-semibold">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </Link>

          <Link href="/dashboard/practice" className="bg-white rounded-xl p-6 hover:shadow-lg transition border border-gray-200">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Code className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Practice Mode</h3>
            <p className="text-gray-600 text-sm mb-4">Solve coding challenges and improve skills</p>
            <div className="flex items-center text-green-600 font-semibold">
              Practice <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </Link>

          <Link href="/dashboard/upload" className="bg-white rounded-xl p-6 hover:shadow-lg transition border border-gray-200">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Upload Project</h3>
            <p className="text-gray-600 text-sm mb-4">Analyze new GitHub repositories</p>
            <div className="flex items-center text-orange-600 font-semibold">
              Upload <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </Link>

          <Link href="/dashboard/skill-test" className="bg-white rounded-xl p-6 hover:shadow-lg transition border border-gray-200">
            <div className="bg-pink-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-pink-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Skill Test</h3>
            <p className="text-gray-600 text-sm mb-4">Validate your skills with AI challenges</p>
            <div className="flex items-center text-pink-600 font-semibold">
              Take Test <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </Link>

          <Link href="/dashboard/company-prep" className="bg-white rounded-xl p-6 hover:shadow-lg transition border border-gray-200">
            <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Company Prep</h3>
            <p className="text-gray-600 text-sm mb-4">Prepare for specific companies</p>
            <div className="flex items-center text-indigo-600 font-semibold">
              Explore <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-900">Completed React.js skill validation</div>
                <div className="text-sm text-gray-600">2 hours ago</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-900">Practiced 5 mock interviews this week</div>
                <div className="text-sm text-gray-600">1 day ago</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-900">Improved readiness score by 12 points</div>
                <div className="text-sm text-gray-600">3 days ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Breakdown */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Breakdown</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Technical Accuracy</span>
                  <span className="font-semibold text-gray-900">85%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 rounded-full h-2" style={{ width: '85%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Communication</span>
                  <span className="font-semibold text-gray-900">65%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 rounded-full h-2" style={{ width: '65%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Code Logic</span>
                  <span className="font-semibold text-gray-900">80%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 rounded-full h-2" style={{ width: '80%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Confidence</span>
                  <span className="font-semibold text-gray-900">55%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 rounded-full h-2" style={{ width: '55%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Actions</h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold text-blue-900">Practice explaining async patterns</div>
                  <div className="text-blue-700">Focus on async/await and promises</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold text-purple-900">Review Redux/Context API concepts</div>
                  <div className="text-purple-700">Strengthen state management knowledge</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold text-green-900">Take 3 more mock interviews</div>
                  <div className="text-green-700">Build confidence through practice</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
