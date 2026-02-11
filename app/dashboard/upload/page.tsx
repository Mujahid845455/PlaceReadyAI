'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Github, GitBranch, Upload, ArrowLeft, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

export default function UploadPage() {
  const [repoUrl, setRepoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisData, setAnalysisData] = useState({
    techStack: ['React', 'Node.js', 'MongoDB'],
    codeQuality: 82,
    strengths: [
      'Clean component architecture',
      'Proper error handling',
      'Good state management practices'
    ],
    improvements: [
      'Missing unit tests for API routes',
      'Performance optimization needed in cart',
      'Security: Add input validation'
    ],
    focusAreas: [
      'Explain authentication flow',
      'Discuss state management choices',
      'Defend database schema design'
    ]
  });

  const handleAnalyze = () => {
    if (!repoUrl) return;

    // Validate URL format
    try {
      const url = new URL(repoUrl);

      // Check for HTTPS protocol
      if (!url.protocol.startsWith('http')) {
        alert('Please enter a valid HTTPS URL');
        return;
      }

      // Check if it's from supported platforms
      const isGitHub = url.hostname === 'github.com';
      const isGitLab = url.hostname === 'gitlab.com';
      const isBitbucket = url.hostname === 'bitbucket.org';

      if (!isGitHub && !isGitLab && !isBitbucket) {
        alert('Please enter a valid GitHub, GitLab, or Bitbucket URL');
        return;
      }

      // Validate repository path structure (should be /username/repository or /username/repository.git)
      const pathParts = url.pathname.split('/').filter(part => part.length > 0);

      // Check if path has at least username and repository
      if (pathParts.length < 2) {
        if (isGitHub) {
          alert('Please enter a complete repository URL (e.g., https://github.com/username/repository)');
        } else if (isGitLab) {
          alert('Please enter a complete repository URL (e.g., https://gitlab.com/username/repository)');
        } else {
          alert('Please enter a complete repository URL (e.g., https://bitbucket.org/username/repository)');
        }
        return;
      }

      // Additional validation: ensure it's not just a profile or organization page
      const repoName = pathParts[1].replace('.git', '');
      if (!repoName || repoName.length === 0) {
        alert('Invalid repository name. Please enter a valid repository URL.');
        return;
      }

      // Check for invalid characters in repository path
      const validPathRegex = /^[a-zA-Z0-9._-]+$/;
      if (!validPathRegex.test(pathParts[0]) || !validPathRegex.test(repoName)) {
        alert('Repository URL contains invalid characters. Please check and try again.');
        return;
      }

    } catch (e) {
      alert('Please enter a valid URL (e.g., https://github.com/username/repository)');
      return;
    }

    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const handleGithubConnect = () => {
    // Simulate OAuth flow
    alert('GitHub OAuth integration would be implemented here');
  };

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

      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Upload Your Project</h1>
          <p className="text-sm sm:text-base text-gray-600">Connect your GitHub repository for AI-powered analysis</p>
        </div>

        {!analysisComplete ? (
          <>
            {/* GitHub Connect Card */}
            <div className="bg-white rounded-xl p-4 sm:p-8 mb-6 border border-gray-200">
              <div className="text-center">
                <div className="bg-gray-900 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Github className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Connect with GitHub</h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6">
                  Securely connect your GitHub account to analyze your repositories
                </p>
                <button
                  onClick={handleGithubConnect}
                  className="w-full sm:w-auto bg-gray-900 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-gray-800 transition inline-flex items-center justify-center text-sm sm:text-base"
                >
                  <Github className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Connect GitHub Account
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 font-semibold">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Manual URL Input */}
            <div className="bg-white rounded-xl p-4 sm:p-8 border border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 text-center sm:text-left">Enter Repository URL</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6 text-center sm:text-left">
                Paste your GitHub, GitLab, or Bitbucket repository URL
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Repository URL
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="url"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      placeholder="https://github.com/username/repository"
                      pattern="https://.*"
                      title="Please enter a valid HTTPS URL"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                    <button
                      onClick={handleAnalyze}
                      disabled={!repoUrl || isAnalyzing}
                      className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                          Analyze
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Supported Platforms */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <span className="font-semibold">Supported:</span>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>GitHub</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <GitBranch className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>GitLab</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <GitBranch className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>Bitbucket</span>
                  </div>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-900">
                  <div className="font-semibold mb-1">Your code is safe with us</div>
                  <div className="text-blue-700">
                    We analyze your code securely and never store it permanently.
                    All analysis happens in an encrypted environment.
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Analysis Results */
          <div className="space-y-6">
            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <div className="font-semibold text-green-900">Analysis Complete!</div>
                <div className="text-sm text-green-700">Your project has been successfully analyzed</div>
              </div>
            </div>

            {/* Repository Info */}
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Project Analysis Report</h2>
              <div className="space-y-3 text-sm sm:text-base text-gray-700">
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-semibold">Repository:</span>
                  <span className="text-blue-600 truncate">github.com/user/ecommerce-app</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2">
                  <span className="font-semibold">Tech Stack:</span>
                  <div className="flex flex-wrap gap-2 mt-1 sm:mt-0">
                    {analysisData.techStack.map((tech, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Code Quality Score */}
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Code Quality Score</h3>
                <span className="text-2xl sm:text-3xl font-bold text-blue-600">{analysisData.codeQuality}/100</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2.5 sm:h-3">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full h-2.5 sm:h-3 transition-all duration-1000"
                  style={{ width: `${analysisData.codeQuality}%` }}
                />
              </div>
            </div>

            {/* Strengths */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Strengths</h3>
              <div className="space-y-3">
                {analysisData.strengths.map((strength, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas to Improve */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Areas to Improve</h3>
              <div className="space-y-3">
                {analysisData.improvements.map((improvement, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{improvement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interview Focus Areas */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Interview Focus Areas</h3>
              <div className="space-y-3">
                {analysisData.focusAreas.map((area, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-gray-700">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/dashboard/interview"
                className="w-full sm:flex-1 bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-blue-700 transition text-center font-semibold text-sm sm:text-base flex items-center justify-center"
              >
                Start Interview Prep
              </Link>
              <button
                onClick={() => setAnalysisComplete(false)}
                className="w-full sm:flex-1 bg-gray-200 text-gray-700 px-4 sm:px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold text-sm sm:text-base text-center flex items-center justify-center"
              >
                Analyze Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
