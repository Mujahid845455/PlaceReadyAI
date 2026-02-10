'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft, Building2, TrendingUp, BookOpen, Users } from 'lucide-react';

export default function CompanyPrepPage() {
  const [selectedCompany, setSelectedCompany] = useState('');

  const companies = [
    { id: 'amazon', name: 'Amazon', logo: '🟠', matchScore: 72, questions: 50 },
    { id: 'google', name: 'Google', logo: '🔵', matchScore: 68, questions: 45 },
    { id: 'microsoft', name: 'Microsoft', logo: '🟦', matchScore: 75, questions: 48 },
    { id: 'flipkart', name: 'Flipkart', logo: '🟡', matchScore: 80, questions: 42 },
    { id: 'tcs', name: 'TCS', logo: '🔷', matchScore: 85, questions: 38 },
    { id: 'infosys', name: 'Infosys', logo: '🟣', matchScore: 82, questions: 40 },
  ];

  const companyDetails = {
    amazon: {
      rounds: [
        'Online Assessment (Coding)',
        'Technical Round 1 (DSA + System Design)',
        'Technical Round 2 (Behavioral + Leadership)',
        'Bar Raiser Round'
      ],
      topics: [
        'Data Structures & Algorithms',
        'System Design (Scalability focus)',
        'Leadership Principles',
        'Past project deep-dive'
      ],
      sampleQuestions: [
        'Design a URL shortener service',
        'Implement LRU Cache',
        'Tell me about a time you failed',
        'Explain your most complex project'
      ]
    }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Company-Specific Preparation</h1>
          <p className="text-gray-600">Prepare for your target companies with tailored interview questions</p>
        </div>

        {!selectedCompany ? (
          <>
            {/* Company Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {companies.map((company) => (
                <button
                  key={company.id}
                  onClick={() => setSelectedCompany(company.id)}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition text-left"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{company.logo}</div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Match Score</div>
                      <div className="text-2xl font-bold text-blue-600">{company.matchScore}%</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{company.name}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>{company.questions}+ questions available</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <Building2 className="h-10 w-10 text-blue-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">50+ Companies</h3>
                <p className="text-sm text-gray-700">
                  Comprehensive coverage of top Indian and global tech companies
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                <TrendingUp className="h-10 w-10 text-purple-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Real Questions</h3>
                <p className="text-sm text-gray-700">
                  Actual interview questions from past candidates and employees
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                <Users className="h-10 w-10 text-green-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Role-Specific</h3>
                <p className="text-sm text-gray-700">
                  Tailored preparation for Frontend, Backend, Full Stack, and DevOps roles
                </p>
              </div>
            </div>
          </>
        ) : (
          /* Company Details */
          <div className="space-y-6">
            {/* Back Button */}
            <button
              onClick={() => setSelectedCompany('')}
              className="text-blue-600 hover:text-blue-700 flex items-center mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Companies
            </button>

            {/* Company Header */}
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-6xl">🟠</div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Amazon</h2>
                    <p className="text-gray-600 mt-1">Prepare for Amazon interviews</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Your Match Score</div>
                  <div className="text-4xl font-bold text-blue-600">72/100</div>
                </div>
              </div>
            </div>

            {/* Interview Rounds */}
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Interview Rounds</h3>
              <div className="space-y-3">
                {companyDetails.amazon.rounds.map((round, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{round}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Topics */}
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Topics</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {companyDetails.amazon.topics.map((topic, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                    <BookOpen className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-900">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Questions */}
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Previous Questions (50+ available)</h3>
              <div className="space-y-3">
                {companyDetails.amazon.sampleQuestions.map((question, idx) => (
                  <div key={idx} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="font-semibold text-purple-900">"{question}"</div>
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
                Start Preparation
              </Link>
              <Link
                href={`/dashboard/practice?company=${selectedCompany}`}
                className="bg-purple-600 text-white px-6 py-4 rounded-lg hover:bg-purple-700 transition font-semibold text-center"
              >
                View All Questions
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
