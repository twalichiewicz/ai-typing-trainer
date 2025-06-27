// AI Typing Trainer Scenarios
const SCENARIOS = [
    {
        id: 1,
        title: "React Component Creation",
        difficulty: "beginner",
        context: "You're building a React application and need a reusable UI component for user actions.",
        goal: "Create a button component with multiple variants and proper TypeScript support.",
        badExample: "Make a button component",
        goodExample: "Create a React button component with primary/secondary/outline variants, small/medium/large sizes, disabled state, loading state with spinner, and TypeScript interface. Should accept children, onClick, className, and be accessible with proper ARIA attributes.",
        keywords: {
            specificity: ["React", "TypeScript", "component", "button", "variants", "primary", "secondary", "outline", "sizes", "small", "medium", "large", "disabled", "loading", "spinner", "interface", "props"],
            context: ["building", "application", "reusable", "UI", "user actions"],
            constraints: ["accessible", "ARIA", "TypeScript", "interface"],
            observability: ["variants", "states", "sizes", "should accept", "proper"]
        },
        tips: [
            "Specify the exact variants needed (primary, secondary, outline)",
            "Include all states (disabled, loading, hover)",
            "Mention TypeScript and prop interfaces",
            "Consider accessibility requirements"
        ]
    },
    {
        id: 2,
        title: "CSS Layout Debugging",
        difficulty: "intermediate",
        context: "Your flexbox layout isn't working as expected in a production website.",
        goal: "Identify and fix vertical alignment issues in a flexbox container.",
        badExample: "My layout is broken, fix it",
        goodExample: "In my flexbox container (.header-nav), child items are not centering vertically despite having `display: flex` and `align-items: center`. The container is 60px high, children stick to the top. Expected: items centered vertically. Actual: items aligned to top. Here's the CSS: .header-nav { display: flex; align-items: center; height: 60px; }",
        keywords: {
            specificity: ["flexbox", "container", "align-items", "center", "60px", "height", "display: flex", ".header-nav", "CSS"],
            context: ["production", "website", "not working", "expected"],
            constraints: ["vertical", "centering", "container height"],
            observability: ["Expected:", "Actual:", "stick to top", "centered vertically"]
        },
        tips: [
            "Include the actual CSS code causing issues",
            "Describe what you expect vs what you see",
            "Mention specific CSS properties involved",
            "Include element dimensions and constraints"
        ]
    },
    {
        id: 3,
        title: "API Integration",
        difficulty: "intermediate",
        context: "You need to integrate a REST API for user authentication in a Next.js application.",
        goal: "Implement secure login flow with proper error handling and session management.",
        badExample: "Help me with API integration",
        goodExample: "Implement user login in Next.js 13 using REST API endpoint POST /api/auth/login. Need: form validation (email/password), loading states, error handling for 400/401/500 responses, secure session storage, redirect to dashboard on success, remember me functionality. Using React Hook Form and NextAuth.js. Must handle network timeouts and show user-friendly error messages.",
        keywords: {
            specificity: ["Next.js 13", "REST API", "POST /api/auth/login", "React Hook Form", "NextAuth.js", "400/401/500", "session storage"],
            context: ["user authentication", "Next.js application", "login flow"],
            constraints: ["secure", "network timeouts", "user-friendly", "form validation"],
            observability: ["loading states", "error handling", "redirect to dashboard", "show error messages"]
        },
        tips: [
            "Specify the exact API endpoint and method",
            "List all the states that need handling (loading, error, success)",
            "Mention specific libraries or frameworks being used",
            "Include security and UX requirements"
        ]
    },
    {
        id: 4,
        title: "Database Query Optimization",
        difficulty: "advanced",
        context: "Your PostgreSQL query is timing out on a table with 2M records in production.",
        goal: "Optimize the query for better performance while maintaining data accuracy.",
        badExample: "My database query is slow",
        goodExample: "PostgreSQL query timing out after 30s on users table (2M records). Query: SELECT u.id, u.name, COUNT(o.id) as order_count FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.created_at > '2023-01-01' GROUP BY u.id, u.name ORDER BY order_count DESC LIMIT 100. Need: sub-5s execution, maintain accuracy, production-safe indexes. Current explain shows seq scan on users table. Database: PostgreSQL 14, 16GB RAM.",
        keywords: {
            specificity: ["PostgreSQL", "2M records", "30s timeout", "users table", "orders table", "LEFT JOIN", "GROUP BY", "ORDER BY", "LIMIT 100", "seq scan", "PostgreSQL 14", "16GB RAM"],
            context: ["production", "timing out", "2M records"],
            constraints: ["sub-5s execution", "maintain accuracy", "production-safe"],
            observability: ["timing out", "30s", "sub-5s", "seq scan", "explain shows"]
        },
        tips: [
            "Include the exact query causing issues",
            "Specify database version and hardware constraints",
            "Show query execution plan details",
            "Define performance requirements clearly"
        ]
    },
    {
        id: 5,
        title: "Mobile Responsive Design",
        difficulty: "beginner",
        context: "Your website layout breaks on mobile devices below 768px width.",
        goal: "Make the layout responsive and mobile-friendly across all screen sizes.",
        badExample: "Make my site mobile responsive",
        goodExample: "Fix responsive layout for screens <768px. Current issues: 3-column grid collapses poorly, navigation menu overlaps content, buttons too small for touch targets (currently 32px, need 44px minimum). Need: single-column layout on mobile, hamburger menu, touch-friendly buttons, readable text (16px minimum). Testing on iPhone 12 (390px) and Galaxy S21 (360px). Using CSS Grid and Flexbox.",
        keywords: {
            specificity: ["768px", "3-column grid", "32px buttons", "44px minimum", "iPhone 12", "390px", "Galaxy S21", "360px", "CSS Grid", "Flexbox", "16px minimum"],
            context: ["mobile devices", "layout breaks", "below 768px"],
            constraints: ["touch-friendly", "readable text", "single-column", "hamburger menu"],
            observability: ["collapses poorly", "overlaps content", "too small", "minimum sizes"]
        },
        tips: [
            "Specify exact breakpoints and device dimensions",
            "List specific layout issues you're seeing",
            "Include touch target size requirements",
            "Mention which CSS techniques you're using"
        ]
    },
    {
        id: 6,
        title: "Performance Optimization",
        difficulty: "advanced",
        context: "Your React app's initial page load is taking 8+ seconds on 3G networks.",
        goal: "Reduce initial load time to under 3 seconds while maintaining functionality.",
        badExample: "My app loads slowly",
        goodExample: "React app initial load time is 8.2s on 3G (Chrome DevTools throttling). Bundle size: 2.8MB. Issues: importing entire lodash library, large images not optimized, no code splitting. Need: <3s load time on 3G, tree shaking for lodash, lazy loading for routes, image optimization (WebP/AVIF), critical CSS inlining. Using Webpack 5, React 18, hosted on Vercel. Lighthouse score currently 32/100 for performance.",
        keywords: {
            specificity: ["8.2s", "3G", "2.8MB", "lodash", "Webpack 5", "React 18", "Vercel", "Lighthouse", "32/100", "WebP/AVIF"],
            context: ["React app", "initial page load", "3G networks"],
            constraints: ["<3s load time", "3G", "maintain functionality"],
            observability: ["8+ seconds", "<3 seconds", "bundle size", "Lighthouse score"]
        },
        tips: [
            "Include specific timing measurements and tools used",
            "List exact bundle sizes and bottlenecks",
            "Mention target performance metrics",
            "Specify hosting platform and build tools"
        ]
    },
    {
        id: 7,
        title: "Form Validation",
        difficulty: "intermediate",
        context: "Building a complex multi-step form with real-time validation in Vue.js.",
        goal: "Implement comprehensive validation with good UX and accessibility.",
        badExample: "Add form validation",
        goodExample: "Create multi-step form validation in Vue 3 Composition API. 3 steps: Personal Info (name, email, phone), Address (street, city, postal code), Payment (card number, expiry, CVV). Need: real-time validation, error messages below fields, step progress indicator, prevent advance with errors, save progress in localStorage, accessibility with screen readers. Using Vuelidate, custom regex patterns, and WAI-ARIA guidelines.",
        keywords: {
            specificity: ["Vue 3", "Composition API", "3 steps", "name, email, phone", "street, city, postal code", "card number, expiry, CVV", "Vuelidate", "localStorage", "WAI-ARIA"],
            context: ["multi-step form", "Vue.js", "complex"],
            constraints: ["real-time", "prevent advance", "accessibility", "screen readers"],
            observability: ["error messages below fields", "progress indicator", "save progress"]
        },
        tips: [
            "Break down each step and its required fields",
            "Specify validation timing (real-time, on submit, etc.)",
            "Include accessibility requirements",
            "Mention specific validation libraries"
        ]
    },
    {
        id: 8,
        title: "Testing Strategy",
        difficulty: "advanced",
        context: "Your team needs a comprehensive testing strategy for a large-scale application.",
        goal: "Design a testing pyramid with appropriate tools and coverage targets.",
        badExample: "Help with testing setup",
        goodExample: "Design testing strategy for Node.js/React monorepo (50+ components, 20+ API endpoints). Need: unit tests (Jest, 80% coverage), integration tests (React Testing Library), E2E tests (Playwright, critical user journeys), API tests (Supertest). CI/CD: run unit/integration on PR, E2E on staging deployment. Test data management, mocking external services, parallel test execution. Target: <5min test suite, 95% reliability, clear failure reporting.",
        keywords: {
            specificity: ["Node.js/React", "monorepo", "50+ components", "20+ API endpoints", "Jest", "80% coverage", "React Testing Library", "Playwright", "Supertest", "<5min", "95% reliability"],
            context: ["large-scale application", "comprehensive testing strategy"],
            constraints: ["80% coverage", "95% reliability", "5min test suite", "parallel execution"],
            observability: ["coverage targets", "clear failure reporting", "test suite timing"]
        },
        tips: [
            "Specify the scale and tech stack clearly",
            "Include specific testing tools and frameworks",
            "Set measurable targets for coverage and performance",
            "Consider CI/CD integration requirements"
        ]
    },
    {
        id: 9,
        title: "State Management",
        difficulty: "intermediate",
        context: "Managing complex application state across multiple components is becoming unwieldy.",
        goal: "Implement a clean state management solution with proper data flow.",
        badExample: "Fix my state management",
        goodExample: "Implement Redux Toolkit for React app with 15+ components sharing user data, shopping cart (add/remove/quantity), and API loading states. Current issue: prop drilling 4 levels deep, inconsistent state updates. Need: centralized store, async thunks for API calls, optimistic updates for cart, undo/redo for cart actions, persist cart to localStorage, DevTools integration. Components: UserProfile, CartPage, ProductList, Checkout.",
        keywords: {
            specificity: ["Redux Toolkit", "15+ components", "shopping cart", "4 levels deep", "async thunks", "localStorage", "DevTools", "UserProfile, CartPage, ProductList, Checkout"],
            context: ["complex application state", "multiple components", "unwieldy"],
            constraints: ["centralized store", "optimistic updates", "undo/redo", "persist"],
            observability: ["prop drilling", "inconsistent updates", "add/remove/quantity"]
        },
        tips: [
            "Describe the specific state management challenges",
            "List the exact data types that need management",
            "Include performance and UX requirements",
            "Mention specific components involved"
        ]
    },
    {
        id: 10,
        title: "Security Implementation",
        difficulty: "advanced",
        context: "Implementing authentication and authorization for a financial application.",
        goal: "Create a secure system that meets compliance requirements and industry standards.",
        badExample: "Add security to my app",
        goodExample: "Implement authentication/authorization for banking app (PCI DSS compliance required). Need: JWT tokens with refresh mechanism (15min access, 7-day refresh), role-based permissions (customer/teller/manager), MFA with TOTP, session management, rate limiting (5 failed attempts = 15min lockout), audit logging, HTTPS everywhere, CSP headers. Using Node.js/Express, Redis for sessions, bcrypt for passwords. Must handle concurrent sessions and graceful token expiry.",
        keywords: {
            specificity: ["banking app", "PCI DSS", "JWT tokens", "15min access", "7-day refresh", "TOTP", "5 failed attempts", "15min lockout", "Node.js/Express", "Redis", "bcrypt", "CSP headers"],
            context: ["financial application", "authentication and authorization"],
            constraints: ["PCI DSS compliance", "industry standards", "HTTPS everywhere", "rate limiting"],
            observability: ["audit logging", "concurrent sessions", "graceful token expiry"]
        },
        tips: [
            "Specify exact compliance requirements",
            "Include precise security parameters (timeouts, attempt limits)",
            "Mention specific security technologies and protocols",
            "Consider edge cases and failure scenarios"
        ]
    }
];

// Scoring weights for different aspects
const SCORING_WEIGHTS = {
    specificity: 0.3,
    context: 0.25,
    constraints: 0.25,
    observability: 0.2
};

// Grade thresholds
const GRADE_THRESHOLDS = {
    A: 90,
    B: 80,
    C: 70,
    D: 60,
    F: 0
};