import { Layout as LayoutIcon, Ticket, PlusCircle, BarChart3, Zap, Sparkles, Building2 } from 'lucide-react'

const Layout = ({ children, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'tickets', label: 'Tickets', icon: Ticket },
    { id: 'new', label: 'New Ticket', icon: PlusCircle },
  ]

  return (
    <div className="min-h-screen">
      <nav className="bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-700/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-xl blur-lg opacity-40"></div>
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-yellow-500 flex items-center justify-center shadow-xl">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Telecom<span className="text-pink-400">Pro</span>
                </h1>
                <p className="text-xs text-slate-400">Enterprise Support System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 bg-slate-800/50 rounded-xl p-1 border border-slate-700/50">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white shadow-lg'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

export default Layout
