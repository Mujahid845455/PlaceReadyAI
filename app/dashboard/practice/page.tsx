'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Shield, ArrowLeft, Code, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, Suspense } from 'react';

// Force dynamic rendering to avoid prerendering errors
export const dynamic = 'force-dynamic';

function PracticePageContent() {
  const searchParams = useSearchParams();
  const company = searchParams.get('company') || '';
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const companyData: Record<string, any> = {
    amazon: {
      name: 'Amazon',
      logo: '🟠',
      color: 'orange',
      sections: [
        {
          id: 'oa',
          title: 'Online Assessment (OA) Questions',
          questions: [
            {
              title: '1. Two Sum',
              code: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
              language: 'python'
            },
            {
              title: '2. LRU Cache Implementation',
              code: `class Node:
    def __init__(self, key, val):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}
        self.head = Node(0, 0)
        self.tail = Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head
    
    def _remove(self, node):
        prev, nxt = node.prev, node.next
        prev.next, nxt.prev = nxt, prev
    
    def _add(self, node):
        prev, nxt = self.tail.prev, self.tail
        prev.next = nxt.prev = node
        node.next, node.prev = nxt, prev
    
    def get(self, key):
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add(node)
            return node.val
        return -1
    
    def put(self, key, value):
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self._add(node)
        self.cache[key] = node
        if len(self.cache) > self.capacity:
            lru = self.head.next
            self._remove(lru)
            del self.cache[lru.key]`,
              language: 'python'
            },
            {
              title: '3. Merge K Sorted Lists',
              code: `import heapq

def mergeKLists(lists):
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst.val, i, lst))
    
    dummy = ListNode(0)
    curr = dummy
    
    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    
    return dummy.next`,
              language: 'python'
            },
            {
              title: '4. Task Scheduler',
              code: `def leastInterval(tasks, n):
    freq = [0] * 26
    for task in tasks:
        freq[ord(task) - ord('A')] += 1
    
    freq.sort()
    max_freq = freq[25] - 1
    idle_slots = max_freq * n
    
    for i in range(24, -1, -1):
        idle_slots -= min(freq[i], max_freq)
    
    return len(tasks) + max(0, idle_slots)`,
              language: 'python'
            }
          ]
        },
        {
          id: 'dsa',
          title: 'Technical DSA Questions with Solutions',
          questions: [
            {
              title: '1. Course Schedule (Detect Cycle in Directed Graph)',
              code: `def canFinish(numCourses, prerequisites):
    graph = [[] for _ in range(numCourses)]
    indegree = [0] * numCourses
    
    for course, prereq in prerequisites:
        graph[prereq].append(course)
        indegree[course] += 1
    
    queue = []
    for i in range(numCourses):
        if indegree[i] == 0:
            queue.append(i)
    
    count = 0
    while queue:
        current = queue.pop(0)
        count += 1
        for neighbor in graph[current]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)
    
    return count == numCourses`,
              language: 'python'
            },
            {
              title: '2. Trapping Rain Water',
              code: `def trap(height):
    if not height:
        return 0
    
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0
    
    while left < right:
        if height[left] < height[right]:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]
    
    return water`,
              language: 'python'
            },
            {
              title: '3. Minimum Window Substring',
              code: `def minWindow(s, t):
    if not t or not s:
        return ""
    
    dict_t = {}
    for char in t:
        dict_t[char] = dict_t.get(char, 0) + 1
    
    required = len(dict_t)
    formed = 0
    window_counts = {}
    
    l, r = 0, 0
    ans = float("inf"), None, None
    
    while r < len(s):
        char = s[r]
        window_counts[char] = window_counts.get(char, 0) + 1
        
        if char in dict_t and window_counts[char] == dict_t[char]:
            formed += 1
        
        while l <= r and formed == required:
            char = s[l]
            
            if r - l + 1 < ans[0]:
                ans = (r - l + 1, l, r)
            
            window_counts[char] -= 1
            if char in dict_t and window_counts[char] < dict_t[char]:
                formed -= 1
            
            l += 1
        
        r += 1
    
    return "" if ans[0] == float("inf") else s[ans[1]:ans[2] + 1]`,
              language: 'python'
            }
          ]
        },
        {
          id: 'system-design',
          title: 'System Design Questions - Detailed Answers',
          questions: [
            {
              title: '1. Design URL Shortening Service (TinyURL)',
              description: `**Requirements:**
- Shorten long URLs
- Redirect short URLs to original
- High availability, scalability
- 100M URLs per month

**Solution:**

Components:
1. URL Shortening Service
2. Redirection Service
3. Database (SQL for metadata, NoSQL for mappings)
4. Cache (Redis for frequent URLs)

Key Algorithms:
- Base62 encoding for short URLs (a-zA-Z0-9 = 62 chars)
- Distributed ID generation (Snowflake algorithm)
- Consistent hashing for database sharding

Storage Estimation:
- 100M URLs/month = 1.2B/year
- Each record: 500 bytes
- Total: 1.2B * 500B = 600GB/year

API Design:
POST /shorten { "long_url": "..." } → { "short_url": "..." }
GET /{short_code} → 301 Redirect to original`
            },
            {
              title: '2. Design Amazon Shopping Cart',
              description: `**Requirements:**
- Add/remove items
- Persistent across devices
- Real-time price updates
- High availability

**Solution:**

Architecture:
1. Cart Service (microservice)
2. Product Service (for price/inventory)
3. User Service (for authentication)
4. Redis (cart storage)
5. SQL Database (persistent storage)

Data Model:
Cart {
  userId: string,
  items: [{
    productId: string,
    quantity: int,
    price: decimal,
    addedAt: timestamp
  }],
  lastUpdated: timestamp
}

Key Decisions:
- Event-driven architecture for price updates
- Redis TTL for abandoned carts (30 days)
- Write-through cache pattern
- Idempotent operations for concurrent updates`
            }
          ]
        },
        {
          id: 'behavioral',
          title: 'Behavioral Questions with STAR Answers',
          questions: [
            {
              title: 'Tell me about a time you went above and beyond for a customer',
              description: `**Situation:** During my internship at XYZ Corp, we had a critical bug in production where users couldn't process payments during peak shopping hours (Black Friday).

**Task:** As the on-call engineer, I needed to quickly identify the root cause and implement a fix while minimizing customer impact.

**Action:** 
1. First, I implemented a quick workaround by routing 10% of traffic to a backup payment processor
2. Then analyzed logs and traced the issue to a recent database migration
3. Rolled back the faulty migration during a 15-minute maintenance window
4. Created automated tests to prevent similar issues
5. Personally reached out to 5 affected customers with discount codes

**Result:** 
- Reduced customer complaints by 95% within 2 hours
- The workaround handled $50K in transactions while main system was fixed
- Received "Above and Beyond" award from manager`
            }
          ]
        }
      ]
    },
    google: {
      name: 'Google',
      logo: '🔵',
      color: 'blue',
      sections: [
        {
          id: 'coding',
          title: 'Coding Questions',
          questions: [
            {
              title: '1. Number of Islands',
              code: `def numIslands(grid):
    if not grid:
        return 0
    
    def dfs(i, j):
        if i < 0 or i >= len(grid) or j < 0 or j >= len(grid[0]) or grid[i][j] != '1':
            return
        grid[i][j] = '0'
        dfs(i+1, j)
        dfs(i-1, j)
        dfs(i, j+1)
        dfs(i, j-1)
    
    count = 0
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == '1':
                dfs(i, j)
                count += 1
    
    return count`,
              language: 'python'
            },
            {
              title: '2. Meeting Rooms II',
              code: `def minMeetingRooms(intervals):
    if not intervals:
        return 0
    
    start_times = sorted([i[0] for i in intervals])
    end_times = sorted([i[1] for i in intervals])
    
    start_ptr = end_ptr = 0
    rooms_needed = available = 0
    
    while start_ptr < len(intervals):
        if start_times[start_ptr] >= end_times[end_ptr]:
            available += 1
            end_ptr += 1
        else:
            if available > 0:
                available -= 1
            else:
                rooms_needed += 1
            start_ptr += 1
    
    return rooms_needed`,
              language: 'python'
            },
            {
              title: '3. K Closest Points to Origin',
              code: `import heapq
import math

def kClosest(points, k):
    heap = []
    
    for (x, y) in points:
        dist = math.sqrt(x**2 + y**2)
        heapq.heappush(heap, (-dist, [x, y]))
        if len(heap) > k:
            heapq.heappop(heap)
    
    return [point for (_, point) in heap]`,
              language: 'python'
            }
          ]
        },
        {
          id: 'system-design-google',
          title: 'System Design: Google Docs',
          questions: [
            {
              title: 'Design Google Docs',
              description: `**Requirements:**
- Real-time collaboration
- Conflict resolution
- Version history
- Offline support

**Solution:**

Core Architecture:
1. Operational Transformation (OT) or Conflict-free Replicated Data Types (CRDTs)
2. WebSocket connections for real-time updates
3. Differential sync for offline changes

Components:
- Client: Rich text editor with local cache
- Collaboration Service: Manages live sessions
- Conflict Resolution: Merges concurrent edits
- Storage: Blob storage for documents, SQL for metadata
- Presence Service: Shows who's viewing/editing

Key Algorithms:
1. OT Algorithm:
   - Each operation has position, type (insert/delete), and content
   - Server maintains transformation matrix
   - Resolves conflicts using vector clocks

2. Version Control:
   - Git-like branching for document history
   - Compressed diffs for storage efficiency

3. Consistency:
   - Eventually consistent with read-your-writes
   - Last-write-wins for simple conflicts`
            }
          ]
        }
      ]
    },
    microsoft: {
      name: 'Microsoft',
      logo: '🟦',
      color: 'blue',
      sections: [
        {
          id: 'coding-ms',
          title: 'Coding Questions with Solutions',
          questions: [
            {
              title: '1. Reverse Linked List',
              code: `def reverseList(head):
    prev = None
    current = head
    
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    
    return prev`,
              language: 'python'
            },
            {
              title: '2. Clone Graph',
              code: `class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def cloneGraph(node):
    if not node:
        return None
    
    clones = {}
    
    def dfs(node):
        if node in clones:
            return clones[node]
        
        clone = Node(node.val)
        clones[node] = clone
        
        for neighbor in node.neighbors:
            clone.neighbors.append(dfs(neighbor))
        
        return clone
    
    return dfs(node)`,
              language: 'python'
            },
            {
              title: '3. Word Break',
              code: `def wordBreak(s, wordDict):
    word_set = set(wordDict)
    dp = [False] * (len(s) + 1)
    dp[0] = True
    
    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break
    
    return dp[len(s)]`,
              language: 'python'
            }
          ]
        }
      ]
    },
    flipkart: {
      name: 'Flipkart',
      logo: '🟡',
      color: 'yellow',
      sections: [
        {
          id: 'machine-coding',
          title: 'Machine Coding: Snake and Ladder Game',
          questions: [
            {
              title: 'Snake and Ladder Game Implementation',
              code: `import random

class SnakeAndLadder:
    def __init__(self, players):
        self.players = players
        self.positions = {player: 0 for player in players}
        self.snakes = {16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78}
        self.ladders = {1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100}
        self.current_player = 0
    
    def roll_dice(self):
        return random.randint(1, 6)
    
    def move_player(self, player, steps):
        new_position = self.positions[player] + steps
        
        if new_position > 100:
            return self.positions[player]
        
        # Check for snakes
        if new_position in self.snakes:
            print(f"Oops! Snake bite at {new_position}")
            new_position = self.snakes[new_position]
        
        # Check for ladders
        elif new_position in self.ladders:
            print(f"Yay! Ladder at {new_position}")
            new_position = self.ladders[new_position]
        
        self.positions[player] = new_position
        return new_position
    
    def play_turn(self):
        player = self.players[self.current_player]
        dice_roll = self.roll_dice()
        print(f"{player} rolled {dice_roll}")
        
        new_pos = self.move_player(player, dice_roll)
        print(f"{player} moved to position {new_pos}")
        
        if new_pos == 100:
            print(f"🎉 {player} wins!")
            return True
        
        # Extra turn on rolling 6
        if dice_roll != 6:
            self.current_player = (self.current_player + 1) % len(self.players)
        
        return False
    
    def start_game(self):
        print("Starting Snake and Ladder Game!")
        while True:
            if self.play_turn():
                break

# Usage
game = SnakeAndLadder(["Alice", "Bob", "Charlie"])
game.start_game()`,
              language: 'python'
            }
          ]
        }
      ]
    },
    tcs: {
      name: 'TCS',
      logo: '🔷',
      color: 'blue',
      sections: [
        {
          id: 'fibonacci',
          title: 'Fibonacci Series (Multiple Solutions)',
          questions: [
            {
              title: 'Recursive Approach',
              code: `def fibonacci_recursive(n):
    if n <= 1:
        return n
    return fibonacci_recursive(n-1) + fibonacci_recursive(n-2)`,
              language: 'python'
            },
            {
              title: 'Iterative (Optimized)',
              code: `def fibonacci_iterative(n):
    if n <= 1:
        return n
    
    a, b = 0, 1
    for _ in range(2, n+1):
        a, b = b, a + b
    return b`,
              language: 'python'
            }
          ]
        },
        {
          id: 'sql',
          title: 'SQL Queries for TCS Interview',
          questions: [
            {
              title: 'Employee Table Queries',
              code: `-- Create table
CREATE TABLE Employees (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(100),
    department VARCHAR(50),
    salary DECIMAL(10,2),
    hire_date DATE
);

-- 1. Find second highest salary
SELECT MAX(salary) FROM Employees 
WHERE salary < (SELECT MAX(salary) FROM Employees);

-- 2. Employees hired in last 5 years
SELECT * FROM Employees 
WHERE hire_date >= DATE_SUB(CURDATE(), INTERVAL 5 YEAR);

-- 3. Department wise average salary
SELECT department, AVG(salary) as avg_salary
FROM Employees
GROUP BY department
HAVING AVG(salary) > 50000;

-- 4. Rank employees by salary
SELECT emp_name, salary,
RANK() OVER (ORDER BY salary DESC) as salary_rank
FROM Employees;

-- 5. Find duplicate employee names
SELECT emp_name, COUNT(*)
FROM Employees
GROUP BY emp_name
HAVING COUNT(*) > 1;`,
              language: 'sql'
            }
          ]
        },
        {
          id: 'oops',
          title: 'OOPs Concepts with Examples',
          questions: [
            {
              title: 'Encapsulation, Inheritance, Polymorphism',
              code: `# 1. Encapsulation
class BankAccount:
    def __init__(self):
        self.__balance = 0  # Private attribute
    
    def deposit(self, amount):
        self.__balance += amount
    
    def get_balance(self):
        return self.__balance

# 2. Inheritance
class Vehicle:
    def __init__(self, brand):
        self.brand = brand
    
    def display(self):
        print(f"Brand: {self.brand}")

class Car(Vehicle):
    def __init__(self, brand, model):
        super().__init__(brand)
        self.model = model
    
    def display(self):
        super().display()
        print(f"Model: {self.model}")

# 3. Polymorphism
class Shape:
    def area(self):
        pass

class Rectangle(Shape):
    def __init__(self, length, width):
        self.length = length
        self.width = width
    
    def area(self):
        return self.length * self.width

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14 * self.radius * self.radius

# Usage
shapes = [Rectangle(5, 3), Circle(7)]
for shape in shapes:
    print(f"Area: {shape.area()}")`,
              language: 'python'
            }
          ]
        }
      ]
    },
    infosys: {
      name: 'Infosys',
      logo: '🟣',
      color: 'purple',
      sections: [
        {
          id: 'string-reverse',
          title: 'Reverse a String (Multiple Methods)',
          questions: [
            {
              title: 'Three Different Approaches',
              code: `# Method 1: Using slicing
def reverse_string_slicing(s):
    return s[::-1]

# Method 2: Using loop
def reverse_string_loop(s):
    reversed_str = ""
    for char in s:
        reversed_str = char + reversed_str
    return reversed_str

# Method 3: Using recursion
def reverse_string_recursive(s):
    if len(s) == 0:
        return s
    return reverse_string_recursive(s[1:]) + s[0]`,
              language: 'python'
            }
          ]
        },
        {
          id: 'factorial',
          title: 'Factorial Program',
          questions: [
            {
              title: 'Iterative and Recursive Solutions',
              code: `def factorial(n):
    if n < 0:
        return "Invalid input"
    elif n == 0 or n == 1:
        return 1
    else:
        result = 1
        for i in range(2, n+1):
            result *= i
        return result

# Recursive version
def factorial_recursive(n):
    if n <= 1:
        return 1
    return n * factorial_recursive(n-1)`,
              language: 'python'
            }
          ]
        },
        {
          id: 'dbms',
          title: 'DBMS Concepts for Infosys',
          questions: [
            {
              title: 'Database Concepts and Queries',
              code: `-- 1. Create table with constraints
CREATE TABLE Students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    age INT CHECK (age >= 18),
    email VARCHAR(100) UNIQUE,
    course_id INT,
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

-- 2. INNER JOIN: Common records
SELECT s.name, c.course_name
FROM Students s
INNER JOIN Courses c ON s.course_id = c.course_id;

-- 3. LEFT JOIN: All students + matching courses
SELECT s.name, c.course_name
FROM Students s
LEFT JOIN Courses c ON s.course_id = c.course_id;

-- 4. Index creation
CREATE INDEX idx_student_name ON Students(name);
CREATE INDEX idx_student_email ON Students(email);`,
              language: 'sql'
            }
          ]
        }
      ]
    }
  };

  const currentCompany = companyData[company];

  if (!currentCompany) {
    return (
      <div className="min-h-screen bg-gray-50">
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
                Back to Companies
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Select a Company</h1>
          <p className="text-gray-600 mb-8">Please select a company from the Company Preparation page to view interview questions.</p>
          <Link
            href="/dashboard/company-prep"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-flex items-center"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go to Company Preparation
          </Link>
        </div>
      </div>
    );
  }

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
              Back to Companies
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-6xl">{currentCompany.logo}</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{currentCompany.name} Interview Questions with Solutions</h1>
              <p className="text-gray-600">Comprehensive preparation guide with code solutions</p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {currentCompany.sections.map((section: any) => (
            <div key={section.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                </div>
                {expandedSections[section.id] ? (
                  <ChevronUp className="h-6 w-6 text-gray-400" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-400" />
                )}
              </button>

              {expandedSections[section.id] && (
                <div className="p-6 pt-0 space-y-6">
                  {section.questions.map((question: any, idx: number) => (
                    <div key={idx} className="border-t border-gray-200 pt-6 first:border-t-0 first:pt-0">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">{question.title}</h3>

                      {question.description && (
                        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">{question.description}</pre>
                        </div>
                      )}

                      {question.code && (
                        <div className="relative">
                          <div className="absolute top-3 right-3 bg-gray-700 text-white text-xs px-2 py-1 rounded">
                            {question.language}
                          </div>
                          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                            <code className="text-sm font-mono">{question.code}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <Link
            href="/dashboard/interview"
            className="flex-1 bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition text-center font-semibold"
          >
            <Code className="inline h-5 w-5 mr-2" />
            Start Mock Interview
          </Link>
          <Link
            href="/dashboard/company-prep"
            className="flex-1 bg-gray-200 text-gray-700 px-6 py-4 rounded-lg hover:bg-gray-300 transition text-center font-semibold"
          >
            View Other Companies
          </Link>
        </div>
      </div>
    </div>
  );
}

// Wrap in Suspense to handle useSearchParams during SSR
export default function PracticePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PracticePageContent />
    </Suspense>
  );
}
