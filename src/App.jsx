import React, { useEffect, useMemo, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import StatCard from './components/StatCard.jsx'
import DataTable from './components/DataTable.jsx'
import ChartCard from './components/ChartCard.jsx'
import { orders, weeklySales } from './data/mockData.js'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [dark, setDark] = useState(true)

  // Persist theme
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      const isDark = saved === 'dark'
      setDark(isDark)
      document.documentElement.classList.toggle('dark', isDark)
    } else {
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return orders
    return orders.filter(o =>
      String(o.id).toLowerCase().includes(q) ||
      o.customer.toLowerCase().includes(q) ||
      o.status.toLowerCase().includes(q) ||
      String(o.amount).toLowerCase().includes(q) ||
      o.date.toLowerCase().includes(q)
    )
  }, [search])

  // Basic KPI rollups
  const totalSales = useMemo(() => filteredOrders.reduce((s, o) => s + o.amount, 0), [filteredOrders])
  const activeUsers = 1287 // placeholder
  const conversion = 4.7    // placeholder
  const uptime = 99.96      // placeholder

  return (
    <div className="min-h-screen flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <Topbar
          onMenu={() => setSidebarOpen(true)}
          search={search}
          onSearch={setSearch}
          dark={dark}
          onToggleDark={() => setDark(d => !d)}
        />

        <main className="p-4 md:p-6 space-y-6">
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Sales" value={totalSales.toLocaleString(undefined, { style: 'currency', currency: 'USD' })} delta="+8.2%" trend="up" />
            <StatCard title="Active Users" value={activeUsers.toLocaleString()} delta="+1.4%" trend="up" />
            <StatCard title="Conversion" value={conversion + '%'} delta="-0.3%" trend="down" />
            <StatCard title="Uptime" value={uptime + '%'} delta="+0.02%" trend="up" />
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <ChartCard className="xl:col-span-1" title="Weekly Sales" data={weeklySales} />
            <div className="xl:col-span-2">
              <DataTable title="Recent Orders" rows={filteredOrders} />
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
