'use client'

import { Role, CompletedExample } from './RoleExplorer'

interface ProgressTrackerProps {
  roles: Role[]
  completedExamples: CompletedExample[]
}

export default function ProgressTracker({ roles, completedExamples }: ProgressTrackerProps) {
  const totalSituations = roles.reduce((sum, role) => sum + role.situations.length, 0)
  const totalCompleted = completedExamples.length
  const overallProgress = totalSituations > 0 ? (totalCompleted / totalSituations) * 100 : 0

  const getRoleProgress = (roleId: string) => {
    const role = roles.find(r => r.id === roleId)
    if (!role) return 0
    
    const roleCompleted = completedExamples.filter(ex => ex.roleId === roleId).length
    return role.situations.length > 0 ? (roleCompleted / role.situations.length) * 100 : 0
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Jouw Voortgang</h2>
        <p className="text-gray-600">
          {totalCompleted} van {totalSituations} situaties voltooid
        </p>
      </div>

      {/* Overall Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold text-gray-800">Totale voortgang</span>
          <span className="text-2xl">
            {overallProgress === 100 ? '🏆' : overallProgress >= 75 ? '🌟' : overallProgress >= 50 ? '🚀' : '📈'}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-4 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
            style={{ width: `${overallProgress}%` }}
          >
            {overallProgress > 10 && (
              <span className="text-white text-xs font-bold">
                {Math.round(overallProgress)}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Role Progress - Updated for 5 roles */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {roles.map((role) => {
          const progress = getRoleProgress(role.id)
          const completed = completedExamples.filter(ex => ex.roleId === role.id).length
          
          return (
            <div key={role.id} className="text-center">
              <div className="text-2xl mb-2">{role.icon}</div>
              <h3 className="font-semibold text-gray-800 text-sm mb-2">{role.name}</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className={`bg-gradient-to-r ${role.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-600">
                {completed}/{role.situations.length}
              </span>
            </div>
          )
        })}
      </div>

      {/* Achievements */}
      {overallProgress > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4 text-center">Behaalde prestaties</h3>
          <div className="flex justify-center space-x-6">
            {overallProgress >= 20 && (
              <div className="text-center">
                <div className="text-2xl mb-1">🌱</div>
                <span className="text-xs text-gray-600">Eerste stappen</span>
              </div>
            )}
            {overallProgress >= 40 && (
              <div className="text-center">
                <div className="text-2xl mb-1">🚀</div>
                <span className="text-xs text-gray-600">Op weg</span>
              </div>
            )}
            {overallProgress >= 60 && (
              <div className="text-center">
                <div className="text-2xl mb-1">⭐</div>
                <span className="text-xs text-gray-600">Goed bezig</span>
              </div>
            )}
            {overallProgress >= 80 && (
              <div className="text-center">
                <div className="text-2xl mb-1">🌟</div>
                <span className="text-xs text-gray-600">Bijna klaar</span>
              </div>
            )}
            {overallProgress === 100 && (
              <div className="text-center">
                <div className="text-2xl mb-1">🏆</div>
                <span className="text-xs text-gray-600">Voltooid!</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}