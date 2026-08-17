import { RefreshCw, Trash2, Clock, CheckCircle, AlertCircle, Filter, ArrowUpRight, TrendingUp, User } from 'lucide-react'

const TicketList = ({ tickets, filter, setFilter, onUpdateStatus, onDeleteTicket, onRefresh }) => {
  const statusColors = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', gradient: 'from-yellow-500 to-yellow-600' },
    in_progress: { bg: 'bg-pink-100', text: 'text-pink-700', gradient: 'from-pink-500 to-pink-600' },
    resolved: { bg: 'bg-pink-200', text: 'text-pink-800', gradient: 'from-pink-400 to-pink-500' },
  }

  const statusIcons = {
    pending: Clock,
    in_progress: AlertCircle,
    resolved: CheckCircle,
  }

  const priorityConfig = {
    high: { color: 'border-red-500', bg: 'bg-red-50', text: 'text-red-700', icon: '🔥' },
    medium: { color: 'border-amber-500', bg: 'bg-amber-50', text: 'text-amber-700', icon: '⚡' },
    low: { color: 'border-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700', icon: '✓' },
  }

  const departmentImages = {
    'Billing': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=200&fit=crop',
    'Fiber-Optic Tech': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=200&h=200&fit=crop',
    'Mobile Network': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&h=200&fit=crop',
    'General Support': 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop',
    'Equipment/Installation': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop',
  }

  const getPriorityLevel = (score) => {
    if (score >= 0.7) return 'high'
    if (score >= 0.4) return 'medium'
    return 'low'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Support Tickets</h1>
          <p className="text-slate-400 mt-1">Manage and prioritize customer requests</p>
        </div>
        <button
          onClick={onRefresh}
          className="flex items-center px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:bg-slate-700/50 transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-2 text-slate-300" />
          <span className="text-slate-300">Refresh</span>
        </button>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="h-5 w-5 text-slate-400" />
          <h3 className="font-semibold text-white">Filter Tickets</h3>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-400 mb-2">Department</label>
            <div className="relative">
              <select
                value={filter.department}
                onChange={(e) => setFilter({ ...filter, department: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none cursor-pointer hover:border-slate-600 transition-colors text-white"
              >
                <option value="">All Departments</option>
                <option value="Billing">Billing</option>
                <option value="Fiber-Optic Tech">Fiber-Optic Tech</option>
                <option value="Mobile Network">Mobile Network</option>
                <option value="General Support">General Support</option>
                <option value="Equipment/Installation">Equipment/Installation</option>
              </select>
              <ArrowUpRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none rotate-90" />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-400 mb-2">Status</label>
            <div className="relative">
              <select
                value={filter.status}
                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none cursor-pointer hover:border-slate-600 transition-colors text-white"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              <ArrowUpRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none rotate-90" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {tickets.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-12 text-center">
            <div className="inline-block p-4 rounded-full bg-slate-700/50 mb-4">
              <Filter className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No tickets found</h3>
            <p className="text-slate-400">Try adjusting your filters or create a new ticket</p>
          </div>
        ) : (
          tickets.map((ticket, index) => {
            const StatusIcon = statusIcons[ticket.status] || Clock
            const priorityLevel = getPriorityLevel(ticket.priority_score)
            const priority = priorityConfig[priorityLevel]
            const deptImage = departmentImages[ticket.predicted_department] || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop'
            
            return (
              <div
                key={ticket.id}
                className={`bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300 overflow-hidden hover:scale-[1.01]`}
              >
                <div className="flex">
                  <div className="w-48 flex-shrink-0 relative">
                    <img 
                      src={deptImage} 
                      alt={ticket.predicted_department}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                    <div className={`absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-semibold ${priority.bg} ${priority.text} border ${priority.border}`}>
                      {priorityLevel.toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-yellow-500 flex items-center justify-center shadow-lg">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {ticket.customer_name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className={`px-2 py-0.5 rounded-md text-xs font-medium ${statusColors[ticket.status].bg} ${statusColors[ticket.status].text} flex items-center`}
                              >
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {ticket.status.replace('_', ' ')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-slate-300 mb-4 leading-relaxed">{ticket.complaint_text}</p>
                        <div className="flex flex-wrap gap-2">
                          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-pink-500/20 rounded-md border border-pink-500/30">
                            <span className="text-sm font-medium text-pink-400">{ticket.predicted_department}</span>
                          </div>
                          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-yellow-500/20 rounded-md border border-yellow-500/30">
                            <TrendingUp className="h-3.5 w-3.5 text-yellow-400" />
                            <span className="text-sm font-medium text-yellow-400">{(ticket.confidence_score * 100).toFixed(0)}% confidence</span>
                          </div>
                          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-700/50 rounded-md border border-slate-600/50">
                            <Clock className="h-3.5 w-3.5 text-slate-400" />
                            <span className="text-sm font-medium text-slate-400">
                              {new Date(ticket.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <div className="relative">
                          <select
                            value={ticket.status}
                            onChange={(e) => onUpdateStatus(ticket.id, e.target.value)}
                            className="px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none cursor-pointer hover:border-slate-600 transition-colors pr-8 text-white"
                          >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                          </select>
                          <ArrowUpRight className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400 pointer-events-none rotate-90" />
                        </div>
                        <button
                          onClick={() => onDeleteTicket(ticket.id)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                          title="Delete ticket"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default TicketList
