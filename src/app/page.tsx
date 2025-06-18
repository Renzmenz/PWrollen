import RoleExplorer from '@/components/RoleExplorer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6 shadow-lg">
            <span className="text-3xl">🎯</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Professionele Rollen
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Ontdek en ontwikkel je professionele vaardigheden door interactieve situaties te verkennen
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-4 max-w-3xl mx-auto">
            <p className="text-gray-700 text-sm">
              💡 <strong>Hoe werkt het?</strong> Klik op een rol, verken verschillende situaties, 
              en verzamel voorbeelden die aantonen dat je de rol beheerst!
            </p>
          </div>
        </div>

        {/* Main App */}
        <RoleExplorer />
      </div>
    </div>
  )
}