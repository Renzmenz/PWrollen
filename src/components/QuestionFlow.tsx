'use client'

import { useState } from 'react'
import { Role, Situation, Question } from './RoleExplorer'

interface QuestionFlowProps {
  role: Role
  situation: Situation
  onBack: () => void
  onComplete: (situationId: string, reflection: string) => void
}

export default function QuestionFlow({ role, situation, onBack, onComplete }: QuestionFlowProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [finalReflection, setFinalReflection] = useState('')
  const [showCompletion, setShowCompletion] = useState(false)

  const currentQuestion = situation.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === situation.questions.length - 1

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
    
    if (currentQuestion.type === 'multiple-choice' && currentQuestion.explanation) {
      setShowFeedback(true)
    } else {
      handleNext()
    }
  }

  const handleNext = () => {
    setShowFeedback(false)
    
    if (isLastQuestion) {
      setShowCompletion(true)
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handleComplete = () => {
    if (finalReflection.trim()) {
      onComplete(situation.id, finalReflection)
    }
  }

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(question.id, index)}
                className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <span className="font-medium text-gray-800">{String.fromCharCode(65 + index)}.</span>
                <span className="ml-2 text-gray-700">{option}</span>
              </button>
            ))}
          </div>
        )
      
      case 'reflection':
        return (
          <div>
            <textarea
              placeholder="Typ hier je reflectie..."
              className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 resize-none"
              value={answers[question.id] || ''}
              onChange={(e) => setAnswers(prev => ({ ...prev, [question.id]: e.target.value }))}
            />
            <button
              onClick={() => handleAnswer(question.id, answers[question.id])}
              disabled={!answers[question.id]?.trim()}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Volgende
            </button>
          </div>
        )
      
      case 'starr':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">STARR-methode:</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li><strong>S</strong>ituatie: Wat was de context?</li>
                <li><strong>T</strong>aak: Wat moest er gebeuren?</li>
                <li><strong>A</strong>ctie: Wat heb je gedaan?</li>
                <li><strong>R</strong>esultaat: Wat was het resultaat?</li>
                <li><strong>R</strong>eflectie: Wat heb je geleerd?</li>
              </ul>
            </div>
            <textarea
              placeholder="Beschrijf je situatie volgens de STARR-methode..."
              className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 resize-none"
              value={answers[question.id] || ''}
              onChange={(e) => setAnswers(prev => ({ ...prev, [question.id]: e.target.value }))}
            />
            <button
              onClick={() => handleAnswer(question.id, answers[question.id])}
              disabled={!answers[question.id]?.trim()}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Volgende
            </button>
          </div>
        )
      
      default:
        return null
    }
  }

  if (showCompletion) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎉</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Situatie voltooid!</h2>
            <p className="text-gray-600">
              Je hebt alle vragen beantwoord. Schrijf nu een korte reflectie over wat je hebt geleerd.
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wat heb je geleerd over jezelf als {role.name}?
            </label>
            <textarea
              placeholder="Beschrijf wat je hebt geleerd en hoe je dit kunt toepassen..."
              className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 resize-none"
              value={finalReflection}
              onChange={(e) => setFinalReflection(e.target.value)}
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={onBack}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Terug
            </button>
            <button
              onClick={handleComplete}
              disabled={!finalReflection.trim()}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Voorbeeld opslaan
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <span className="mr-2">←</span>
          Terug naar situaties
        </button>
        
        <div className={`bg-gradient-to-r ${role.color} rounded-xl p-6 text-white`}>
          <h1 className="text-2xl font-bold mb-2">{situation.title}</h1>
          <p className="text-white text-opacity-90">{situation.description}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Vraag {currentQuestionIndex + 1} van {situation.questions.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentQuestionIndex + 1) / situation.questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`bg-gradient-to-r ${role.color} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${((currentQuestionIndex + 1) / situation.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Scenario */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="font-semibold text-gray-800 mb-3">Scenario:</h3>
        <p className="text-gray-700 leading-relaxed">{situation.scenario}</p>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          {currentQuestion.text}
        </h3>
        
        {renderQuestion(currentQuestion)}
        
        {/* Feedback */}
        {showFeedback && currentQuestion.explanation && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Uitleg:</strong> {currentQuestion.explanation}
            </p>
            <button
              onClick={handleNext}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Volgende vraag
            </button>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h4 className="font-semibold text-yellow-800 mb-3">💡 Tips:</h4>
        <ul className="space-y-2">
          {situation.tips.map((tip, index) => (
            <li key={index} className="text-yellow-700 text-sm flex items-start">
              <span className="mr-2">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}