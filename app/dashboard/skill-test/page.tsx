'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Code, ArrowLeft, Play, CheckCircle, XCircle, Clock, Send, Sparkles, Loader2 } from 'lucide-react';
import Editor from "@monaco-editor/react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const starterTemplates: Record<string, { code: string; language: string; challenge: string }> = {
  react: {
    language: 'javascript',
    challenge: 'Build a functional Todo application with add, delete, and list features using React Hooks.',
    code: `import React, { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Implement addition, deletion and status toggle logic
  const addTodo = () => {
    // Your code here
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Todo List</h1>
      <div className="flex gap-2">
        <input 
          className="border p-2 flex-1 rounded text-black" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </div>
    </div>
  );
}

export default TodoApp;`
  },
  nodejs: {
    language: 'javascript',
    challenge: 'Create a basic Express.js REST API with the following endpoints: GET /users, POST /users (with validation).',
    code: `const express = require('express');
const app = express();
app.use(express.json());

const users = [];

// GET /users - Return all users
app.get('/users', (req, res) => {
  // Your code here
});

// POST /users - Create a new user with name and email
app.post('/users', (req, res) => {
  // Your code here
});

const PORT = 3000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`
  },
  python: {
    language: 'python',
    challenge: 'Implement a function to find the Longest Common Subsequence between two strings. Optimize for performance.',
    code: `def longest_common_subsequence(text1: str, text2: str) -> int:
    """
    Find the length of the longest common subsequence.
    """
    # Your DP implementation here
    pass

# Test cases
print(longest_common_subsequence("abcde", "ace")) # Expected: 3
print(longest_common_subsequence("abc", "abc"))   # Expected: 3
print(longest_common_subsequence("abc", "def"))   # Expected: 0`
  },
  java: {
    language: 'java',
    challenge: 'Design an Object-Oriented system for a Library Management System. Include classes for Book, Member, and Loan.',
    code: `import java.util.*;

class Book {
    private String isbn;
    private String title;
    private boolean isAvailable;
    
    // Constructor and methods
}

class Member {
    private String id;
    private String name;
    
    // Constructor and methods
}

public class LibrarySystem {
    public static void main(String[] args) {
        // Implement logic to borrow and return books
        System.out.println("Library System initialized");
    }
}`
  },
  javascript: {
    language: 'javascript',
    challenge: 'Implement a custom "Promise.all" function named "myPromiseAll" that handles an array of promises.',
    code: `/**
 * Custom Promise.all implementation
 * @param {Array<Promise>} promises
 * @returns {Promise<Array>}
 */
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    // Your implementation here
  });
}

// Test usage
const p1 = Promise.resolve(3);
const p2 = 42;
const p3 = new Promise((resolve) => setTimeout(resolve, 100, 'foo'));

myPromiseAll([p1, p2, p3]).then(values => {
  console.log(values); // [3, 42, "foo"]
});`
  }
};

interface TestResult {
  name: string;
  passed: boolean;
  feedback: string;
}

interface AiResult {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string;
  testResults: TestResult[];
}

export default function SkillTestPage() {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [testStarted, setTestStarted] = useState(false);
  const [code, setCode] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [aiResult, setAiResult] = useState<AiResult | null>(null);

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

  // Set initial code template when skill changes
  useEffect(() => {
    if (selectedSkill) {
      setCode(starterTemplates[selectedSkill].code);
    }
  }, [selectedSkill]);

  const handleStartTest = () => {
    if (selectedSkill && difficulty) {
      setTestStarted(true);
    }
  };

  const evaluateWithAI = async () => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      alert("Missing Gemini API Key! Please check your .env.local file and RESTART your server (npm run dev).");
      return;
    }

    if (!code || isEvaluating) return;

    setIsEvaluating(true);
    setAiResult(null);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);

      const modelNames = [
        "gemini-1.5-flash",
        "gemini-1.5-pro",
        "gemini-2.0-flash-exp",
        "gemini-pro"
      ];
      let lastError = null;
      let finalResponse = null;

      for (const modelName of modelNames) {
        try {
          console.log(`Attempting evaluation with ${modelName}...`);
          const model = genAI.getGenerativeModel({ model: modelName });
          const prompt = `
            You are an elite technical interviewer. Evaluate the following coding challenge submission.
            
            Skill: ${selectedSkill}
            Difficulty: ${difficulty}
            Challenge: ${starterTemplates[selectedSkill].challenge}
            
            User Code:
            ${code}
            
            Provide a JSON response with the following format:
            {
              "score": number (0-100),
              "summary": "Brief summary of the code's quality",
              "strengths": ["list", "of", "strengths"],
              "weaknesses": ["list", "of", "areas", "to", "improve"],
              "suggestions": "Detailed technical advice on how to make it better",
              "testResults": [
                {"name": "Correctness", "passed": boolean, "feedback": "reasoning"},
                {"name": "Efficiency", "passed": boolean, "feedback": "reasoning"},
                {"name": "Best Practices", "passed": boolean, "feedback": "reasoning"}
              ]
            }
            Do not include any other text than the JSON.
          `;

          const result = await model.generateContent(prompt);
          const response = await result.response;
          finalResponse = response.text();
          console.log(`Evaluation successful with ${modelName}`);
          break; // Stop loop if successful
        } catch (e) {
          console.error(`Failed with ${modelName}:`, e);
          lastError = e;
        }
      }

      if (!finalResponse) throw lastError;

      // Clean the text if it contains markdown code blocks
      const cleanedJson = finalResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedRes = JSON.parse(cleanedJson);
      setAiResult(parsedRes);
    } catch (error) {
      console.error("Gemini AI Evaluation Error Details:", error);
      alert("AI Evaluation failed even after fallback. Please ensure your API key is valid for Gemini 3/2/1.5 in Google AI Studio.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSubmit = () => {
    evaluateWithAI();
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
              <p className="text-gray-600">Prove your skills with AI-powered coding challenges and live Gemini evaluation</p>
            </div>

            {/* Select Skill */}
            <div className="bg-white rounded-xl p-8 mb-6 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Select Your Skill</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {skills.map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => setSelectedSkill(skill.id)}
                    className={`p-6 rounded-lg border-2 transition ${selectedSkill === skill.id
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
            <div className="bg-white rounded-xl p-8 mb-6 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Select Difficulty Level</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {difficulties.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setDifficulty(level.id)}
                    className={`p-6 rounded-lg border-2 transition ${difficulty === level.id
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
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 mb-8 border border-blue-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Sparkles className="h-6 w-6 mr-2 text-blue-600" />
                Enhanced Evaluation System
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Smart Features</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Monaco Editor with syntax highlighting</li>
                    <li>• Snippet suggestions for faster coding</li>
                    <li>• Real-time Gemini AI code analysis</li>
                    <li>• Detailed improvement feedback</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Evaluation Metrics</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Accuracy & Functional Correctness</li>
                    <li>• Time Complexity & Efficiency</li>
                    <li>• Clean Code & Industry Standards</li>
                    <li>• AI-Driven Score Generation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartTest}
              disabled={!selectedSkill || !difficulty}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed font-semibold text-lg flex items-center justify-center shadow-lg"
            >
              <Play className="h-6 w-6 mr-2" />
              Start Challenge
            </button>
          </>
        ) : (
          /* Test Interface */
          <>
            {/* Test Header */}
            <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200 shadow-sm flex flex-wrap justify-between items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Skill Validation</h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span className="font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded capitalize">{selectedSkill}</span>
                  <span className="font-semibold px-2 py-1 bg-purple-100 text-purple-700 rounded capitalize">{difficulty}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-orange-600 text-2xl font-bold">
                  <Clock className="h-6 w-6 mr-2" />
                  {difficulties.find(d => d.id === difficulty)?.time}
                </div>
                <div className="text-sm text-gray-600 tracking-wide uppercase font-medium">Session Active</div>
              </div>
            </div>

            {/* Challenge Description */}
            <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <Code className="h-5 w-5 mr-2 text-blue-600" />
                Challenge Briefing
              </h2>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                <p className="font-medium">{starterTemplates[selectedSkill].challenge}</p>
              </div>
            </div>

            {/* Monaco Code Editor */}
            <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-sm font-semibold text-gray-500 uppercase tracking-widest px-2">SkillEditor v1.0</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleSubmit}
                    disabled={isEvaluating}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-bold flex items-center shadow-md disabled:opacity-50"
                  >
                    {isEvaluating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Challenge
                      </>
                    )}
                  </button>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden h-[500px]">
                <Editor
                  height="100%"
                  language={starterTemplates[selectedSkill].language}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    suggestOnTriggerCharacters: true,
                    snippetSuggestions: "top",
                    padding: { top: 20, bottom: 20 }
                  }}
                />
              </div>
            </div>

            {/* AI Results Section */}
            {(aiResult || isEvaluating) && (
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md animate-in fade-in slide-in-from-bottom-5 duration-500">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <Sparkles className="h-6 w-6 mr-2 text-blue-600" />
                    Gemini AI Assessment
                  </h2>
                  {aiResult && (
                    <div className={`px-4 py-2 rounded-full font-bold text-lg shadow-sm ${aiResult.score >= 80 ? 'bg-green-100 text-green-700' :
                      aiResult.score >= 50 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                      Score: {aiResult.score}/100
                    </div>
                  )}
                </div>

                {isEvaluating ? (
                  <div className="py-12 flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
                    <p className="text-gray-600 font-medium italic animate-pulse">Our AI is meticulously reviewing your code architecture...</p>
                  </div>
                ) : aiResult && (
                  <div className="space-y-8">
                    {/* Summary */}
                    <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded text-blue-900">
                      <p className="font-medium italic leading-relaxed">&quot;{aiResult.summary}&quot;</p>
                    </div>

                    {/* Test Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {aiResult.testResults.map((test: TestResult, idx: number) => (
                        <div key={idx} className={`p-4 rounded-xl border-2 ${test.passed ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-gray-900">{test.name}</span>
                            {test.passed ? <CheckCircle className="h-5 w-5 text-green-600" /> : <XCircle className="h-5 w-5 text-red-600" />}
                          </div>
                          <p className="text-xs text-gray-600">{test.feedback}</p>
                        </div>
                      ))}
                    </div>

                    {/* Quality Breakdown */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Key Strengths</h3>
                        <div className="space-y-2">
                          {aiResult.strengths.map((s: string, i: number) => (
                            <div key={i} className="flex items-start">
                              <div className="mr-2 text-green-500 font-bold">•</div>
                              <span className="text-sm text-gray-700">{s}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Critical Improvements</h3>
                        <div className="space-y-2">
                          {aiResult.weaknesses.map((w: string, i: number) => (
                            <div key={i} className="flex items-start">
                              <div className="mr-2 text-red-500 font-bold">•</div>
                              <span className="text-sm text-gray-700">{w}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* How to improve */}
                    <div className="bg-gray-900 p-6 rounded-xl text-gray-300">
                      <h3 className="text-white font-bold mb-4 flex items-center">
                        <Sparkles className="h-5 w-5 mr-2 text-blue-400" />
                        AI Improvement Guide
                      </h3>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{aiResult.suggestions}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
