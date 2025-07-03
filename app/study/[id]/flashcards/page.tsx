"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Star,
  Check,
  X,
  Settings,
  Shuffle,
} from "lucide-react"
import Link from "next/link"

// Mock data
const studySet = {
  id: 1,
  title: "Spanish Vocabulary - Chapter 5",
  cardCount: 45,
  subject: "Language",
}

const flashcards = [
  { id: 1, term: "Hola", definition: "Hello", difficulty: "easy" },
  { id: 2, term: "Gracias", definition: "Thank you", difficulty: "medium" },
  { id: 3, term: "Por favor", definition: "Please", difficulty: "easy" },
  { id: 4, term: "Lo siento", definition: "I'm sorry", difficulty: "hard" },
  { id: 5, term: "¿Cómo estás?", definition: "How are you?", difficulty: "medium" },
]

export default function FlashcardsPage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [studiedCards, setStudiedCards] = useState<Set<number>>(new Set())
  const [knownCards, setKnownCards] = useState<Set<number>>(new Set())
  const [shuffled, setShuffled] = useState(false)

  const currentCard = flashcards[currentCardIndex]
  const progress = (studiedCards.size / flashcards.length) * 100

  const nextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setIsFlipped(false)
    }
  }

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      setIsFlipped(false)
    }
  }

  const markAsKnown = () => {
    setKnownCards(new Set([...knownCards, currentCard.id]))
    setStudiedCards(new Set([...studiedCards, currentCard.id]))
    nextCard()
  }

  const markAsUnknown = () => {
    setStudiedCards(new Set([...studiedCards, currentCard.id]))
    nextCard()
  }

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  const resetProgress = () => {
    setCurrentCardIndex(0)
    setStudiedCards(new Set())
    setKnownCards(new Set())
    setIsFlipped(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">StudyMaster</span>
              </Link>
              <div className="hidden md:block">
                <Badge variant="secondary">{studySet.subject}</Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Options
              </Button>
              <Button variant="outline" size="sm" onClick={resetProgress}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Study Set Info */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{studySet.title}</h1>
          <p className="text-gray-600">
            Card {currentCardIndex + 1} of {flashcards.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Flashcard */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-2xl">
            <Card
              className={`h-80 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                isFlipped ? "bg-blue-50 border-blue-200" : "bg-white"
              }`}
              onClick={flipCard}
            >
              <CardContent className="flex items-center justify-center h-full p-8">
                <div className="text-center">
                  {!isFlipped ? (
                    <>
                      <div className="text-sm text-gray-500 mb-4">TERM</div>
                      <div className="text-3xl font-bold text-gray-900 mb-4">{currentCard.term}</div>
                      <div className="flex items-center justify-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Volume2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-sm text-gray-500 mt-4">Click to reveal definition</div>
                    </>
                  ) : (
                    <>
                      <div className="text-sm text-blue-600 mb-4">DEFINITION</div>
                      <div className="text-2xl font-semibold text-gray-900 mb-4">{currentCard.definition}</div>
                      <div className="flex items-center justify-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Volume2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Difficulty Badge */}
            <div className="absolute top-4 right-4">
              <Badge
                variant={
                  currentCard.difficulty === "easy"
                    ? "default"
                    : currentCard.difficulty === "medium"
                      ? "secondary"
                      : "destructive"
                }
              >
                {currentCard.difficulty}
              </Badge>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isFlipped && (
          <div className="flex justify-center space-x-4 mb-8">
            <Button
              variant="outline"
              onClick={markAsUnknown}
              className="flex items-center space-x-2 text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
            >
              <X className="h-4 w-4" />
              <span>Still Learning</span>
            </Button>
            <Button onClick={markAsKnown} className="flex items-center space-x-2 bg-green-600 hover:bg-green-700">
              <Check className="h-4 w-4" />
              <span>Know It</span>
            </Button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prevCard}
            disabled={currentCardIndex === 0}
            className="flex items-center space-x-2 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Shuffle className="h-4 w-4 mr-2" />
              Shuffle
            </Button>
            <span className="text-sm text-gray-500">
              {knownCards.size} known • {studiedCards.size - knownCards.size} learning
            </span>
          </div>

          <Button
            variant="outline"
            onClick={nextCard}
            disabled={currentCardIndex === flashcards.length - 1}
            className="flex items-center space-x-2 bg-transparent"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Study Complete */}
        {studiedCards.size === flashcards.length && (
          <div className="mt-8 text-center">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="py-8">
                <div className="text-green-600 mb-4">
                  <Check className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Great job! You've studied all cards</h3>
                <p className="text-green-700 mb-4">
                  You knew {knownCards.size} out of {flashcards.length} cards
                </p>
                <div className="flex justify-center space-x-4">
                  <Button onClick={resetProgress}>Study Again</Button>
                  <Link href={`/study/${studySet.id}/test`}>
                    <Button variant="outline">Take Test</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
