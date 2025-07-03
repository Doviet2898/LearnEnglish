"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { BookOpen, Clock, CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react"
import Link from "next/link"

// Mock data
const studySet = {
  id: 1,
  title: "Spanish Vocabulary - Chapter 5",
  cardCount: 45,
  subject: "Language",
}

const testQuestions = [
  {
    id: 1,
    question: "What does 'Hola' mean?",
    options: ["Goodbye", "Hello", "Please", "Thank you"],
    correctAnswer: 1,
    term: "Hola",
  },
  {
    id: 2,
    question: "What does 'Gracias' mean?",
    options: ["Hello", "Please", "Thank you", "Sorry"],
    correctAnswer: 2,
    term: "Gracias",
  },
  {
    id: 3,
    question: "What does 'Por favor' mean?",
    options: ["Please", "Hello", "Thank you", "Goodbye"],
    correctAnswer: 0,
    term: "Por favor",
  },
  {
    id: 4,
    question: "What does 'Lo siento' mean?",
    options: ["Hello", "Thank you", "Please", "I'm sorry"],
    correctAnswer: 3,
    term: "Lo siento",
  },
  {
    id: 5,
    question: "What does '¿Cómo estás?' mean?",
    options: ["What's your name?", "How are you?", "Where are you?", "How old are you?"],
    correctAnswer: 1,
    term: "¿Cómo estás?",
  },
]

export default function TestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [testStarted, setTestStarted] = useState(false)

  const currentQuestion = testQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / testQuestions.length) * 100

  useEffect(() => {
    if (testStarted && timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleFinishTest()
    }
  }, [timeLeft, testStarted, showResults])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: answerIndex,
    })
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < testQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleFinishTest = () => {
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    testQuestions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++
      }
    })
    return {
      correct,
      total: testQuestions.length,
      percentage: Math.round((correct / testQuestions.length) * 100),
    }
  }

  const startTest = () => {
    setTestStarted(true)
  }

  const resetTest = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setShowResults(false)
    setTimeLeft(300)
    setTestStarted(false)
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">StudyMaster</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl mb-2">{studySet.title}</CardTitle>
              <Badge variant="secondary" className="mx-auto w-fit">
                {studySet.subject}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-gray-600">
                <p className="text-lg mb-4">Ready to test your knowledge?</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-semibold">Questions</div>
                    <div className="text-2xl font-bold text-blue-600">{testQuestions.length}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-semibold">Time Limit</div>
                    <div className="text-2xl font-bold text-blue-600">5:00</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-left">Test Instructions:</h3>
                <ul className="text-left text-sm text-gray-600 space-y-2">
                  <li>• You have 5 minutes to complete the test</li>
                  <li>• You can navigate between questions</li>
                  <li>• Your progress is saved automatically</li>
                  <li>• Click "Finish Test" when you're done</li>
                </ul>
              </div>

              <Button onClick={startTest} size="lg" className="w-full">
                Start Test
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (showResults) {
    const score = calculateScore()
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">StudyMaster</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center mb-8">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-3xl mb-2">Test Complete!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{score.percentage}%</div>
                  <div className="text-green-700">Overall Score</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{score.correct}</div>
                  <div className="text-blue-700">Correct Answers</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-gray-600">{score.total - score.correct}</div>
                  <div className="text-gray-700">Incorrect Answers</div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button onClick={resetTest}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake Test
                </Button>
                <Link href={`/study/${studySet.id}/flashcards`}>
                  <Button variant="outline">Study More</Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline">Back to Dashboard</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <Card>
            <CardHeader>
              <CardTitle>Question Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testQuestions.map((question, index) => {
                  const userAnswer = selectedAnswers[question.id]
                  const isCorrect = userAnswer === question.correctAnswer

                  return (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium">
                          {index + 1}. {question.question}
                        </h4>
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                        )}
                      </div>

                      <div className="space-y-2 text-sm">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded ${
                              optionIndex === question.correctAnswer
                                ? "bg-green-100 text-green-800 border border-green-200"
                                : optionIndex === userAnswer && !isCorrect
                                  ? "bg-red-100 text-red-800 border border-red-200"
                                  : "bg-gray-50"
                            }`}
                          >
                            {option}
                            {optionIndex === question.correctAnswer && (
                              <span className="ml-2 text-green-600">✓ Correct</span>
                            )}
                            {optionIndex === userAnswer && !isCorrect && (
                              <span className="ml-2 text-red-600">✗ Your answer</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
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
              <Badge variant="secondary">{studySet.subject}</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4" />
                <span className={timeLeft < 60 ? "text-red-600 font-bold" : ""}>{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{studySet.title}</h1>
            <span className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {testQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswers[currentQuestion.id]?.toString()}
              onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
            Previous
          </Button>

          <div className="flex space-x-2">
            {testQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium ${
                  index === currentQuestionIndex
                    ? "bg-blue-600 text-white"
                    : selectedAnswers[testQuestions[index].id] !== undefined
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-gray-100 text-gray-600 border border-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestionIndex === testQuestions.length - 1 ? (
            <Button onClick={handleFinishTest}>Finish Test</Button>
          ) : (
            <Button onClick={nextQuestion}>Next</Button>
          )}
        </div>
      </div>
    </div>
  )
}
