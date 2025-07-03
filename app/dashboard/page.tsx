"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Plus, Search, TrendingUp, Clock, BarChart3, Target, Calendar, Settings, LogOut } from "lucide-react"
import Link from "next/link"

// Mock data
const recentSets = [
  {
    id: 1,
    title: "Spanish Vocabulary - Chapter 5",
    cardCount: 45,
    lastStudied: "2 hours ago",
    progress: 78,
    subject: "Language",
  },
  {
    id: 2,
    title: "Biology: Cell Structure",
    cardCount: 32,
    lastStudied: "1 day ago",
    progress: 92,
    subject: "Science",
  },
  {
    id: 3,
    title: "World History: WWI",
    cardCount: 28,
    lastStudied: "3 days ago",
    progress: 45,
    subject: "History",
  },
]

const studyStats = {
  totalSets: 12,
  cardsStudied: 1247,
  streakDays: 7,
  accuracy: 85,
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">StudyMaster</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/dashboard" className="text-blue-600 font-medium">
                Dashboard
              </Link>
              <Link href="/sets" className="text-gray-700 hover:text-blue-600 transition-colors">
                Study Sets
              </Link>
              <Link href="/create" className="text-gray-700 hover:text-blue-600 transition-colors">
                Create
              </Link>
              <Link href="/progress" className="text-gray-700 hover:text-blue-600 transition-colors">
                Progress
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John! 👋</h1>
          <p className="text-gray-600">
            {"You're on a "}
            <span className="font-semibold text-blue-600">{studyStats.streakDays}-day streak</span>! Keep it up!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Sets</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studyStats.totalSets}</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cards Studied</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studyStats.cardsStudied.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+180 from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studyStats.streakDays} days</div>
              <p className="text-xs text-muted-foreground">Personal best!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studyStats.accuracy}%</div>
              <p className="text-xs text-muted-foreground">+5% from last week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Study Sets */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Study Sets</h2>
              <Link href="/create">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Set
                </Button>
              </Link>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search your study sets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-4">
              {recentSets.map((set) => (
                <Card key={set.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{set.title}</CardTitle>
                        <CardDescription className="flex items-center space-x-4 mt-2">
                          <span>{set.cardCount} cards</span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {set.lastStudied}
                          </span>
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{set.subject}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{set.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${set.progress}%` }} />
                        </div>
                      </div>
                      <div className="ml-4 flex space-x-2">
                        <Link href={`/study/${set.id}/flashcards`}>
                          <Button variant="outline" size="sm">
                            Study
                          </Button>
                        </Link>
                        <Link href={`/study/${set.id}/test`}>
                          <Button size="sm">Test</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Goal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-600" />
                  {"Today's Goal"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Study 50 cards</span>
                      <span>32/50</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "64%" }} />
                    </div>
                  </div>
                  <Button className="w-full" size="sm">
                    Continue Studying
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Study Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Study Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                    <div key={day} className="font-medium text-gray-500 p-2">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 35 }, (_, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded ${
                        i % 7 === 0 || i % 7 === 6
                          ? "text-gray-400"
                          : i < 7
                            ? "bg-blue-100 text-blue-600 font-medium"
                            : i < 14
                              ? "bg-green-100 text-green-600"
                              : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {((i % 30) + 1).toString()}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/create" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Study Set
                  </Button>
                </Link>
                <Link href="/sets" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Search className="h-4 w-4 mr-2" />
                    Browse Sets
                  </Button>
                </Link>
                <Link href="/progress" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Progress
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
