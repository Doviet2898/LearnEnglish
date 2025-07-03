"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Plus, Trash2, Save, Eye, Upload, X } from "lucide-react"
import Link from "next/link"

interface Flashcard {
  id: string
  term: string
  definition: string
}

export default function CreatePage() {
  const [studySet, setStudySet] = useState({
    title: "",
    description: "",
    subject: "",
    visibility: "private",
  })

  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    { id: "1", term: "", definition: "" },
    { id: "2", term: "", definition: "" },
  ])

  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const addFlashcard = () => {
    const newCard: Flashcard = {
      id: Date.now().toString(),
      term: "",
      definition: "",
    }
    setFlashcards([...flashcards, newCard])
  }

  const removeFlashcard = (id: string) => {
    if (flashcards.length > 2) {
      setFlashcards(flashcards.filter((card) => card.id !== id))
    }
  }

  const updateFlashcard = (id: string, field: "term" | "definition", value: string) => {
    setFlashcards(flashcards.map((card) => (card.id === id ? { ...card, [field]: value } : card)))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSave = () => {
    // Save logic here
    console.log("Saving study set:", { studySet, flashcards, tags })
  }

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
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Set
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Study Set Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create a New Study Set</CardTitle>
            <CardDescription>Add a title, description, and organize your flashcards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter a title for your study set"
                  value={studySet.title}
                  onChange={(e) => setStudySet({ ...studySet, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select
                  value={studySet.subject}
                  onValueChange={(value) => setStudySet({ ...studySet, subject: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="language">Language</SelectItem>
                    <SelectItem value="literature">Literature</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Add a description (optional)"
                value={studySet.description}
                onChange={(e) => setStudySet({ ...studySet, description: e.target.value })}
                rows={3}
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-2 py-1">
                    {tag}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                />
                <Button type="button" onClick={addTag}>
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Visibility</Label>
              <Select
                value={studySet.visibility}
                onValueChange={(value) => setStudySet({ ...studySet, visibility: value })}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Private - Only you can see</SelectItem>
                  <SelectItem value="public">Public - Anyone can see</SelectItem>
                  <SelectItem value="unlisted">Unlisted - Only with link</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Flashcards */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Flashcards ({flashcards.length})</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button onClick={addFlashcard}>
                <Plus className="h-4 w-4 mr-2" />
                Add Card
              </Button>
            </div>
          </div>

          {flashcards.map((card, index) => (
            <Card key={card.id} className="relative">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Card {index + 1}</CardTitle>
                  {flashcards.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFlashcard(card.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor={`term-${card.id}`}>Term</Label>
                    <Textarea
                      id={`term-${card.id}`}
                      placeholder="Enter the term"
                      value={card.term}
                      onChange={(e) => updateFlashcard(card.id, "term", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`definition-${card.id}`}>Definition</Label>
                    <Textarea
                      id={`definition-${card.id}`}
                      placeholder="Enter the definition"
                      value={card.definition}
                      onChange={(e) => updateFlashcard(card.id, "definition", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add Card Button */}
          <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
            <CardContent className="flex items-center justify-center py-12">
              <Button variant="ghost" onClick={addFlashcard} className="text-gray-600 hover:text-blue-600">
                <Plus className="h-6 w-6 mr-2" />
                Add another card
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
          <Link href="/dashboard">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button onClick={handleSave} size="lg">
            <Save className="h-4 w-4 mr-2" />
            Create Study Set
          </Button>
        </div>
      </div>
    </div>
  )
}
