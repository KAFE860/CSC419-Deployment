import { BarChart3, Users, Ticket as TicketIcon, TrendingUp, Target, Brain, ArrowUpRight } from 'lucide-react'

const Dashboard = ({ stats }) => {
  if (!stats) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block p-4 rounded-full bg-gray-100">
            <BarChart3 className="h-8 w-8 text-gray-400" />
          </div>
          <p className="mt-4 text-gray-500 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Tickets',
      value: stats.total_tickets,
      icon: TicketIcon,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      color: 'bg-blue-600',
    },
    {
      title: 'Pending',
      value: stats.by_status.pending,
      icon: Users,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop',
      color: 'bg-amber-500',
    },
    {
      title: 'In Progress',
      value: stats.by_status.in_progress,
      icon: TrendingUp,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      color: 'bg-teal-500',
    },
    {
      title: 'Resolved',
      value: stats.by_status.resolved,
      icon: BarChart3,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      color: 'bg-emerald-500',
    },
  ]

  const departmentColors = {
    'Billing': { bg: 'bg-pink-100', text: 'text-pink-700', gradient: 'from-pink-500 to-pink-600' },
    'Fiber-Optic Tech': { bg: 'bg-yellow-100', text: 'text-yellow-700', gradient: 'from-yellow-500 to-yellow-600' },
    'Mobile Network': { bg: 'bg-pink-200', text: 'text-pink-800', gradient: 'from-pink-400 to-pink-500' },
    'General Support': { bg: 'bg-gray-100', text: 'text-gray-700', gradient: 'from-gray-500 to-gray-600' },
    'Equipment/Installation': { bg: 'bg-yellow-200', text: 'text-yellow-800', gradient: 'from-yellow-400 to-yellow-500' },
  }

  const maxDeptCount = Math.max(...Object.values(stats.by_department), 1)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Overview of support ticket performance</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:bg-slate-700/50 transition-colors">
          <ArrowUpRight className="h-4 w-4 text-slate-300" />
          <span className="text-sm font-medium text-slate-300">View Reports</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div 
              key={stat.title} 
              className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 overflow-hidden hover:shadow-2xl hover:shadow-mustard-500/10 transition-all duration-300 hover:scale-105"
            >
              <div className="h-24 relative overflow-hidden">
                <img 
                  src={stat.image} 
                  alt={stat.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className={`absolute top-3 right-3 p-2 rounded-lg ${stat.color} shadow-lg`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="p-4 bg-slate-800/30">
                <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Tickets by Department</h2>
            <div className="flex items-center space-x-1 px-3 py-1 bg-pink-500/20 rounded-lg border border-pink-500/30">
              <Brain className="h-4 w-4 text-pink-400" />
              <span className="text-xs font-medium text-pink-400">Auto-Routed</span>
            </div>
          </div>
          <div className="space-y-4">
            {Object.entries(stats.by_department).map(([dept, count], index) => {
              const colors = departmentColors[dept]
              const percentage = (count / maxDeptCount) * 100
              return (
                <div key={dept} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
                      {dept}
                    </span>
                    <span className="text-lg font-semibold text-white">{count}</span>
                  </div>
                  <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full transition-all duration-500 shadow-lg`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Performance Metrics</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-slate-400">Routing Accuracy</p>
                <span className="text-lg font-semibold text-white">
                  {(stats.average_confidence * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full transition-all duration-500 shadow-lg"
                  style={{ width: `${stats.average_confidence * 100}%` }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { label: 'Resolved', value: stats.by_status.resolved, color: 'text-pink-400', bg: 'bg-pink-500/20', border: 'border-pink-500/30' },
                { label: 'In Progress', value: stats.by_status.in_progress, color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30' },
                { label: 'Pending', value: stats.by_status.pending, color: 'text-pink-300', bg: 'bg-pink-400/20', border: 'border-pink-400/30' },
              ].map((item, index) => (
                <div key={item.label} className={`p-4 rounded-xl ${item.bg} border ${item.border}`}>
                  <p className={`text-2xl font-bold ${item.color}`}>
                    {item.value}
                  </p>
                  <p className="text-xs font-medium text-slate-400 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
