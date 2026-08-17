import { useState } from 'react'
import { Send, X, ArrowRight, CheckCircle } from 'lucide-react'

const TicketForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    complaint_text: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.customer_name.trim() && formData.complaint_text.trim()) {
      onSubmit(formData)
      setFormData({ customer_name: '', complaint_text: '' })
    }
  }

  const sampleComplaints = [
    { text: 'My internet is extremely slow, I can barely load web pages', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=100&h=100&fit=crop', label: 'Slow Internet' },
    { text: 'I was charged twice on my bill this month', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop', label: 'Billing Issue' },
    { text: 'Mobile signal is very weak in my neighborhood', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100&h=100&fit=crop', label: 'Poor Signal' },
    { text: 'Fiber connection has been down for 2 hours', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=100&h=100&fit=crop', label: 'Outage' },
    { text: 'Need help setting up my new router', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop', label: 'Setup Help' },
  ]

  const departments = [
    { name: 'Billing', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=150&fit=crop' },
    { name: 'Fiber-Optic Tech', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=200&h=150&fit=crop' },
    { name: 'Mobile Network', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&h=150&fit=crop' },
    { name: 'General Support', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=150&fit=crop' },
    { name: 'Equipment/Installation', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=150&fit=crop' },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Create New Ticket</h1>
          <p className="text-slate-400 mt-1">Submit a customer support request</p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
        >
          <X className="h-5 w-5 text-slate-400" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-8 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-400">
                Customer Name
              </label>
              <input
                type="text"
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors text-white placeholder-slate-500"
                placeholder="Enter customer name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-400">
                Complaint Description
              </label>
              <textarea
                value={formData.complaint_text}
                onChange={(e) => setFormData({ ...formData, complaint_text: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors resize-none text-white placeholder-slate-500"
                placeholder="Describe the customer's issue in detail..."
                required
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-400">
                Quick Sample Complaints
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sampleComplaints.map((complaint) => (
                  <button
                    key={complaint.text}
                    type="button"
                    onClick={() => setFormData({ ...formData, complaint_text: complaint.text })}
                    className="flex items-center space-x-3 px-4 py-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-sm text-slate-300 hover:text-white transition-colors group border border-slate-600/50 hover:border-slate-500/50"
                  >
                    <img 
                      src={complaint.image} 
                      alt={complaint.label}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="font-medium">{complaint.label}</span>
                    <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg hover:from-pink-600 hover:to-yellow-600 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 font-medium"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Ticket
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border border-slate-600/50 rounded-lg hover:bg-slate-700/50 transition-colors font-medium text-slate-300 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
            <h3 className="font-semibold text-white mb-4">Routing Departments</h3>
            <div className="space-y-3">
              {departments.map((dept) => (
                <div key={dept.name} className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors border border-slate-600/30">
                  <img 
                    src={dept.image} 
                    alt={dept.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <span className="text-sm font-medium text-slate-300">{dept.name}</span>
                  <CheckCircle className="h-4 w-4 text-pink-400 ml-auto" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-500/20 to-yellow-500/20 backdrop-blur-xl rounded-xl border border-pink-500/30 p-6">
            <h3 className="font-semibold text-white mb-3">Smart Routing</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Our intelligent system automatically routes tickets to the appropriate department based on the complaint content, ensuring faster resolution times.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketForm
