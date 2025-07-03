"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, TrendingUp, Target, Calendar, Award, BarChart3, Clock, Flame, Trophy, Star } from "lucide-react"
import Link from "next/link"

// Mock data
const progressData = {
  totalSets: 12,
  cardsStudied: 1247,
  streakDays: 7,
  accuracy: 85,
  studyTime: 45, // hours
  achievements: [
    { id: 1, title: "First Steps", description: "Created your first study set", earned: true, date: "2024-01-15" },
    { id: 2, title: "Study Streak", description: "Studied for 7 days in a row", earned: true, date: "2024-01-20" },
    { id: 3, title: "Quick Learner", description: "Achieved 90% accuracy on a test", earned: false },
    { id: 4, title: "Dedicated Student", description: "Studied for 50 hours total", earned: false },
  ],
}

const recentActivity = [
  { id: 1, type: "study", title: "Spanish Vocabulary - Chapter 5", score: 78, date: "2 hours ago" },
  { id: 2, type: "test", title: "Biology: Cell Structure", score: 92, date: "1 day ago" },
  { id: 3, type: "create", title: "Created 'World History: WWI'", date: "2 days ago" },
  { id: 4, type: "study", title: "JavaScript Fundamentals", score: 85, date: "3 days ago" },
]

const weeklyProgress = [
  { day: "Mon", studied: 45, goal: 50 },
  { day: "Tue", studied: 60, goal: 50 },
  { day: "Wed", studied: 30, goal: 50 },
  { day: "Thu", studied: 55, goal: 50 },
  { day: "Fri", studied: 40, goal: 50 },
  { day: "Sat", studied: 70, goal: 50 },
  { day: "Sun", studied: 35, goal: 50 },
]

export default function ProgressPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">StudyMaster</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <Link href="/sets" className="text-gray-700 hover:text-blue-600 transition-colors">
                Study Sets
              </Link>
              <Link href="/create" className="text-gray-700 hover:text-blue-600 transition-colors">
                Create
              </Link>
              <Link href="/progress" className="text-blue-600 font-medium">
                Progress
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Progress</h1>
          <p className="text-gray-600">Track your learning journey and celebrate your achievements</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
              <Flame className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{progressData.streakDays}</div>
              <p className="text-xs text-muted-foreground">days in a row</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cards Studied</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{progressData.cardsStudied.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">total cards mastered</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
              <Target className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{progressData.accuracy}%</div>
              <p className="text-xs text-muted-foreground">average accuracy</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Time</CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{progressData.studyTime}h</div>
              <p className="text-xs text-muted-foreground">total study time</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Progress Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                    Weekly Progress
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant={selectedPeriod === "week" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPeriod("week")}
                    >
                      Week
                    </Button>
                    <Button
                      variant={selectedPeriod === "month" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPeriod("month")}
                    >
                      Month
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyProgress.map((day) => (
                    <div key={day.day} className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium">{day.day}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>{day.studied} cards</span>
                          <span className="text-gray-500">Goal: {day.goal}</span>
                        </div>
                        <Progress value={(day.studied / day.goal) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === "study"
                            ? "bg-blue-100"
                            : activity.type === "test"
                              ? "bg-green-100"
                              : "bg-purple-100"
                        }`}
                      >
                        {activity.type === "study" ? (
                          <BookOpen className="h-5 w-5 text-blue-600" />
                        ) : activity.type === "test" ? (
                          <Trophy className="h-5 w-5 text-green-600" />
                        ) : (
                          <Star className="h-5 w-5 text-purple-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm text-gray-500">{activity.date}</div>
                      </div>
                      {activity.score && (
                        <Badge variant={activity.score >= 80 ? "default" : "secondary"}>{activity.score}%</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-600" />
                  Current Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Daily study goal</span>
                    <span>32/50 cards</span>
                  </div>
                  <Progress value={64} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Weekly accuracy</span>
                    <span>85/90%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Study streak</span>
                    <span>7/10 days</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-blue-600" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {progressData.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`flex items-start space-x-3 p-3 rounded-lg ${
                        achievement.earned ? "bg-yellow-50 border border-yellow-200" : "bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          achievement.earned ? "bg-yellow-100" : "bg-gray-200"
                        }`}
                      >
                        <Trophy className={`h-4 w-4 ${achievement.earned ? "text-yellow-600" : "text-gray-400"}`} />
                      </div>
                      <div className="flex-1">
                        <div
                          className={`font-medium text-sm ${achievement.earned ? "text-yellow-800" : "text-gray-600"}`}
                        >
                          {achievement.title}
                        </div>
                        <div className={`text-xs ${achievement.earned ? "text-yellow-600" : "text-gray-500"}`}>
                          {achievement.description}
                        </div>
                        {achievement.earned && achievement.date && (
                          <div className="text-xs text-yellow-600 mt-1">Earned {achievement.date}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Study Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-medium text-blue-800 text-sm mb-1">Review Spanish Vocabulary</div>
                  <div className="text-blue-600 text-xs">{"You haven't studied this set in 3 days"}</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="font-medium text-green-800 text-sm mb-1">Take Biology Test</div>
                  <div className="text-green-600 text-xs">{"You're ready to test your knowledge"}</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="font-medium text-purple-800 text-sm mb-1">Create New Set</div>
                  <div className="text-purple-600 text-xs">Add more variety to your studies</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
