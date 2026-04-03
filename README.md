# Finance Dashboard UI

This project is a clear, responsive, and interactive Finance Dashboard UI built to demonstrate frontend development skills. It focuses on the core user experience needed to track financial activity.

## Features

- **Dashboard Overview:** Displays high-level summary cards (Total Balance, Total Income, Total Expenses) along with two Recharts-based visualizations (Balance Trend History Area Chart, Category Spending Breakdown Pie Chart).
- **Transactions Section:** A table of transactions with search and filtering by transaction type (Income/Expense). 
- **Role-Based UI:** Using the toggle in the header, switch between "Viewer Mode" and "Admin Mode". Admin users gain the ability to add new transactions into the system and delete them, simulating light RBAC functionality.
- **Insights:** A derived insights view automatically calculates the highest spending category, average daily spend, largest single expense, and generic financial observations based on the current context array.
- **State Management & Persistence:** Handled securely via a dedicated `FinanceContext` holding the single source of truth for transactions, role, and theme state. Using `localStorage`, everything smoothly persists entirely on the client, reloading securely upon refresh.
- **Dark Mode:** A responsive and cleanly styled dark mode functionality leveraging global vanilla CSS variables for aesthetics.

## Tech Stack Overview

- **React & Vite:** Bootstrapped via Vite with React-TypeScript mapping for ultra-fast compilation and static type checking.
- **Vanilla Modern CSS:** Minimal third-party bloat. Complete reliance on pure CSS3 variables for seamless custom styling, ensuring high customizability, responsive fluid grids, layout adaptability, and dark-mode integration safely without overwriting logic.
- **Recharts for Dashboard:** An enterprise-ready diagrammatic plotting interface that translates categorical JSON objects natively into Area and Pie SVG projections smoothly.
- **Lucide React:** SVGs seamlessly utilized via minimal icons for rapid interface communication logic.

## Project Structure

```text
src
├── components
│   ├── Charts.tsx              # Recharts Area Chart & Pie Chart 
│   ├── DashboardOverview.tsx   # Dashboard main panel
│   ├── Header.tsx              # Header logic handling toggles
│   ├── Insights.tsx            # Context driven insight logic 
│   ├── Sidebar.tsx             # Interactive dashboard navigation tracker
│   ├── SummaryCards.tsx        # Income/Expense metric summaries
│   └── TransactionList.tsx     # Filterable list and Modal for Add/Delete Logic
├── context
│   └── FinanceContext.tsx      # Provider wrapping main App with localStorage hooks
├── data
│   └── mockData.ts             # Default mock initialization types and values
├── index.css                   # Single-source-of-truth style tokens
├── main.tsx                    # Setup configurations
└── App.tsx                     # Top level view orchestration
```

## Setup Instructions

### Prerequisites
- Node.js (>= 18.x)
- NPM or Yarn

### Installation

1. **Clone the repository and install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

3. **Build for production**
   ```bash
   npm run build
   ```

## Evaluation Criteria Highlights

1. **Design & Creativity:** Uses comprehensive CSS tokens via `:root` to unify a high-quality modern visual appeal and immediate toggleable contrast-perfect dark mode.
2. **Responsiveness:** Entire app flexes from a side-by-side modular desktop environment strictly into a linear vertical layout for mobile devices.
3. **State Management:** Abstracted effectively into a singular `FinanceProvider`. Changing or mutating elements on screen re-renders automatically with robust type guarantees using TypeScript logic loops.
4. **Resiliency:** Handles "no transactions" states, handles proper types for arbitrary input.

Thank you for viewing this frontend challenge submission! 
