"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Search, Filter, Star, Users, Clock, Play, BookmarkPlus } from "lucide-react"
import Link from "next/link"

// Mock data
const studySets = [
  {
    id: 1,
    title: "Spanish Vocabulary - Chapter 5",
    description: "Essential Spanish words and phrases for beginners",
    cardCount: 45,
    subject: "Language",
    author: "Maria Garcia",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    rating: 4.8,
    studyCount: 1247,
    lastUpdated: "2 days ago",
    tags: ["Spanish", "Vocabulary", "Beginner"],
    isPublic: true,
  },
  {
    id: 2,
    title: "Biology: Cell Structure",
    description: "Comprehensive study of cellular components and functions",
    cardCount: 32,
    subject: "Science",
    author: "Dr. Johnson",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    rating: 4.9,
    studyCount: 892,
    lastUpdated: "1 week ago",
    tags: ["Biology", "Cells", "Science"],
    isPublic: true,
  },
  {
    id: 3,
    title: "World History: WWI",
    description: "Key events, dates, and figures from World War I",
    cardCount: 28,
    subject: "History",
    author: "Prof. Smith",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    rating: 4.6,
    studyCount: 634,
    lastUpdated: "3 days ago",
    tags: ["History", "WWI", "Events"],
    isPublic: true,
  },
  {
    id: 4,
    title: "JavaScript Fundamentals",
    description: "Core concepts and syntax for JavaScript programming",
    cardCount: 67,
    subject: "Programming",
    author: "CodeMaster",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    rating: 4.7,
    studyCount: 2156,
    lastUpdated: "1 day ago",
    tags: ["JavaScript", "Programming", "Web Dev"],
    isPublic: true,
  },
  {
    id: 5,
    title: "Chemistry: Periodic Table",
    description: "Elements, symbols, and properties of the periodic table",
    cardCount: 118,
    subject: "Science",
    author: "ChemTeacher",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    rating: 4.5,
    studyCount: 987,
    lastUpdated: "5 days ago",
    tags: ["Chemistry", "Elements", "Science"],
    isPublic: true,
  },
  {
    id: 6,
    title: "French Conjugations",
    description: "Common French verb conjugations and patterns",
    cardCount: 89,
    subject: "Language",
    author: "FrenchTutor",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    rating: 4.4,
    studyCount: 756,
    lastUpdated: "1 week ago",
    tags: ["French", "Verbs", "Grammar"],
    isPublic: true,
  },
]

const subjects = ["All", "Language", "Science", "History", "Programming", "Math", "Literature"]

export default function StudySetsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("All")
  const [sortBy, setSortBy] = useState("popular")

  const filteredSets = studySets.filter((set) => {
    const matchesSearch =
      set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      set.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      set.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesSubject = selectedSubject === "All" || set.subject === selectedSubject

    return matchesSearch && matchesSubject
  })

  const sortedSets = [...filteredSets].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.studyCount - a.studyCount
      case "rating":
        return b.rating - a.rating
      case "recent":
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      case "cards":
        return b.cardCount - a.cardCount
      default:
        return 0
    }
  })

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
              <Link href="/sets" className="text-blue-600 font-medium">
                Study Sets
              </Link>
              <Link href="/create" className="text-gray-700 hover:text-blue-600 transition-colors">
                Create
              </Link>
              <Link href="/progress" className="text-gray-700 hover:text-blue-600 transition-colors">
                Progress
              </Link>
            </nav>
            <Link href="/create">
              <Button>Create Set</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Study Sets</h1>
          <p className="text-gray-600">Browse thousands of study sets created by students and teachers</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search study sets, topics, or subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="cards">Most Cards</SelectItem>
              </SelectContent>
            </Select>

            {(searchQuery || selectedSubject !== "All") && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedSubject("All")
                }}
                className="text-sm"
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedSets.length} study set{sortedSets.length !== 1 ? "s" : ""}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Study Sets Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSets.map((set) => (
            <Card key={set.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary">{set.subject}</Badge>
                  <Button variant="ghost" size="sm">
                    <BookmarkPlus className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg line-clamp-2">{set.title}</CardTitle>
                <CardDescription className="line-clamp-2">{set.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{set.cardCount} cards</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{set.rating}</span>
                    </div>
                  </div>

                  {/* Author */}
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={set.authorAvatar || "/placeholder.svg"} />
                      <AvatarFallback>{set.author[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">{set.author}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {set.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{set.studyCount.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{set.lastUpdated}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Link href={`/study/${set.id}/flashcards`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Play className="h-3 w-3 mr-1" />
                        Study
                      </Button>
                    </Link>
                    <Link href={`/study/${set.id}/test`} className="flex-1">
                      <Button size="sm" className="w-full">
                        Test
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {sortedSets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No study sets found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search terms or filters</p>
            <Link href="/create">
              <Button>Create your own study set</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
