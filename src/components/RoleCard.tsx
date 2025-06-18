'use client'

import { Role } from './RoleExplorer'

interface RoleCardProps {
  role: Role
  onSelect: (role: Role) => void
  completedCount: number
  totalSituations: number
}

export default function RoleCard({ role, onSelect, completedCount, totalSituations }: RoleCardProps) {
  const progressPercentage = totalSituations > 0 ? (completedCount / totalSituations) * 100 : 0
  
  return (
    <div
      onClick={() => onSelect(role)}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden group"
    >
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${role.color} p-6 text-white relative`}>
        <div className="text-4xl mb-2">{role.icon}</div>
        <h3 className="text-xl font-bold">{role.name}</h3>
        
        {/* Progress indicator */}
        <div className="absolute top-4 right-4">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold">
              {completedCount}/{totalSituations}
            </span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {role.description}
        </p>
        
        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-500">Voortgang</span>
            <span className="text-xs font-medium text-gray-500">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`bg-gradient-to-r ${role.color} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        {/* Action button */}
        <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200 group-hover:bg-gray-200">
          {completedCount === 0 ? 'Begin verkenning' : 'Ga verder'}
          <span className="ml-2">→</span>
        </button>
      </div>
    </div>
  )
}