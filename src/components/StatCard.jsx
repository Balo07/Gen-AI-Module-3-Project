import React from 'react'
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid'

export default function StatCard({ title, value, delta, trend = 'up' }) {
  const Up = ArrowTrendingUpIcon
  const Down = ArrowTrendingDownIcon
  const TrendIcon = trend === 'down' ? Down : Up
  const deltaColor = trend === 'down' ? 'text-red-600' : 'text-emerald-600'
  const badgeBg = trend === 'down' ? 'bg-red-50 dark:bg-red-900/30' : 'bg-emerald-50 dark:bg-emerald-900/30'

  return (
    <div className="rounded-xl bg-white dark:bg-gray-800 shadow-card p-4 border border-gray-100 dark:border-gray-700">
      <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
      <div className="mt-2 flex items-end justify-between">
        <div className="text-2xl font-semibold">{value}</div>
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs ${deltaColor} ${badgeBg}`} aria-live="polite">
          <TrendIcon className="h-4 w-4" />
          {delta}
        </span>
      </div>
    </div>
  )
}
