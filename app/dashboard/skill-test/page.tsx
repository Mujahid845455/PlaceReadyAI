'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Code, ArrowLeft, Play, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function SkillTestPage() {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [testStarted, setTestStarted] = useState(false);
  const [code, setCode] = useState(`import React, { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  
  // Your code here
  
  return (
    <div>
      <h1>Todo App</h1>
    </div>
  );
}

export default TodoApp;`);
  const [testResults, setTestResults] = useState({ passed: 3, total: 5 });

  const skills = [
    { id: 'react', name: 'React.js', icon: '⚛️' },
    { id: 'nodejs', name: 'Node.js', icon: '🟢' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'javascript', name: 'JavaScript', icon: '📜' },
  ];

  const difficulties = [
    { id: 'beginner', name: 'Beginner', time: '30 min' },
    { id: 'intermediate', name: 'Intermediate', time: '45 min' },
    { id: 'advanced', name: 'Advanced', time: '60 min' },
    { id: 'expert', name: 'Expert', time: '90 min' },
  ];

  const handleStartTest = () => {
    if (selectedSkill && difficulty) {
      setTestStarted(true);
    }
  };

  const handleRunTests = () => {
    // Simulate test execution
    alert('Running tests...');
  };

  const handleSubmit = () => {
    alert('Test submitted! Redirecting to results...');
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!testStarted ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Validation Challenge</h1>
              <p className="text-gray-600">Prove your skills with AI-generated coding challenges</p>
            </div>

            {/* Select Skill */}
            <div className="bg-white rounded-xl p-8 mb-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Select Your Skill</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {skills.map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => setSelectedSkill(skill.id)}
                    className={`p-6 rounded-lg border-2 transition ${
                      selectedSkill === skill.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-4xl mb-2">{skill.icon}</div>
                    <div className="font-semibold text-gray-900">{skill.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Select Difficulty */}
            <div className="bg-white rounded-xl p-8 mb-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Select Difficulty Level</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {difficulties.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setDifficulty(level.id)}
                    className={`p-6 rounded-lg border-2 transition ${
                      difficulty === level.id
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-bold text-lg text-gray-900 mb-1">{level.name}</div>
                    <div className="text-sm text-gray-600">Time: {level.time}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* What to Expect */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 mb-6 border border-blue-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">What to Expect</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Challenge Format</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• AI-generated coding problem</li>
                    <li>• Real-time code execution</li>
                    <li>• Automated test cases</li>
                    <li>• Instant feedback</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Evaluation Criteria</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Code correctness</li>
                    <li>• Best practices</li>
                    <li>• Performance optimization</li>
                    <li>• Code readability</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartTest}
              disabled={!selectedSkill || !difficulty}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed font-semibold text-lg flex items-center justify-center"
            >
              <Play className="h-6 w-6 mr-2" />
              Start Challenge
            </button>
          </>
        ) : (
          /* Test Interface */
          <>
            {/* Test Header */}
            <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Skill Validation Challenge</h1>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="font-semibold">Skill: React.js</span>
                    <span>•</span>
                    <span className="font-semibold">Level: Intermediate</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-orange-600 text-2xl font-bold">
                    <Clock className="h-6 w-6 mr-2" />
                    45:00
                  </div>
                  <div className="text-sm text-gray-600">Time Remaining</div>
                </div>
              </div>
            </div>

            {/* Challenge Description */}
            <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Challenge: Build a Todo App</h2>
              <div className="space-y-2 text-gray-700">
                <p>Create a functional Todo application with the following features:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Add, edit, delete functionality</li>
                  <li>Filter by status (all, active, completed)</li>
                  <li>Persist data to localStorage</li>
                  <li>Use React hooks (useState, useEffect)</li>
                </ul>
              </div>
            </div>

            {/* Code Editor */}
            <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Code Editor</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleRunTests}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-semibold"
                  >
                    Run Tests
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                  >
                    Submit
                  </button>
                </div>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 p-4 font-mono text-sm bg-gray-900 text-green-400 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                spellCheck={false}
              />
            </div>

            {/* Test Results */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Test Results</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-900">Test 1: Add todo functionality</span>
                  </div>
                  <span className="text-green-600 font-semibold">Passed</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-900">Test 2: Delete todo functionality</span>
                  </div>
                  <span className="text-green-600 font-semibold">Passed</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-900">Test 3: Filter functionality</span>
                  </div>
                  <span className="text-green-600 font-semibold">Passed</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center">
                    <XCircle className="h-5 w-5 text-red-600 mr-3" />
                    <span className="text-gray-900">Test 4: localStorage persistence</span>
                  </div>
                  <span className="text-red-600 font-semibold">Failed</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center">
                    <XCircle className="h-5 w-5 text-red-600 mr-3" />
                    <span className="text-gray-900">Test 5: Edit todo functionality</span>
                  </div>
                  <span className="text-red-600 font-semibold">Failed</span>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="font-semibold text-blue-900">
                  Score: {testResults.passed}/{testResults.total} tests passed
                </div>
                <div className="text-sm text-blue-700 mt-1">
                  Keep working on the failing tests to improve your score
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
