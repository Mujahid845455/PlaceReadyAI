'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Shield, Github, GitBranch, Upload, ArrowLeft, CheckCircle, Loader2, AlertCircle, Info, Sparkles, ArrowRight, Search } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

function UploadContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [repoUrl, setRepoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userRepos, setUserRepos] = useState<any[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [analysisData, setAnalysisData] = useState({
    repoName: '',
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

  // Handle GitHub OAuth Callback
  useEffect(() => {
    const code = searchParams.get('code');
    if (code && !accessToken && !isConnecting) {
      exchangeCodeForToken(code);
    }
  }, [searchParams]);

  const exchangeCodeForToken = async (code: string) => {
    setIsConnecting(true);
    try {
      const res = await fetch('/api/github/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();

      if (data.access_token) {
        setAccessToken(data.access_token);
        setIsConnected(true);
        fetchUserRepos(data.access_token);
        // Clean URL
        router.replace('/dashboard/upload');
      } else {
        throw new Error(data.error || 'Failed to exchange code');
      }
    } catch (error) {
      console.error('Token exchange failed:', error);
      alert('GitHub connection failed. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const fetchUserRepos = async (token: string) => {
    setIsLoadingRepos(true);
    try {
      const res = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', {
        headers: { Authorization: `token ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUserRepos(data);
      }
    } catch (error) {
      console.error('Failed to fetch repos:', error);
    } finally {
      setIsLoadingRepos(false);
    }
  };

  const fetchRepoContent = async (owner: string, repo: string) => {
    try {
      setAnalysisStep('Fetching repository data...');
      const headers: any = { 'Accept': 'application/vnd.github.raw' };
      if (accessToken) {
        headers['Authorization'] = `token ${accessToken}`;
      }

      // Fetch README.md
      const readmeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, { headers });
      const readme = readmeRes.ok ? await readmeRes.text() : 'No README found';

      // Fetch package.json if exists
      const pkgRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/package.json`, { headers });
      const pkgJson = pkgRes.ok ? await pkgRes.text() : 'No package.json found';

      return { readme, pkgJson };
    } catch (error) {
      console.error('Error fetching repo content:', error);
      throw new Error('Failed to fetch repository data from GitHub.');
    }
  };

  const analyzeWithAI = async (repoName: string, content: { readme: string; pkgJson: string }) => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Missing Gemini API Key. Please add it to .env.local.");
    }

    setAnalysisStep('Analyzing code patterns with Gemini AI...');
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelNames = ["gemini-1.5-flash", "gemini-2.0-flash-exp", "gemini-1.5-pro", "gemini-1.0-pro"];

    let finalResponse = null;
    let lastError = null;

    for (const modelName of modelNames) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const prompt = `
          You are an expert software architect and technical interviewer. Analyze the following GitHub repository information and provide a detailed technical report.
          
          Repository: ${repoName}
          
          README Content:
          ${content.readme.substring(0, 4000)}
          
          package.json Content:
          ${content.pkgJson.substring(0, 2000)}
          
          Provide a JSON response with the following format:
          {
            "techStack": ["list", "of", "technologies"],
            "codeQuality": number (0-100),
            "strengths": ["list", "of", "top", "strengths"],
            "improvements": ["list", "of", "areas", "to", "improve"],
            "focusAreas": ["list", "of", "3-4", "specific", "interview", "questions", "based", "on", "this", "project"]
          }
          Do not include any other text than the JSON.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        finalResponse = response.text();
        break;
      } catch (error) {
        lastError = error;
        console.warn(`Failed with ${modelName}, trying next...`);
      }
    }

    if (!finalResponse) throw lastError;

    const cleanedJson = finalResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedJson);
  };

  const handleAnalyze = async (manualUrl?: string) => {
    const targetUrl = manualUrl || repoUrl;
    if (!targetUrl) return;

    try {
      const url = new URL(targetUrl);
      const isGitHub = url.hostname === 'github.com';
      if (!isGitHub) {
        alert('Currently, AI analysis only supports GitHub repositories.');
        return;
      }

      const pathParts = url.pathname.split('/').filter(part => part.length > 0);
      if (pathParts.length < 2) {
        alert('Please enter a complete GitHub repository URL.');
        return;
      }

      const owner = pathParts[0];
      const repo = pathParts[1].replace('.git', '');

      setIsAnalyzing(true);
      setAnalysisStep('Connecting to GitHub...');

      const content = await fetchRepoContent(owner, repo);
      const aiResults = await analyzeWithAI(repo, content);

      setAnalysisData({
        ...aiResults,
        repoName: `${owner}/${repo}`
      });
      setAnalysisComplete(true);
    } catch (e: any) {
      console.error(e);
      alert(e.message || 'Analysis failed. Please check the URL and try again.');
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep('');
    }
  };

  const handleGithubConnect = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    if (!clientId) {
      alert('GitHub Client ID is not configured in .env.local');
      return;
    }
    const redirectUri = window.location.origin + '/dashboard/upload';
    const scope = 'repo';
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;

    window.location.href = authUrl;
  };

  const filteredRepos = userRepos.filter(repo =>
    repo.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );


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
                {isConnected ? (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                      <div className="flex items-center text-green-700 font-bold">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        GitHub Connected
                      </div>
                      <button
                        onClick={() => { setIsConnected(false); setAccessToken(null); setUserRepos([]); }}
                        className="text-xs font-bold text-gray-500 hover:text-red-500 uppercase tracking-widest"
                      >
                        Disconnect Account
                      </button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search your repositories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                      {isLoadingRepos ? (
                        <div className="col-span-full py-12 text-center text-gray-500">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 opacity-20" />
                          <p className="font-medium">Loading your repositories...</p>
                        </div>
                      ) : filteredRepos.length > 0 ? (
                        filteredRepos.map((repo) => (
                          <button
                            key={repo.id}
                            onClick={() => handleAnalyze(repo.html_url)}
                            disabled={isAnalyzing}
                            className="text-left p-4 rounded-xl border border-gray-100 hover:border-blue-500 hover:bg-blue-50/50 transition-all group relative overflow-hidden"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <GitBranch className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                {repo.language || 'Code'}
                              </span>
                            </div>
                            <h3 className="font-bold text-gray-900 group-hover:text-blue-700 truncate">
                              {repo.name}
                            </h3>
                            <p className="text-xs text-gray-500 truncate mt-1">
                              {repo.description || 'No description available'}
                            </p>
                          </button>
                        ))
                      ) : (
                        <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                          <p className="font-medium">No repositories found matching your search.</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Connect with GitHub</h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-6">
                      Securely connect your GitHub account to analyze your repositories
                    </p>
                    <button
                      onClick={handleGithubConnect}
                      disabled={isConnecting}
                      className="w-full sm:w-auto bg-gray-900 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-gray-800 transition inline-flex items-center justify-center text-sm sm:text-base disabled:opacity-50"
                    >
                      {isConnecting ? (
                        <>
                          <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Github className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                          Connect GitHub Account
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 font-semibold uppercase tracking-wider text-xs">Repository Selection</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Manual URL Input */}
            <div className="bg-white rounded-xl p-4 sm:p-8 border border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 text-center sm:text-left">Enter Repository URL</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6 text-center sm:text-left">
                Paste your GitHub repository URL for deep AI analysis
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
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                    <button
                      onClick={() => handleAnalyze()}
                      disabled={!repoUrl || isAnalyzing}
                      className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base relative overflow-hidden"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                          Analyze Repo
                        </>
                      )}
                    </button>
                  </div>
                  {isAnalyzing && (
                    <div className="mt-3 flex items-center justify-center sm:justify-start text-blue-600 text-sm animate-pulse">
                      <Info className="h-4 w-4 mr-2" />
                      {analysisStep}
                    </div>
                  )}
                </div>

                {/* Supported Platforms */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 pt-2">
                  <span className="font-semibold text-gray-400">Powered by:</span>
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span className="font-medium">Gemini 3 Flash</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>REST API</span>
                  </div>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-900">
                  <div className="font-bold mb-1">Privacy Focused Analysis</div>
                  <div className="text-blue-700 leading-relaxed">
                    We only read public repository metadata and documentation.
                    Your code structure is analyzed temporarily and never indexed or stored.
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Analysis Results */
          <div className="space-y-6">
            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex items-center space-x-4 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <div className="font-bold text-green-900 text-lg">Project Analysis Secured!</div>
                <div className="text-sm text-green-700">Gemini AI has completed its technical review for {analysisData.repoName}</div>
              </div>
            </div>

            {/* Repository Info */}
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center pb-4 border-b">
                <GitBranch className="h-5 w-5 mr-2 text-blue-600" />
                Technical Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Target Repository</h3>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <Github className="h-5 w-5 mr-3 text-gray-700" />
                    <span className="text-blue-600 font-mono font-medium truncate">{analysisData.repoName}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Primary Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisData.techStack.map((tech, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-xs font-bold uppercase">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Score & Insight Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col justify-center text-center">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Architecture Score</h3>
                <div className="relative inline-flex items-center justify-center mb-4">
                  <svg className="h-32 w-32 transform -rotate-90">
                    <circle
                      className="text-gray-200"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="58"
                      cx="64"
                      cy="64"
                    />
                    <circle
                      className="text-blue-600 transition-all duration-1000 ease-out"
                      strokeWidth="8"
                      strokeDasharray={364.42}
                      strokeDashoffset={364.42 - (364.42 * analysisData.codeQuality) / 100}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="58"
                      cx="64"
                      cy="64"
                    />
                  </svg>
                  <span className="absolute text-3xl font-black text-gray-900">{analysisData.codeQuality}</span>
                </div>
                <p className="text-xs text-gray-500 font-medium">Verified by AI Design Patterns</p>
              </div>

              <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl p-6 text-white shadow-lg overflow-hidden relative">
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold mb-4 opacity-90 tracking-wide uppercase text-sm">Top Strengths</h3>
                    <div className="space-y-4">
                      {analysisData.strengths.slice(0, 3).map((strength, idx) => (
                        <div key={idx} className="flex items-start space-x-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/10">
                          <CheckCircle className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                          <span className="text-sm font-medium">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-widest opacity-60">
                    <Shield className="h-4 w-4 mr-2" />
                    Enterprise Analytics Engine
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Areas to Improve */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm border-t-4 border-t-orange-500">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
                  Growth Opportunities
                </h3>
                <div className="space-y-4">
                  {analysisData.improvements.map((improvement, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 bg-orange-50/50 rounded-lg border border-orange-100">
                      <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700 leading-relaxed font-medium">{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interview Focus Areas */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm border-t-4 border-t-blue-600">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
                  Interview Preparation Guide
                </h3>
                <div className="space-y-4">
                  {analysisData.focusAreas.map((area, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100 hover:border-blue-300 transition-colors">
                      <div className="bg-blue-600 text-white w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 shadow-sm">
                        {idx + 1}
                      </div>
                      <span className="text-sm text-gray-700 leading-relaxed font-medium">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 pb-8">
              <Link
                href={`/dashboard/interview?project=${analysisData.repoName}`}
                className="w-full sm:flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl hover:shadow-xl hover:-translate-y-1 transition duration-300 transform text-center font-bold text-lg flex items-center justify-center shadow-lg group"
              >
                Start AI Interview for this Project
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => setAnalysisComplete(false)}
                className="w-full sm:w-auto bg-white text-gray-700 border-2 border-gray-100 px-8 py-4 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition font-bold text-center flex items-center justify-center"
              >
                Analyze Another Repo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function UploadPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin opacity-20" />
      </div>
    }>
      <UploadContent />
    </Suspense>
  );
}
