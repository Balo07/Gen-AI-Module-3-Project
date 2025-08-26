import React from 'react'
import { Bars3Icon, MagnifyingGlassIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'

export default function Topbar({ onMenu, search, onSearch, dark, onToggleDark }) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="px-4 md:px-6 h-16 flex items-center gap-4">
        <button onClick={onMenu} className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Open menu">
          <Bars3Icon className="h-6 w-6" />
        </button>
        <h1 className="text-lg md:text-xl font-semibold">Dashboard</h1>

        <div className="flex-1" />
        <div className="relative w-64 max-w-[50vw] hidden sm:block">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-brand-primary outline-none"
            placeholder="Search orders..."
            aria-label="Search orders"
          />
        </div>

        <button
          onClick={onToggleDark}
          className="ml-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle dark mode"
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {dark ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
        </button>

        <div className="ml-2 h-8 w-8 rounded-full bg-brand-accent/20 border border-brand-accent/20" aria-label="Profile avatar placeholder" />
      </div>
    </header>
  )
}
