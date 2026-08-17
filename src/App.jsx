import { useState, useEffect } from 'react'
import { Layout, TicketList, TicketForm, Dashboard } from './components'
import axios from 'axios'

function App() {
  const [tickets, setTickets] = useState([])
  const [stats, setStats] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [filter, setFilter] = useState({ department: '', status: '' })

  useEffect(() => {
    fetchTickets()
    fetchStats()
  }, [])

  const fetchTickets = async () => {
    try {
      const params = new URLSearchParams()
      if (filter.department) params.append('department', filter.department)
      if (filter.status) params.append('status', filter.status)
      
      const response = await axios.get(`/api/tickets?${params}`)
      setTickets(response.data)
    } catch (error) {
      console.error('Error fetching tickets:', error)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/stats/dashboard')
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleCreateTicket = async (ticketData) => {
    try {
      await axios.post('/api/tickets', ticketData)
      fetchTickets()
      fetchStats()
      setActiveTab('tickets')
    } catch (error) {
      console.error('Error creating ticket:', error)
    }
  }

  const handleUpdateStatus = async (ticketId, status) => {
    try {
      await axios.put(`/api/tickets/${ticketId}/status?status=${status}`)
      fetchTickets()
      fetchStats()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleDeleteTicket = async (ticketId) => {
    try {
      await axios.delete(`/api/tickets/${ticketId}`)
      fetchTickets()
      fetchStats()
    } catch (error) {
      console.error('Error deleting ticket:', error)
    }
  }

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'dashboard' && <Dashboard stats={stats} />}
      {activeTab === 'tickets' && (
        <TicketList
          tickets={tickets}
          filter={filter}
          setFilter={setFilter}
          onUpdateStatus={handleUpdateStatus}
          onDeleteTicket={handleDeleteTicket}
          onRefresh={fetchTickets}
        />
      )}
      {activeTab === 'new' && (
        <TicketForm onSubmit={handleCreateTicket} onCancel={() => setActiveTab('tickets')} />
      )}
    </Layout>
  )
}

export default App
