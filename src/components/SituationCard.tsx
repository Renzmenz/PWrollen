'use client'

import { Situation } from './RoleExplorer'

interface SituationCardProps {
  situation: Situation
  onSelect: (situation: Situation) => void
  isCompleted: boolean
  roleColor: string
}

export default function SituationCard({ 
  situation, 
  onSelect, 
  isCompleted, 
  roleColor 
}: SituationCardProps) {
  return (
    <div
      onClick={() => onSelect(situation)}
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden ${
        isCompleted ? 'ring-2 ring-green-400' : ''
      }`}
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${roleColor} p-4 text-white relative`}>
        <h3 className="text-lg font-bold pr-8">{situation.title}</h3>
        
        {/* Status indicator */}
        <div className="absolute top-4 right-4">
          {isCompleted ? (
            <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          ) : (
            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">•</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {situation.description}
        </p>
        
        {/* Scenario preview */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-gray-700 text-xs leading-relaxed">
            {situation.scenario.length > 120 
              ? `${situation.scenario.substring(0, 120)}...` 
              : situation.scenario
            }
          </p>
        </div>
        
        {/* Questions count */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-gray-500">
            {situation.questions.length} vragen
          </span>
          <span className="text-xs text-gray-500">
            {situation.tips.length} tips
          </span>
        </div>
        
        {/* Action button */}
        <button className={`w-full font-medium py-2 px-4 rounded-lg transition-colors duration-200 ${
          isCompleted 
            ? 'bg-green-100 hover:bg-green-200 text-green-800' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
        }`}>
          {isCompleted ? 'Bekijk opnieuw' : 'Start situatie'}
          <span className="ml-2">→</span>
        </button>
      </div>
    </div>
  )
}