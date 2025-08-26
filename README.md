# Loritem Analytics — React + TailwindCSS Dashboard

A **production-ready React dashboard** built with Vite, TailwindCSS, and Recharts. Features a complete order management interface with responsive design, dark mode, and full CRUD operations simulation.

## 🚀 Install & Run

```bash
# Clone and install dependencies
git clone <your-repo>
cd react-tailwind-dashboard
npm install

# Start development server
npm run dev
# Opens at http://localhost:5173

# Build for production
npm run build
npm run preview
```

### Alternative: Fresh Vite Setup
```bash
npm create vite@latest my-dashboard -- --template react
cd my-dashboard
npm install -D tailwindcss postcss autoprefixer @heroicons/react recharts
npx tailwindcss init -p
# Then copy the configuration files from this project
```

## 🎨 Customization Guide

### Colors & Typography
**File: `tailwind.config.js`**
```js
colors: {
  brand: {
    primary: '#3B82F6',    // Main brand color (buttons, links)
    accent: '#10B981',     // Success states, positive trends
    muted: '#6B7280'       // Secondary text, borders
  }
}
```

**File: `src/styles/tailwind.css`**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
/* Change font family in base layer */
```

**File: `index.html`**
- Update `<title>` tag for browser tab name
- Replace Inter font URL for different typography

### Logo & Branding
**File: `public/logo.svg`**
- Replace with your brand logo (recommended: 28x28px SVG)

**File: `src/components/Sidebar.jsx` (Lines 17-19)**
```jsx
<img src="/logo.svg" className="h-7 w-7" alt="Logo" />
<span className="text-lg font-semibold">Your App Name</span>
```

**File: `src/components/Sidebar.jsx` (Lines 41-43)**
```jsx
© <span className="font-medium">Your Company</span> {new Date().getFullYear()}
```

## 📊 Data Structure Modification

### Adding/Modifying Stat Cards
**File: `src/App.jsx` (Lines 44-49)**
```jsx
<StatCard title="Your Metric" value="$1,234" delta="+5.2%" trend="up" />
// trend: "up" | "down" | "neutral"
// delta: any string with % or units
```

### Modifying Table Columns
**File: `src/components/DataTable.jsx` (Lines 31-37)**

**Current Structure:**
```jsx
<Th label="Order ID" onClick={() => handleSort('id')} active={sortKey === 'id'} dir={sortDir} />
// Maps to data field: row.id
```

**To Add New Column:**
1. Add header in `<thead>`:
```jsx
<Th label="Your Column" onClick={() => handleSort('yourField')} active={sortKey === 'yourField'} dir={sortDir} />
```

2. Add corresponding cell in `<tbody>` (Lines 45-53):
```jsx
<td className="px-4 py-3 whitespace-nowrap">{row.yourField}</td>
```

3. Update `colSpan` in empty state (Line 40):
```jsx
<td colSpan={6}> {/* Increment for each new column */}
```

### Sample Data Structure
**File: `src/data/mockData.js`**

**Orders Array Schema:**
```js
{
  id: number,           // Unique identifier
  customer: string,     // Customer name
  status: string,       // "Paid" | "Pending" | "Refunded"
  amount: number,       // Numeric value for calculations
  date: string         // ISO date string "YYYY-MM-DD"
}
```

**Weekly Sales Schema:**
```js
{
  label: string,        // X-axis labels
  value: number        // Y-axis data points
}
```

**To Modify Data:**
- Replace `orders` array with your data structure
- Ensure field names match table column `handleSort()` calls
- Update `weeklySales` array for chart data
- Modify KPI calculations in `App.jsx` Lines 25-29

## 🔧 Extending Functionality

### API Integration
**Replace Mock Data (Recommended approach):**

1. **Create API hook (`src/hooks/useOrders.js`):**
```jsx
import { useState, useEffect } from 'react'

export function useOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data)
        setLoading(false)
      })
  }, [])

  return { orders, loading, refetch: () => setOrders([]) }
}
```

2. **Update App.jsx:**
```jsx
import { useOrders } from './hooks/useOrders'

// Replace: import { orders } from './data/mockData.js'
const { orders, loading } = useOrders()
```

### Authentication Guard
**Create `src/components/AuthGuard.jsx`:**
```jsx
export default function AuthGuard({ children }) {
  const isAuthenticated = localStorage.getItem('token')

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return children
}
```

### Adding More Charts
**In `src/components/ChartCard.jsx`:**
- Import different chart types: `BarChart`, `PieChart`, `AreaChart`
- Pass `chartType` prop to render conditionally
- Add multiple chart cards in `App.jsx` grid layout

### Routing (React Router)
```bash
npm install react-router-dom
```

**Wrap App in `src/main.jsx`:**
```jsx
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'

// Add routes for different dashboard sections
```

## 🎯 Key Features

- **📱 Responsive Design**: Mobile-first sidebar with overlay
- **🌙 Dark Mode**: System preference detection + manual toggle
- **🔍 Real-time Search**: Filters table data across all columns
- **📈 Interactive Charts**: Recharts with hover tooltips
- **⚡ Performance**: Optimized re-renders with useMemo
- **♿ Accessibility**: ARIA labels, semantic HTML, keyboard navigation
- **🎨 Design System**: Consistent spacing, typography, and color tokens

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DataTable.jsx   # Sortable, paginated table
│   ├── StatCard.jsx    # KPI metric cards
│   ├── ChartCard.jsx   # Chart wrapper component
│   ├── Sidebar.jsx     # Navigation sidebar
│   └── Topbar.jsx      # Header with search/settings
├── data/
│   └── mockData.js     # Sample data (replace with API)
├── styles/
│   └── tailwind.css    # Global styles and fonts
└── App.jsx             # Main layout and state management
```

## 🚨 Important Notes

- **Data Shape Dependency**: Table columns are hardcoded to specific field names. Update both `DataTable.jsx` headers AND data structure together.
- **Status Styling**: Status badges have hardcoded color logic in `DataTable.jsx` Lines 46-50. Modify for your status values.
- **Local Storage**: Theme preference persists across browser sessions
- **Search Performance**: Current search is client-side only. For large datasets, implement server-side filtering.

## 🐛 Troubleshooting

**Chart not rendering?**
- Ensure data array has `label` and `value` properties
- Check console for Recharts warnings

**Table columns misaligned?**
- Verify `colSpan` matches actual column count
- Check that all rows have consistent field names

**Dark mode not working?**
- Confirm `dark` class is added to `<html>` element
- Verify Tailwind `darkMode: 'class'` in config