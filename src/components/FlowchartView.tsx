'use client'

import { useState } from 'react'
import { Role, CompletedExample, FlowchartStep } from './RoleExplorer'

interface FlowchartViewProps {
  role: Role
  onBack: () => void
  onViewModeChange: (mode: 'overview' | 'situation' | 'flowchart' | 'flashcards') => void
  completedExamples: CompletedExample[]
}

export default function FlowchartView({ 
  role, 
  onBack, 
  onViewModeChange,
  completedExamples 
}: FlowchartViewProps) {
  const [selectedStep, setSelectedStep] = useState<FlowchartStep | null>(null)

  // Calculate completion based on completed examples
  const getStepCompletion = (stepId: string): boolean => {
    // For demo purposes, mark steps as completed based on number of completed examples
    const completedCount = completedExamples.length
    const stepIndex = role.flowchartSteps.findIndex(step => step.id === stepId)
    return completedCount > stepIndex
  }

  const completedSteps = role.flowchartSteps.filter(step => getStepCompletion(step.id)).length
  const totalSteps = role.flowchartSteps.length
  const progressPercentage = (completedSteps / totalSteps) * 100

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
              <h1 className="text-3xl font-bold">{role.name} - Ontwikkelingspad</h1>
              <p className="text-white text-opacity-90 mt-2">
                Volg je voortgang en zie wat je nog nodig hebt
              </p>
            </div>
          </div>
          
          {/* Progress */}
          <div className="bg-white bg-opacity-20 rounded-lg p-4 mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">
                Voortgang: {completedSteps} van {totalSteps} stappen voltooid
              </span>
              <span className="text-2xl">
                {progressPercentage === 100 ? '🏆' : progressPercentage >= 75 ? '🌟' : '📈'}
              </span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
              <div
                className="bg-white h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
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
          className="px-6 py-3 bg-white text-gray-800 rounded-lg shadow-md border-2 border-blue-500 font-medium"
        >
          📊 Stroomdiagram
        </button>
        <button
          onClick={() => onViewModeChange('flashcards')}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg shadow-md border-2 border-transparent hover:border-gray-300 font-medium transition-colors"
        >
          🃏 Flashcards
        </button>
      </div>

      {/* Flowchart */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Ontwikkelingspad voor {role.name}
        </h2>
        
        <div className="space-y-6">
          {role.flowchartSteps.map((step, index) => {
            const isCompleted = getStepCompletion(step.id)
            const isNext = !isCompleted && index === completedSteps
            
            return (
              <div key={step.id} className="relative">
                {/* Connection line */}
                {index < role.flowchartSteps.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-8 bg-gray-300"></div>
                )}
                
                <div
                  className={`flex items-start space-x-4 p-6 rounded-xl border-2 transition-all cursor-pointer ${
                    isCompleted
                      ? 'border-green-500 bg-green-50'
                      : isNext
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                  onClick={() => setSelectedStep(selectedStep?.id === step.id ? null : step)}
                >
                  {/* Step indicator */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                      isCompleted
                        ? 'bg-green-500'
                        : isNext
                        ? 'bg-blue-500'
                        : 'bg-gray-400'
                    }`}
                  >
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  
                  {/* Step content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {step.description}
                    </p>
                    
                    {/* Status badge */}
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isCompleted
                            ? 'bg-green-100 text-green-800'
                            : isNext
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {isCompleted ? 'Voltooid' : isNext ? 'Volgende stap' : 'Nog niet bereikt'}
                      </span>
                      
                      {selectedStep?.id === step.id ? (
                        <span className="text-gray-500 text-sm">Klik om in te klappen</span>
                      ) : (
                        <span className="text-gray-500 text-sm">Klik voor details</span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Expanded details */}
                {selectedStep?.id === step.id && (
                  <div className="mt-4 ml-16 p-6 bg-white border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3">Vereisten voor deze stap:</h4>
                    <ul className="space-y-2">
                      {step.requirements.map((requirement, reqIndex) => (
                        <li key={reqIndex} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                          {requirement}
                        </li>
                      ))}
                    </ul>
                    
                    {!isCompleted && (
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-yellow-800 text-sm">
                          💡 <strong>Tip:</strong> Voltooi meer situaties om deze stap te bereiken. 
                          Elke voltooide situatie brengt je dichter bij het beheersen van deze rol!
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        
        {/* Summary */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Samenvatting van je ontwikkeling:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedSteps}</div>
              <div className="text-sm text-gray-600">Voltooide stappen</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalSteps - completedSteps}</div>
              <div className="text-sm text-gray-600">Resterende stappen</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{Math.round(progressPercentage)}%</div>
              <div className="text-sm text-gray-600">Totale voortgang</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}