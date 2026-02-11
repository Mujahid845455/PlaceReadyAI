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

  const companyDetails: Record<string, any> = {
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
    },
    google: {
      rounds: [
        'Phone Screen (General Coding)',
        'Onsite 1: Coding + DSA',
        'Onsite 2: Coding + DSA (More complex)',
        'Googleyness & Leadership',
        'System Design / Role-related'
      ],
      topics: [
        'Advanced Data Structures',
        'Complex Algorithms (Graphs, DP)',
        'System Design (Global SCALE)',
        'Google\'s Coding Standards'
      ],
      sampleQuestions: [
        'How would you design a search engine?',
        'Find the shortest path in a dynamic graph',
        'Implement a rate limiter for 1 billion users',
        'Conflict resolution in distributed systems'
      ]
    },
    microsoft: {
      rounds: [
        'Initial Technical Interview',
        'Hardware/Software Design (Role specific)',
        'Core Coding Round',
        'As Appropriate (Managerial Round)'
      ],
      topics: [
        'Bit Manipulation & Low Level',
        'Operating Systems Concepts',
        'Application Architecture',
        'Testing & Debugging'
      ],
      sampleQuestions: [
        'Reverse words in a string efficiently',
        'Detect cycle in a linked list',
        'Explain virtual memory management',
        'Design a system for file synchronization'
      ]
    },
    flipkart: {
      rounds: [
        'Machine Coding Round (Design + Code)',
        'Problem Solving Round (DSA)',
        'Hiring Manager Round',
        'Final Culture Fit'
      ],
      topics: [
        'Low-Level Design (LLD)',
        'Design Patterns',
        'Data Modeling',
        'Object Oriented Programming'
      ],
      sampleQuestions: [
        'Implement a cab booking application (LLD)',
        'Snake and Ladder game simulation',
        'Implement a parking lot system',
        'Design a logging library'
      ]
    },
    tcs: {
      rounds: [
        'TCS NQT (Aptitude + Coding)',
        'Technical Interview',
        'Managerial Interview',
        'HR Round'
      ],
      topics: [
        'Basic Programming (C++, Java, Python)',
        'SQL & Database Management',
        'OOPS Concepts',
        'Project Explanation'
      ],
      sampleQuestions: [
        'Find Fibonacci series up to N',
        'Explain normalization in DBMS',
        'Difference between overloading and overriding',
        'Write a query to find Nth highest salary'
      ]
    },
    infosys: {
      rounds: [
        'InfyTQ / HackWithInfy (OA)',
        'Technical Interview (Single/Double)',
        'HR Round'
      ],
      topics: [
        'String & Array Manipulation',
        'Data Structures Basics',
        'Web Technologies (HTML/CSS/JS)',
        'Java/Python Core'
      ],
      sampleQuestions: [
        'Check if a string is a palindrome',
        'Find duplicates in an array',
        'Explain SDLC models',
        'Write a program for Prime Numbers'
      ]
    }
  };

  const selectedCompanyInfo = companies.find(c => c.id === selectedCompany);
  const selectedDetails = companyDetails[selectedCompany];

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
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Company-Specific Prep</h1>
          <p className="text-sm sm:text-base text-gray-600">Prepare for target companies with tailored questions</p>
        </div>

        {!selectedCompany ? (
          <>
            {/* Company Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {companies.map((company) => (
                <button
                  key={company.id}
                  onClick={() => setSelectedCompany(company.id)}
                  className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition text-left"
                >
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="text-4xl sm:text-5xl">{company.logo}</div>
                    <div className="text-right">
                      <div className="text-[10px] sm:text-xs text-gray-600">Match Score</div>
                      <div className="text-xl sm:text-2xl font-bold text-blue-600">{company.matchScore}%</div>
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{company.name}</h3>
                  <div className="flex items-center text-[10px] sm:text-sm text-gray-600">
                    <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
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
            <div className="bg-white rounded-xl p-4 sm:p-8 border border-gray-200">
              <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-0">
                <div className="flex items-center space-x-4">
                  <div className="text-5xl sm:text-6xl text-center">{selectedCompanyInfo?.logo}</div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{selectedCompanyInfo?.name}</h2>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">Prepare for {selectedCompanyInfo?.name} interviews</p>
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-xs sm:text-sm text-gray-600">Your Match Score</div>
                  <div className="text-3xl sm:text-4xl font-bold text-blue-600">{selectedCompanyInfo?.matchScore}/100</div>
                </div>
              </div>
            </div>

            {/* Interview Rounds */}
            <div className="bg-white rounded-xl p-4 sm:p-8 border border-gray-200">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Interview Rounds</h3>
              <div className="space-y-3">
                {selectedDetails?.rounds.map((round: string, idx: number) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 sm:p-4 bg-gray-50 rounded-lg text-sm sm:text-base">
                    <div className="bg-blue-600 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-xs sm:text-base">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 leading-tight">{round}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Topics */}
            <div className="bg-white rounded-xl p-4 sm:p-8 border border-gray-200">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Common Topics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedDetails?.topics.map((topic: string, idx: number) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 sm:p-4 bg-blue-50 rounded-lg text-sm sm:text-base">
                    <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-900">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Questions */}
            <div className="bg-white rounded-xl p-4 sm:p-8 border border-gray-200">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Previous Questions</h3>
              <div className="space-y-3">
                {selectedDetails?.sampleQuestions.map((question: string, idx: number) => (
                  <div key={idx} className="p-3 sm:p-4 bg-purple-50 rounded-lg border border-purple-200 text-sm sm:text-base text-center sm:text-left">
                    <div className="font-semibold text-purple-900">"{question}"</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
              <Link
                href="/dashboard/interview"
                className="w-full sm:flex-1 bg-blue-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg hover:bg-blue-700 transition text-center font-semibold text-sm sm:text-base flex items-center justify-center"
              >
                Start Preparation
              </Link>
              <Link
                href={`/dashboard/practice?company=${selectedCompany}`}
                className="w-full sm:flex-1 bg-purple-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg hover:bg-purple-700 transition font-semibold text-center text-sm sm:text-base flex items-center justify-center"
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
