# Real-time Funding Pips

A modern, responsive stock tracking application built with Next.js 15, React, and Tailwind CSS. This application allows users to search for stocks, view detailed information, track price history, and manage a personal watchlist.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture Decisions](#architecture-decisions)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Trade-offs and Optimizations](#trade-offs-and-optimizations)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)

## Features

- **Stock Search**: Search for stocks by symbol or company name
- **Detailed Stock Information**: View comprehensive stock details including price, market cap, P/E ratio, and more
- **Interactive Price Charts**: Visualize stock price history with customizable time ranges
- **Personalized Watchlist**: Add and remove stocks from your watchlist for easy tracking
- **Trending Stocks**: Discover market movers and trending stocks
- **Latest News**: Stay updated with the latest news related to specific stocks
- **Responsive Design**: Optimized for all device sizes from mobile to desktop

## Technology Stack

- **Frontend Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **UI Library**: [React 18](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) for global state
- **Data Visualization**: [Recharts](https://recharts.org/) for interactive charts
- **Icons**: [Lucide React](https://lucide.dev/) for beautiful, consistent icons
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/) for enhanced developer experience
- **Deployment**: Configured for [Netlify](https://www.netlify.com/)

## Architecture Decisions

### App Router vs Pages Router

We chose Next.js 15's App Router for its improved performance, enhanced routing capabilities, and better support for React Server Components. This allows us to:

- Implement a more intuitive file-based routing system
- Leverage React Server Components for improved performance
- Utilize streaming and suspense for better loading states
- Implement more efficient data fetching patterns

### Server Components vs Client Components

We strategically use both Server and Client Components:

- **Server Components** for data fetching and static content, reducing JavaScript sent to the client
- **Client Components** for interactive elements that require client-side state or event handling
- Clear separation with 'use client' directive to maintain optimal performance

### State Management with Zustand

We chose Zustand over other state management solutions because:

- It's lightweight with minimal boilerplate
- It provides a simple API that works well with React hooks
- It includes built-in persistence via middleware
- It has excellent TypeScript support

### Mock Data Implementation

We implemented a comprehensive mock data system that:

- Simulates real API responses without external dependencies
- Provides consistent data structures for development
- Allows for easy transition to real APIs in the future
- Includes realistic price fluctuations and trending calculations

### Responsive Design Strategy

Our responsive design approach includes:

- Mobile-first development using Tailwind's responsive classes
- Custom components optimized for different screen sizes
- Conditional rendering for optimal UX across devices
- Performance optimizations for mobile networks

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abdulbasitkhan95/fundingpips-frontend-assessment
   cd fundingpips-frontend-assessment
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
fundingpips-frontend-assessment/
├── app/                                # Next.js App Router
│   ├── layout.tsx                      # Root layout component
│   ├── page.tsx                        # Home page
│   ├── globals.css                     # Global styles
│   ├── not-found.tsx                   # 404 page
│   └── stocks/                         # Stock-related pages
│       ├── [symbol]/                   # Dynamic stock detail pages
│       │   ├── page.tsx                # Stock detail page
│       │   └── not-found.tsx           # Stock not found page
│       └── not-found.tsx               # Stock not found page
├── components/                         # Reusable React components
│   ├── ui/                             # UI components (shadcn/ui)
│   │   ├── badge.tsx                   # Badge component
│   │   ├── button.tsx                  # Button component
│   │   ├── card.tsx                    # Card component
│   │   ├── dialog.tsx                  # Dialog component
│   ├── price-chart.tsx                 # Price chart component
│   ├── simple-mobile-filter.tsx        # Mobile filter component
│   ├── simple-notification.tsx         # Notification component
│   ├── simple-stock-menu.tsx           # Stock menu component
│   ├── stock-header.tsx                # Stock header component
│   ├── stock-news.tsx                  # Stock news component
│   ├── stock-search.tsx                # Stock search component
│   ├── stock-stats.tsx                 # Stock statistics component
│   ├── theme-provider.tsx              # Theme provider component
│   ├── trending-stocks.tsx             # Trending stocks component
│   └── watchlist-section.tsx           # Watchlist component
├── hooks/                              # Custom React hooks
│   ├── use-mobile.tsx                  # Mobile detection hook
│   ├── use-stock-search.ts             # Stock search hook
├── lib/                                # Utility functions and types
│   ├── stock-api.ts                    # Mock API functions
│   ├── types.ts                        # TypeScript type definitions
│   └── utils.ts                        # Utility functions
├── public/                             # Static assets
│   └── _redirects                      # Netlify redirects file
├── store/                              # Zustand store
│   └── watchlist-store.ts              # Watchlist state management
├── .npmrc                              # NPM configuration
├── middleware.ts                       # Next.js middleware
├── next.config.js                      # Next.js configuration
├── netlify.toml                        # Netlify configuration
├── package.json                        # Project dependencies and scripts
├── postcss.config.js                   # PostCSS configuration
├── PROJECT_STRUCTURE.md                # This file
├── README.md                           # Project documentation
├── tailwind.config.js                  # Tailwind CSS configuration
├── tsconfig.json                       # TypeScript configuration
└── vercel.json                         # Vercel configuration
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