import React, { useMemo, useState } from 'react'

export default function DataTable({ title, rows }) {
  const [sortKey, setSortKey] = useState('date')
  const [sortDir, setSortDir] = useState('desc')
  const [page, setPage] = useState(1)
  const pageSize = 10

  const sorted = useMemo(() => {
    const copy = [...rows]
    copy.sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (av === bv) return 0
      if (sortDir === 'asc') return av > bv ? 1 : -1
      return av < bv ? 1 : -1
    })
    return copy
  }, [rows, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const start = (page - 1) * pageSize
  const pageRows = sorted.slice(start, start + pageSize)

  function handleSort(key) {
    if (key === sortKey) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  return (
    <section className="rounded-xl bg-white dark:bg-gray-800 shadow-card border border-gray-100 dark:border-gray-700">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-base font-semibold">{title}</h2>
        <div className="text-sm text-gray-500">{rows.length} records</div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-300">
            <tr>
              <Th label="Order ID" onClick={() => handleSort('id')} active={sortKey === 'id'} dir={sortDir} />
              <Th label="Customer" onClick={() => handleSort('customer')} active={sortKey === 'customer'} dir={sortDir} />
              <Th label="Status" onClick={() => handleSort('status')} active={sortKey === 'status'} dir={sortDir} />
              <Th label="Amount" onClick={() => handleSort('amount')} active={sortKey === 'amount'} dir={sortDir} isRight />
              <Th label="Date" onClick={() => handleSort('date')} active={sortKey === 'date'} dir={sortDir} />
            </tr>
          </thead>
          <tbody className="[&>tr:hover]:bg-gray-50 dark:[&>tr:hover]:bg-gray-900/40">
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">No data found.</td>
              </tr>
            )}
            {pageRows.map((row) => (
              <tr key={row.id} className="border-t border-gray-100 dark:border-gray-700">
                <td className="px-4 py-3 whitespace-nowrap font-medium">#{row.id}</td>
                <td className="px-4 py-3 whitespace-nowrap">{row.customer}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    row.status === 'Paid' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
                    row.status === 'Refunded' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' :
                    'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">${row.amount.toLocaleString()}</td>
                <td className="px-4 py-3 whitespace-nowrap">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm">
        <div>Page <strong>{page}</strong> of <strong>{totalPages}</strong></div>
        <div className="space-x-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            disabled={page === 1}
          >Prev</button>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            disabled={page === totalPages}
          >Next</button>
        </div>
      </div>
    </section>
  )
}

function Th({ label, onClick, active, dir, isRight }) {
  return (
    <th
      onClick={onClick}
      className={`px-4 py-3 text-left select-none cursor-pointer ${isRight ? 'text-right' : ''}`}
      scope="col"
    >
      <span className={`inline-flex items-center gap-1 ${active ? 'text-brand-primary font-semibold' : ''}`}>
        {label}
        {active && (dir === 'asc' ? '▲' : '▼')}
      </span>
    </th>
  )
}
