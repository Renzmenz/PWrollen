'use client'

import { useState } from 'react'
import { Role, Situation, CompletedExample } from './RoleExplorer'
import SituationCard from './SituationCard'
import QuestionFlow from './QuestionFlow'

interface SituationExplorerProps {
  role: Role
  onBack: () => void
  onExampleCompleted: (example: CompletedExample) => void
  completedExamples: CompletedExample[]
}

export default function SituationExplorer({ 
  role, 
  onBack, 
  onExampleCompleted, 
  completedExamples 
}: SituationExplorerProps) {
  const [selectedSituation, setSelectedSituation] = useState<Situation | null>(null)

  const handleSituationSelect = (situation: Situation) => {
    setSelectedSituation(situation)
  }

  const handleBackToSituations = () => {
    setSelectedSituation(null)
  }

  const handleSituationCompleted = (situationId: string, reflection: string) => {
    const situation = role.situations.find(s => s.id === situationId)
    if (situation) {
      const example: CompletedExample = {
        roleId: role.id,
        situationId: situation.id,
        title: situation.title,
        reflection: reflection,
        completedAt: new Date()
      }
      onExampleCompleted(example)
      setSelectedSituation(null)
    }
  }

  if (selectedSituation) {
    return (
      <QuestionFlow
        role={role}
        situation={selectedSituation}
        onBack={handleBackToSituations}
        onComplete={handleSituationCompleted}
      />
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
              <h1 className="text-3xl font-bold">{role.name}</h1>
              <p className="text-white text-opacity-90 mt-2">
                {role.fullDescription}
              </p>
            </div>
          </div>
          
          {/* Progress */}
          <div className="bg-white bg-opacity-20 rounded-lg p-4 mt-6">
            <div className="flex justify-between items-center">
              <span className="font-medium">
                Voortgang: {completedExamples.length} van {role.situations.length} situaties voltooid
              </span>
              <span className="text-2xl">
                {completedExamples.length === role.situations.length ? '🎉' : '📈'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Situations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {role.situations.map((situation) => {
          const isCompleted = completedExamples.some(ex => ex.situationId === situation.id)
          return (
            <SituationCard
              key={situation.id}
              situation={situation}
              onSelect={handleSituationSelect}
              isCompleted={isCompleted}
              roleColor={role.color}
            />
          )
        })}
      </div>

      {/* Completed Examples */}
      {completedExamples.length > 0 && (
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-3">📚</span>
            Jouw voorbeelden voor {role.name}
          </h2>
          
          <div className="space-y-4">
            {completedExamples.map((example, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800">{example.title}</h3>
                  <span className="text-xs text-gray-500">
                    {example.completedAt.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {example.reflection}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm">
              💡 <strong>Tip:</strong> Deze voorbeelden kun je gebruiken in gesprekken, 
              sollicitaties of portfolio's om aan te tonen dat je deze rol beheerst!
            </p>
          </div>
        </div>
      )}
    </div>
  )
}