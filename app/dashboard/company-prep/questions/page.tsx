'use client';

import Link from 'next/link';
import { Shield, ArrowLeft, BookOpen, Filter } from 'lucide-react';
import { useState } from 'react';

export default function AllQuestionsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['All', 'Technical', 'Behavioral', 'System Design', 'Coding'];
  
  const questions = [
    { id: 1, question: 'Design a URL shortener service', category: 'System Design', difficulty: 'Hard', asked: 45 },
    { id: 2, question: 'Implement LRU Cache', category: 'Coding', difficulty: 'Medium', asked: 38 },
    { id: 3, question: 'Tell me about a time you failed', category: 'Behavioral', difficulty: 'Medium', asked: 52 },
    { id: 4, question: 'Explain your most complex project', category: 'Technical', difficulty: 'Medium', asked: 41 },
    { id: 5, question: 'Design a distributed cache system', category: 'System Design', difficulty: 'Hard', asked: 33 },
    { id: 6, question: 'Reverse a linked list', category: 'Coding', difficulty: 'Easy', asked: 67 },
    { id: 7, question: 'How do you handle conflicts in a team?', category: 'Behavioral', difficulty: 'Easy', asked: 58 },
    { id: 8, question: 'Explain REST vs GraphQL', category: 'Technical', difficulty: 'Medium', asked: 44 },
  ];

  const filteredQuestions = selectedCategory === 'all' 
    ? questions 
    : questions.filter(q => q.category.toLowerCase() === selectedCategory);

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
            <Link href="/dashboard/company-prep" className="flex items-center text-gray-600 hover:text-blue-600 transition">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Company Prep
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Interview Questions - Amazon</h1>
          <p className="text-gray-600">Browse through 50+ real interview questions from Amazon</p>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <span className="font-semibold text-gray-900">Filter by Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat.toLowerCase())}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedCategory === cat.toLowerCase()
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => (
            <div key={q.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900">{q.question}</h3>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className={`px-3 py-1 rounded-full font-semibold ${
                      q.category === 'System Design' ? 'bg-purple-100 text-purple-800' :
                      q.category === 'Coding' ? 'bg-green-100 text-green-800' :
                      q.category === 'Behavioral' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {q.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full font-semibold ${
                      q.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      q.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {q.difficulty}
                    </span>
                    <span className="text-gray-600">Asked {q.asked} times</span>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold">
                  Practice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
