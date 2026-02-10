'use client';

import Link from 'next/link';
import { Shield, ArrowLeft, Code, Zap, Target, Trophy } from 'lucide-react';

export default function PracticePage() {
  const categories = [
    {
      id: 'dsa',
      name: 'Data Structures & Algorithms',
      icon: '🧮',
      problems: 150,
      difficulty: 'Mixed',
      color: 'blue'
    },
    {
      id: 'react',
      name: 'React.js Challenges',
      icon: '⚛️',
      problems: 80,
      difficulty: 'Intermediate',
      color: 'purple'
    },
    {
      id: 'nodejs',
      name: 'Node.js & Backend',
      icon: '🟢',
      problems: 65,
      difficulty: 'Advanced',
      color: 'green'
    },
    {
      id: 'system-design',
      name: 'System Design',
      icon: '🏗️',
      problems: 45,
      difficulty: 'Expert',
      color: 'orange'
    },
    {
      id: 'javascript',
      name: 'JavaScript Fundamentals',
      icon: '📜',
      problems: 120,
      difficulty: 'Beginner',
      color: 'yellow'
    },
    {
      id: 'sql',
      name: 'SQL & Databases',
      icon: '🗄️',
      problems: 70,
      difficulty: 'Intermediate',
      color: 'pink'
    }
  ];

  const recentProblems = [
    { name: 'Two Sum', difficulty: 'Easy', status: 'solved', time: '15 min' },
    { name: 'Reverse Linked List', difficulty: 'Medium', status: 'solved', time: '25 min' },
    { name: 'Binary Tree Traversal', difficulty: 'Medium', status: 'attempted', time: '30 min' },
    { name: 'LRU Cache', difficulty: 'Hard', status: 'unsolved', time: '-' }
  ];

  const stats = {
    solved: 45,
    attempted: 12,
    streak: 7
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'from-blue-50 to-blue-100 border-blue-200',
      purple: 'from-purple-50 to-purple-100 border-purple-200',
      green: 'from-green-50 to-green-100 border-green-200',
      orange: 'from-orange-50 to-orange-100 border-orange-200',
      yellow: 'from-yellow-50 to-yellow-100 border-yellow-200',
      pink: 'from-pink-50 to-pink-100 border-pink-200'
    };
    return colors[color] || colors.blue;
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Practice Mode</h1>
          <p className="text-gray-600">Sharpen your coding skills with curated challenges</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-1">{stats.solved}</div>
                <div className="text-sm text-gray-600">Problems Solved</div>
              </div>
              <Trophy className="h-10 w-10 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-1">{stats.attempted}</div>
                <div className="text-sm text-gray-600">Attempted</div>
              </div>
              <Target className="h-10 w-10 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-1">{stats.streak} days</div>
                <div className="text-sm text-gray-600">Current Streak</div>
              </div>
              <Zap className="h-10 w-10 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href="/dashboard/skill-test"
                className={`bg-gradient-to-br ${getColorClasses(category.color)} rounded-xl p-6 border hover:shadow-lg transition`}
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <div className="flex items-center justify-between text-sm text-gray-700">
                  <span>{category.problems} problems</span>
                  <span className="font-semibold">{category.difficulty}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Problems */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Problems</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentProblems.map((problem, idx) => (
              <div key={idx} className="p-6 hover:bg-gray-50 transition">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="font-bold text-gray-900">{problem.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        problem.difficulty === 'Easy' 
                          ? 'bg-green-100 text-green-800' 
                          : problem.difficulty === 'Medium' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {problem.difficulty}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        problem.status === 'solved' 
                          ? 'bg-blue-100 text-blue-800' 
                          : problem.status === 'attempted' 
                          ? 'bg-orange-100 text-orange-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {problem.status.charAt(0).toUpperCase() + problem.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Time spent: {problem.time}
                    </div>
                  </div>
                  <Link
                    href="/dashboard/skill-test"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                  >
                    {problem.status === 'solved' ? 'Review' : 'Continue'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Challenge */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Daily Challenge</h2>
              <p className="text-blue-100 mb-4">
                Complete today's challenge to maintain your streak!
              </p>
              <Link
                href="/dashboard/skill-test"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition inline-flex items-center font-semibold"
              >
                <Code className="h-5 w-5 mr-2" />
                Start Challenge
              </Link>
            </div>
            <div className="text-6xl">🎯</div>
          </div>
        </div>
      </div>
    </div>
  );
}
