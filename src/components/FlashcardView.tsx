'use client'

import { useState } from 'react'
import { Role, Concept } from './RoleExplorer'

interface FlashcardViewProps {
  role: Role
  onBack: () => void
  onViewModeChange: (mode: 'overview' | 'situation' | 'flowchart' | 'flashcards') => void
}

export default function FlashcardView({ 
  role, 
  onBack, 
  onViewModeChange 
}: FlashcardViewProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [studyMode, setStudyMode] = useState<'browse' | 'quiz'>('browse')
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 })
  const [showAnswer, setShowAnswer] = useState(false)

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(role.concepts.map(c => c.category)))]
  
  // Filter concepts by category
  const filteredConcepts = selectedCategory === 'all' 
    ? role.concepts 
    : role.concepts.filter(c => c.category === selectedCategory)

  const currentConcept = filteredConcepts[currentCardIndex]

  const nextCard = () => {
    setIsFlipped(false)
    setShowAnswer(false)
    setCurrentCardIndex((prev) => (prev + 1) % filteredConcepts.length)
  }

  const prevCard = () => {
    setIsFlipped(false)
    setShowAnswer(false)
    setCurrentCardIndex((prev) => (prev - 1 + filteredConcepts.length) % filteredConcepts.length)
  }

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  const handleQuizAnswer = (correct: boolean) => {
    setQuizScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }))
    setShowAnswer(true)
    setTimeout(() => {
      nextCard()
    }, 2000)
  }

  const resetQuiz = () => {
    setQuizScore({ correct: 0, total: 0 })
    setCurrentCardIndex(0)
    setShowAnswer(false)
  }

  if (!currentConcept) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <p className="text-gray-600">Geen concepten beschikbaar voor deze categorie.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <span className="mr-2">←</span>
          Terug naar rollen
        </button>
        
        <div className={`bg-gradient-to-r ${role.color} rounded-xl p-8 text-white`}>
          <div className="flex items-center mb-4">
            <span className="text-5xl mr-4">{role.icon}</span>
            <div>
              <h1 className="text-3xl font-bold">{role.name} - Flashcards</h1>
              <p className="text-white text-opacity-90 mt-2">
                Leer belangrijke begrippen en concepten
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => onViewModeChange('situation')}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg shadow-md border-2 border-transparent hover:border-gray-300 font-medium transition-colors"
        >
          📚 Situaties
        </button>
        <button
          onClick={() => onViewModeChange('flowchart')}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg shadow-md border-2 border-transparent hover:border-gray-300 font-medium transition-colors"
        >
          📊 Stroomdiagram
        </button>
        <button
          onClick={() => onViewModeChange('flashcards')}
          className="px-6 py-3 bg-white text-gray-800 rounded-lg shadow-md border-2 border-blue-500 font-medium"
        >
          🃏 Flashcards
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Category filter */}
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700">Categorie:</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                setCurrentCardIndex(0)
                setIsFlipped(false)
                setShowAnswer(false)
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Alle categorieën' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Study mode toggle */}
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700">Modus:</label>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => {
                  setStudyMode('browse')
                  setShowAnswer(false)
                  resetQuiz()
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  studyMode === 'browse'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📖 Bladeren
              </button>
              <button
                onClick={() => {
                  setStudyMode('quiz')
                  setIsFlipped(false)
                  resetQuiz()
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  studyMode === 'quiz'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🧠 Quiz
              </button>
            </div>
          </div>

          {/* Progress */}
          <div className="text-sm text-gray-600">
            {currentCardIndex + 1} van {filteredConcepts.length}
            {studyMode === 'quiz' && quizScore.total > 0 && (
              <span className="ml-3 text-blue-600 font-medium">
                Score: {quizScore.correct}/{quizScore.total} ({Math.round((quizScore.correct / quizScore.total) * 100)}%)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-2xl">
          <div
            className={`relative w-full h-80 cursor-pointer transition-transform duration-500 transform-style-preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={studyMode === 'browse' ? flipCard : undefined}
          >
            {/* Front of card */}
            <div className="absolute inset-0 w-full h-full backface-hidden">
              <div className={`w-full h-full bg-gradient-to-br ${role.color} rounded-xl shadow-xl p-8 flex flex-col justify-center items-center text-white`}>
                <div className="text-center">
                  <div className="text-sm font-medium opacity-80 mb-2">
                    {currentConcept.category}
                  </div>
                  <h2 className="text-3xl font-bold mb-4">
                    {currentConcept.term}
                  </h2>
                  {studyMode === 'browse' && (
                    <p className="text-white text-opacity-80 text-sm">
                      Klik om de definitie te zien
                    </p>
                  )}
                  {studyMode === 'quiz' && !showAnswer && (
                    <p className="text-white text-opacity-80 text-sm">
                      Ken je de definitie van dit begrip?
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Back of card */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
              <div className="w-full h-full bg-white rounded-xl shadow-xl p-8 border border-gray-200">
                <div className="h-full flex flex-col justify-center">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {currentConcept.term}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {currentConcept.definition}
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Voorbeeld:</h4>
                      <p className="text-blue-700 text-sm">
                        {currentConcept.example}
                      </p>
                    </div>
                  </div>
                  {studyMode === 'browse' && (
                    <p className="text-gray-500 text-sm text-center">
                      Klik om terug te draaien
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz controls */}
      {studyMode === 'quiz' && !showAnswer && (
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => handleQuizAnswer(false)}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
          >
            ❌ Weet ik niet
          </button>
          <button
            onClick={() => handleQuizAnswer(true)}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
          >
            ✅ Weet ik wel
          </button>
        </div>
      )}

      {/* Answer reveal for quiz */}
      {studyMode === 'quiz' && showAnswer && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {currentConcept.term}
          </h3>
          <p className="text-gray-700 mb-4">
            {currentConcept.definition}
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Voorbeeld:</h4>
            <p className="text-blue-700 text-sm">
              {currentConcept.example}
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={prevCard}
          disabled={filteredConcepts.length <= 1}
          className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="mr-2">←</span>
          Vorige
        </button>

        <div className="flex space-x-2">
          {filteredConcepts.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentCardIndex(index)
                setIsFlipped(false)
                setShowAnswer(false)
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentCardIndex
                  ? 'bg-blue-500'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextCard}
          disabled={filteredConcepts.length <= 1}
          className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Volgende
          <span className="ml-2">→</span>
        </button>
      </div>

      {/* Quiz summary */}
      {studyMode === 'quiz' && quizScore.total >= filteredConcepts.length && (
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-green-800 mb-2">
            Quiz voltooid! 🎉
          </h3>
          <p className="text-green-700 mb-4">
            Je hebt {quizScore.correct} van de {quizScore.total} begrippen goed ({Math.round((quizScore.correct / quizScore.total) * 100)}%)
          </p>
          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            Opnieuw beginnen
          </button>
        </div>
      )}

      <style jsx>{`
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}