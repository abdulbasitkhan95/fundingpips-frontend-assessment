### StockTracker - Real-time Stock Tracking Application

A modern, responsive stock tracking application built with Next.js 15 that allows users to search for stocks, view real-time price updates, analyze historical data, and manage a personalized watchlist.





## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architectural Decisions](#architectural-decisions)
- [How to Run the Project](#how-to-run-the-project)
- [Project Structure](#project-structure)
- [Trade-offs and Optimizations](#trade-offs-and-optimizations)
- [Future Improvements](#future-improvements)


## Features

- **Stock Search**: Search for stocks by name or ticker symbol with real-time suggestions
- **Real-time Price Updates**: View live stock price updates with visual indicators for price changes
- **Historical Data Analysis**: Interactive charts showing price trends across different time periods
- **Watchlist Management**: Add/remove stocks to a personalized watchlist for easy tracking
- **Market Overview**: View current market indices and sector performance
- **Responsive Design**: Fully responsive UI that works on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Theme support for user preference


## Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI**: React 19 with Server Components
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Zustand with persistence
- **Charts**: Recharts for interactive data visualization
- **TypeScript**: For type safety and better developer experience


## Architectural Decisions

### Server vs. Client Components

I've carefully separated server and client components to optimize performance and user experience:

- **Server Components**:

- Stock details page
- Historical data fetching
- Market overview
- Trending stocks list
- News feed


These components don't require client-side interactivity and benefit from server-side rendering for faster initial load and SEO.


- **Client Components**:

- Search bar with autocomplete
- Watchlist management
- Real-time price updates
- Interactive charts
- Theme switcher


These components require client-side interactivity and state management.




### State Management

I chose Zustand for state management because:

1. **Lightweight**: Minimal bundle size impact compared to Redux
2. **Simple API**: Easy to learn and use with minimal boilerplate
3. **React Hooks Integration**: Works seamlessly with React's hooks pattern
4. **Persistence**: Built-in support for localStorage persistence
5. **TypeScript Support**: Excellent type safety


The application uses Zustand to manage:

- Watchlist state
- Recent searches
- UI preferences


### Data Fetching Strategy

The application implements a hybrid data fetching approach:

1. **Server-side Data Fetching**:

1. Uses React's `cache` function to deduplicate requests
2. Implements server components for initial data loading
3. Provides SEO benefits for stock detail pages



2. **Client-side Data Fetching**:

1. Real-time price updates via polling
2. Search functionality with debounced queries
3. API routes for client-side data access



3. **Mock API Implementation**:

1. Simulated stock data
2. Realistic delay simulation for API calls
3. Structured to be easily replaced with real API integration





### UI/UX Design

The UI is designed with these principles:

1. **Clean and Minimal**: Focus on data presentation without clutter
2. **Responsive**: Works on all device sizes
3. **Accessible**: Follows WCAG guidelines for accessibility
4. **Consistent**: Uses shadcn/ui components for design consistency
5. **Performance**: Optimized for fast rendering and minimal layout shifts


## How to Run the Project

### Prerequisites

- Node.js 18.17 or later
- npm or yarn


### Installation

1. Clone the repository:

```shellscript
git clone https://github.com/yourusername/stock-tracker.git
cd stock-tracker
```


2. Install dependencies:

```shellscript
npm install
# or
yarn install
```


3. Run the development server:

```shellscript
npm run dev
# or
yarn dev
```


4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


### Build for Production

```shellscript
npm run build
npm start
# or
yarn build
yarn start
```

## Project Structure

```plaintext
stock-tracker/
├── app/                    # Next.js App Router
│   ├── api/                # API routes
│   ├── stock/[symbol]/     # Stock detail pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── market-overview.tsx # Market overview component
│   ├── price-chart.tsx     # Stock price chart
│   ├── search-bar.tsx      # Search functionality
│   ├── stock-card.tsx      # Stock card component
│   ├── stock-header.tsx    # Stock detail header
│   ├── stock-list.tsx      # List of stocks
│   ├── stock-news.tsx      # Stock news component
│   ├── stock-stats.tsx     # Stock statistics
│   ├── ui/                 # UI components (shadcn)
│   └── watchlist-section.tsx # Watchlist component
├── hooks/                  # Custom React hooks
│   ├── use-debounce.ts     # Debounce hook
│   ├── use-stock-store.ts  # Zustand store
│   └── use-toast.ts        # Toast notifications
├── lib/                    # Utility functions
│   ├── stock-api.ts        # Mock API functions
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Utility functions
├── providers/              # Context providers
│   └── stock-provider.tsx  # Stock context provider
├── public/                 # Static assets
├── .eslintrc.json         # ESLint configuration
├── next.config.js         # Next.js configuration
├── package.json           # Project dependencies
├── README.md              # Project documentation
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Trade-offs and Optimizations

### Trade-offs

1. **Mock API vs. Real API Integration**:

1. **Decision**: Used mock data instead of integrating with a real stock API
2. **Rationale**: Allows for consistent demo experience without API rate limits or keys
3. **Implication**: Not using real-time market data, but structured for easy replacement



2. **Client-side Polling vs. WebSockets**:

1. **Decision**: Simulated real-time updates with polling instead of WebSockets
2. **Rationale**: Simpler implementation
3. **Implication**: Less efficient for true real-time data but easier to implement



3. **Recharts vs. Lightweight-charts**:

1. **Decision**: Used Recharts instead of more specialized financial charting libraries
2. **Rationale**: Better TypeScript support, easier integration with React
3. **Implication**: Fewer specialized financial chart features but better developer experience



4. **No Authentication**:

1. **Decision**: Implemented watchlist without user authentication
2. **Rationale**: Simplified scope for the assessment
3. **Implication**: Watchlist is device-specific rather than user-specific





### Optimizations

1. **React Server Components**:

1. Used RSCs for data-fetching components to reduce client-side JavaScript
2. Improved initial page load performance and SEO



2. **Debounced Search**:

1. Implemented debouncing for search queries to reduce API calls
2. Improved user experience by preventing excessive requests



3. **Cached API Responses**:

1. Used React's `cache` function to deduplicate API requests
2. Reduced redundant data fetching for improved performance



4. **Optimistic UI Updates**:

1. Implemented immediate UI feedback for watchlist actions
2. Enhanced perceived performance for user interactions



5. **Code Splitting**:

1. Leveraged Next.js automatic code splitting
2. Reduced initial bundle size for faster page loads



6. **Responsive Images**:

1. Used Next.js Image component for optimized image loading
2. Improved performance metrics and user experience





## Future Improvements

With additional time, these enhancements could be implemented:

1. **Real API Integration**:

1. Connect to a real stock API like Alpha Vantage, Yahoo Finance, or Polygon.io
2. Implement proper error handling and rate limiting



2. **WebSocket Integration**:

1. Replace polling with WebSockets for true real-time updates
2. Improve efficiency and reduce unnecessary API calls



3. **Authentication**:

1. Add user authentication for personalized watchlists
2. Implement social login options for convenience



4. **Advanced Charts**:

1. Add technical indicators (MACD, RSI, etc.)
2. Implement drawing tools for trend lines and patterns



5. **Portfolio Tracking**:

1. Allow users to create virtual portfolios
2. Track performance over time with visualizations



6. **Alerts and Notifications**:

1. Set price alerts for watched stocks
2. Implement push notifications for significant price movements



7. **Testing**:

1. Add comprehensive unit and integration tests
2. Implement E2E testing with Cypress or Playwright



8. **Performance Monitoring**:

1. Add analytics and performance monitoring
2. Optimize based on real user metrics





---

This project was created as part of a frontend assessment for Funding Pips. It demonstrates modern Next.js 15 development practices with a focus on performance, user experience, and code quality.