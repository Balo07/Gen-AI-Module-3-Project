import React from 'react'
import { HomeIcon, ChartBarIcon, ShoppingCartIcon, UsersIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

const nav = [
  { name: 'Dashboard', icon: HomeIcon, current: true },
  { name: 'Reports',   icon: ChartBarIcon },
  { name: 'Orders',    icon: ShoppingCartIcon },
  { name: 'Customers', icon: UsersIcon },
  { name: 'Settings',  icon: Cog6ToothIcon },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 lg:hidden transition-opacity ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-4 transform transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'} lg:static`}
        aria-label="Sidebar navigation"
      >
        <div className="flex items-center gap-3 px-2">
          <img src="/logo.svg" className="h-7 w-7" alt="Logo" />
          <span className="text-lg font-semibold">Loritem Analytics</span> {/* BRANDING: app name */}
        </div>
        <nav className="flex-1">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.name}>
                <a
                  href="#"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition
                    ${item.current
                      ? 'bg-brand-primary/10 text-brand-primary dark:text-white dark:bg-brand-primary/20'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-xs text-gray-500 dark:text-gray-400 px-2">
          © <span className="font-medium">Loritem</span> {new Date().getFullYear()}
        </div>
      </aside>
    </>
  )
}
