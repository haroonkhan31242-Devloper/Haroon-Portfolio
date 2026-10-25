/**
 * Central Portfolio Configuration & Content Store for Haroon Khan
 * Full-Stack MERN Developer
 * 
 * Instructions for replacing image URLs, social links, or project information:
 * - Update `PERSONAL_INFO` to modify name, contact, or freelance URLs.
 * - Update `PORTFOLIO_IMAGES` to swap out any temporary photos with your own local assets or hosted URLs.
 * - All components consume data from this single source of truth.
 */

export interface ProjectRoleFlowStep {
  stepNumber: number;
  actor: 'Admin' | 'Owner' | 'Tenant' | 'System';
  action: string;
  description: string;
}

export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  featured: boolean;
  category: 'Full-Stack MERN' | 'Frontend' | 'Backend & API';
  image: string;
  imageAlt: string;
  screenshots: string[];
  technologies: string[];
  liveDemoUrl: string;
  githubUrl: string;
  features: string[];
  problemSolved: string;
  challenges: { problem: string; solution: string }[];
  outcomes: string[];
  rolesWorkflow?: ProjectRoleFlowStep[];
}

export interface SkillItem {
  name: string;
  category: 'frontend' | 'backend' | 'database_tools';
  description: string;
  iconName: string;
  tags: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  deliverables: string[];
}

export const PERSONAL_INFO = {
  name: 'Haroon Khan',
  title: 'Full-Stack MERN Developer',
  email: 'haroonkhan31242@gmail.com',
  github: 'https://github.com/haroonkhan31242-Devloper',
  linkedin: 'https://www.linkedin.com/in/haroon-khan-62478b445/',
  fiverr: 'https://www.fiverr.com/sellers/mrashid170/',
  location: 'Available Globally (Remote / Freelance)',
  heroIntro: 'I build modern, responsive, and user-friendly web applications using React, JavaScript, Node.js, Express.js, MongoDB, Tailwind CSS, HTML, and CSS.',
  contactCta: 'Have a project in mind? Let’s build something useful, modern, and professional together.',
  availability: 'Available for freelance projects, Fiverr orders & full-time roles',
};

/**
 * ============================================================================
 * IMAGE CONFIGURATION
 * ============================================================================
 * You can replace any of the URLs below with your own hosted images (e.g. Cloudinary,
 * Imgur, AWS S3) or local image paths placed in the `/public` or `/src/assets` folder.
 * Example for local image: heroProfile: '/profile.jpg'
 */
export const PORTFOLIO_IMAGES = {
  // Official portrait of Haroon Khan (Full-Stack MERN Developer)
  // Optimised WebP versions of the original portrait (same photo, ~65 KB instead of 2.4 MB).
  heroProfile: '/assets/aistudio/haroon-khan-portrait-900.webp',
  heroProfileSrcSet:
    '/assets/aistudio/haroon-khan-portrait-480.webp 480w, /assets/aistudio/haroon-khan-portrait-900.webp 900w',
  // Original full-resolution portrait (kept as the source file)
  heroProfileOriginal: '/assets/aistudio/file_00000000fee88211aed821c55a294c43_9ac4e9c6.png',
  aboutWorkspace: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
  tenantSystemPreview: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80',
  codeArchitecture: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  
  // Screenshots for the Tenant Management System case study
  tenantScreenshots: [
    {
      title: 'Admin & Property Owner Dashboard',
      url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=80',
      caption: 'Unified property overview with occupancy metrics and owner management controls.',
    },
    {
      title: 'Tenant Invitation & Unit Assignment Portal',
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
      caption: 'Streamlined invitation workflow pairing new tenants directly to rental units.',
    },
    {
      title: 'Payment Records & Transaction Audit History',
      url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80',
      caption: 'Immutable rent payment logs and ledger transparency for tenants and property owners.',
    },
  ],
};

export const CORE_TECH_STACK = [
  { name: 'HTML', category: 'Frontend Markup', description: 'Semantic, accessible, and standards-compliant document structures.' },
  { name: 'CSS', category: 'Styling & Layout', description: 'Modern Flexbox, CSS Grid, custom properties, and responsive design.' },
  { name: 'Tailwind CSS', category: 'Utility Framework', description: 'Production utility-first UI styling with custom design tokens.' },
  { name: 'JavaScript', category: 'Core Language', description: 'Modern ES6+ syntax, asynchronous programming, and DOM manipulation.' },
  { name: 'React.js', category: 'Frontend Library', description: 'Component-driven architecture, custom hooks, and state management.' },
  { name: 'Node.js', category: 'Backend Runtime', description: 'High-concurrency server-side JavaScript execution.' },
  { name: 'Express.js', category: 'Web Framework', description: 'Robust RESTful API architecture, middleware pipelines, and routing.' },
  { name: 'MongoDB', category: 'Database', description: 'Flexible NoSQL document modeling, indexing, and aggregation pipelines.' },
];

export const SKILLS_CATEGORIES = {
  frontend: [
    { name: 'HTML5', category: 'frontend' as const, description: 'Semantic structure, accessibility standards (WCAG), and clean DOM layout.', iconName: 'FileCode', tags: ['Semantic HTML', 'WCAG AA', 'SEO'] },
    { name: 'CSS3', category: 'frontend' as const, description: 'Modern layouts with Flexbox, CSS Grid, media queries, and smooth keyframe animations.', iconName: 'Palette', tags: ['CSS Grid', 'Flexbox', 'Responsive'] },
    { name: 'Tailwind CSS', category: 'frontend' as const, description: 'Utility-first rapid prototyping, theme customization, and modular design systems.', iconName: 'Wind', tags: ['Modern Styling', 'Design Systems', 'Dark Mode'] },
    { name: 'JavaScript', category: 'frontend' as const, description: 'ES6+ specifications, closures, Promises, async/await, and event-driven patterns.', iconName: 'Code', tags: ['ES6+', 'Async/Await', 'DOM APIs'] },
    { name: 'React.js', category: 'frontend' as const, description: 'Functional components, hooks (useState, useEffect, useMemo), Context API, and state architectures.', iconName: 'Layers', tags: ['Hooks', 'Context API', 'Component Architecture'] },
    { name: 'Responsive Web Design', category: 'frontend' as const, description: 'Mobile-first viewport engineering ensuring fluid readability from phones to 4K displays.', iconName: 'Smartphone', tags: ['Mobile-First', 'Fluid Layouts', 'Cross-Device'] },
  ],
  backend: [
    { name: 'Node.js', category: 'backend' as const, description: 'Event-driven, asynchronous backend runtime for scalable networked applications.', iconName: 'Server', tags: ['Event Loop', 'Scalability', 'Micro-Services'] },
    { name: 'Express.js', category: 'backend' as const, description: 'Middleware-driven routing pipelines, error handling, and modular controller structures.', iconName: 'Cpu', tags: ['Middleware', 'Routing', 'REST Architecture'] },
    { name: 'REST APIs', category: 'backend' as const, description: 'Strict HTTP status codes, structured JSON payloads, and clean resource routing conventions.', iconName: 'Network', tags: ['JSON', 'HTTP Methods', 'CRUD'] },
    { name: 'Authentication', category: 'backend' as const, description: 'Secure user authentication with JWT (JSON Web Tokens), password hashing (bcrypt), and sessions.', iconName: 'Lock', tags: ['JWT', 'Bcrypt', 'Tokens'] },
    { name: 'Authorization', category: 'backend' as const, description: 'Route protection middleware, permission verification, and sensitive resource shielding.', iconName: 'ShieldCheck', tags: ['Guards', 'Permissions', 'Resource Access'] },
    { name: 'Role-Based Access Control', category: 'backend' as const, description: 'Multi-tenant hierarchical roles (Super Admin, Property Owner, Tenant) with segregated access.', iconName: 'Users', tags: ['RBAC', 'Hierarchical Roles', 'Data Isolation'] },
  ],
  database_tools: [
    { name: 'MongoDB', category: 'database_tools' as const, description: 'NoSQL document schemas, Mongoose ODM modeling, indexing, and complex queries.', iconName: 'Database', tags: ['Mongoose', 'Aggregation', 'Document Store'] },
    { name: 'Git', category: 'database_tools' as const, description: 'Distributed version control, branching strategies, and commit hygiene.', iconName: 'GitBranch', tags: ['Branching', 'Version Control', 'CLI'] },
    { name: 'GitHub', category: 'database_tools' as const, description: 'Remote repository management, pull requests, collaboration, and project tracking.', iconName: 'GitPullRequest', tags: ['Repositories', 'Collaboration', 'Releases'] },
    { name: 'API Integration', category: 'database_tools' as const, description: 'Connecting frontend clients to third-party endpoints, payment gateways, and external REST APIs.', iconName: 'Zap', tags: ['Axios', 'Fetch API', 'Third-Party Services'] },
    { name: 'Debugging', category: 'database_tools' as const, description: 'Systematic root-cause diagnosis using Chrome DevTools, network inspectors, and server logs.', iconName: 'Search', tags: ['DevTools', 'Log Tracing', 'Network Auditing'] },
    { name: 'Problem Solving', category: 'database_tools' as const, description: 'Breaking down complex full-stack requirements into modular, maintainable, and testable solutions.', iconName: 'Brain', tags: ['Architecture', 'Logic Flow', 'Optimization'] },
  ],
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'responsive-website-development',
    title: 'Responsive Website Development',
    description: 'Custom, pixel-perfect websites engineered mobile-first with pristine responsiveness across smartphones, tablets, laptops, and ultra-wide screens.',
    iconName: 'Smartphone',
    deliverables: ['Fluid layouts across all viewports', 'Cross-browser compatibility', 'Fast load times & performance tuning'],
  },
  {
    id: 'react-frontend-development',
    title: 'React.js Frontend Development',
    description: 'Dynamic Single Page Applications (SPAs) built with modern React.js, functional components, custom hooks, and predictable state management.',
    iconName: 'Layout',
    deliverables: ['Reusable component libraries', 'Context & custom hooks state', 'Interactive micro-animations'],
  },
  {
    id: 'mern-application-development',
    title: 'MERN Stack Application Development',
    description: 'End-to-end full-stack web applications connecting React frontends with Node.js/Express backends and MongoDB databases for complete digital solutions.',
    iconName: 'Layers',
    deliverables: ['Full-stack architecture design', 'Unified JavaScript ecosystem', 'Seamless frontend-to-database communication'],
  },
  {
    id: 'nodejs-backend-development',
    title: 'Node.js Backend Development',
    description: 'Lightweight, event-driven server runtime development optimized for speed, reliability, and concurrent data handling.',
    iconName: 'Server',
    deliverables: ['Asynchronous event architecture', 'High throughput server logic', 'Configurable environment pipelines'],
  },
  {
    id: 'expressjs-api-development',
    title: 'Express.js API Development',
    description: 'RESTful API endpoints structured with clean MVC patterns, validation middleware, and informative HTTP error responses.',
    iconName: 'Network',
    deliverables: ['RESTful endpoint design', 'Request validation & sanitization', 'Centralized error-handling middleware'],
  },
  {
    id: 'mongodb-database-integration',
    title: 'MongoDB Database Integration',
    description: 'Flexible document database schema design using Mongoose ODM with relational references, indexes, and fast queries.',
    iconName: 'Database',
    deliverables: ['Mongoose schema modeling', 'Index optimization & relations', 'Data sanitization & validation'],
  },
  {
    id: 'authentication-authorization-systems',
    title: 'Authentication & Authorization Systems',
    description: 'Bulletproof security flows using JSON Web Tokens (JWT), salted bcrypt password hashing, session expiration, and role validation.',
    iconName: 'ShieldCheck',
    deliverables: ['JWT token generation & refresh', 'Secure password encryption', 'Protected client & server routes'],
  },
  {
    id: 'admin-dashboards',
    title: 'Admin Dashboards & Management Panels',
    description: 'Organized administrative dashboards featuring summary metrics, data tables with pagination/filters, and intuitive management workflows.',
    iconName: 'BarChart3',
    deliverables: ['Metric summaries & analytics cards', 'CRUD data tables & filters', 'Role-specific view permissions'],
  },
  {
    id: 'ui-improvements',
    title: 'UI Improvements & Modernization',
    description: 'Transform outdated or clunky interfaces into sleek, modern, accessible, and high-conversion digital experiences using Tailwind CSS.',
    iconName: 'Sparkles',
    deliverables: ['Visual aesthetic upgrades', 'Improved typographic hierarchy', 'Consistent spacing & contrast fixing'],
  },
  {
    id: 'website-bug-fixing',
    title: 'Website Bug Fixing & Troubleshooting',
    description: 'Rapid identification and resolution of JavaScript exceptions, styling glitches, broken layout responsiveness, and state synchronization bugs.',
    iconName: 'Bug',
    deliverables: ['Console error elimination', 'State desync corrections', 'CSS layout & overflow repairs'],
  },
  {
    id: 'website-maintenance',
    title: 'Website Maintenance & Optimization',
    description: 'Ongoing codebase hygiene, package updates, performance audits, code refactoring, and stability assurance for peace of mind.',
    iconName: 'Wrench',
    deliverables: ['Dependency updates & audits', 'Performance refactoring', 'Code cleanup & best practices'],
  },
  {
    id: 'api-integration',
    title: 'API Integration & Third-Party Services',
    description: 'Seamlessly connecting client applications to external payment gateways, mapping services, messaging APIs, and internal endpoints.',
    iconName: 'Zap',
    deliverables: ['Third-party API consumption', 'Webhook & callback handling', 'Network error recovery routines'],
  },
];

export const PROJECTS_LIST: ProjectData[] = [
  {
    id: 'tenant-management-system',
    slug: 'tenant-management-system',
    title: 'Tenant Management System',
    shortDescription: 'A role-based tenant management platform that connects administrators, property owners, and tenants in one organized system.',
    fullDescription: 'The Tenant Management System is a specialized full-stack MERN application engineered to eliminate the manual chaos of rental property administration. By implementing strict Role-Based Access Control (RBAC), the platform establishes clean boundaries and intuitive workflows for three distinct user roles: Administrators, Property Owners, and Tenants. Owners can invite tenants, link them to specific homes or rental units, and record verified rent payments. Tenants gain a private dashboard to verify unit details, track real-time payment history, and inspect historical audit logs.',
    featured: true,
    category: 'Full-Stack MERN',
    image: PORTFOLIO_IMAGES.tenantSystemPreview,
    imageAlt: 'Tenant Management System Dashboard Interface Mockup',
    screenshots: [
      PORTFOLIO_IMAGES.tenantScreenshots[0].url,
      PORTFOLIO_IMAGES.tenantScreenshots[1].url,
      PORTFOLIO_IMAGES.tenantScreenshots[2].url,
    ],
    technologies: ['React.js', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'MERN Stack'],
    // Placeholder links clearly marked for replacement by user
    liveDemoUrl: 'https://github.com/haroonkhan31242-Devloper', // REPLACE WITH LIVE DEMO URL (e.g. https://tenant-system.onrender.com)
    githubUrl: 'https://github.com/haroonkhan31242-Devloper', // REPLACE WITH REPO URL (e.g. https://github.com/haroonkhan31242-Devloper/tenant-management-system)
    features: [
      'Admin creates and manages owner accounts',
      'Owners create and invite tenants',
      'Tenants activate their accounts through invitations',
      'Tenants are assigned to homes or rental units',
      'Owners manually record rent payments',
      'Tenants can view payment records',
      'Tenants can view audit and transaction history',
      'Separate access for administrators, owners, and tenants',
      'MongoDB-based data management',
      'Role-based access control',
      'Organized tenant and property information',
    ],
    problemSolved: 'Property owners and residential managers often rely on fragmented spreadsheets, messaging apps, and manual paper logs to track leases, tenant onboarding, and monthly rent payments. This leads to lost payment records, security vulnerabilities, and tenant confusion. The Tenant Management System unifies the entire property lifecycle into a secure, single source of truth.',
    rolesWorkflow: [
      {
        stepNumber: 1,
        actor: 'Admin',
        action: 'Creates & Manages Property Owners',
        description: 'System administrators provision verified Owner profiles and assign portfolio limits.',
      },
      {
        stepNumber: 2,
        actor: 'Owner',
        action: 'Invites Prospective Tenants',
        description: 'Property owners dispatch secure digital invitations containing unique onboarding tokens.',
      },
      {
        stepNumber: 3,
        actor: 'Tenant',
        action: 'Activates Private Account',
        description: 'Tenants claim invitations, set encrypted credentials, and confirm contact details.',
      },
      {
        stepNumber: 4,
        actor: 'System',
        action: 'Assigns Home or Rental Unit',
        description: 'The unit association is locked to the tenant profile with lease dates and monthly rent rates.',
      },
      {
        stepNumber: 5,
        actor: 'Owner',
        action: 'Records Rent Payment Entry',
        description: 'Owners log received rent (cash, bank transfer, check) with timestamp, receipt, and status.',
      },
      {
        stepNumber: 6,
        actor: 'Tenant',
        action: 'Views Payment & Audit History',
        description: 'Tenants inspect an immutable ledger of transactions, clearing discrepancies instantly.',
      },
    ],
    challenges: [
      {
        problem: 'Strict Role Segregation & Security',
        solution: 'Engineered reusable Express middleware functions (`verifyToken`, `requireRole(["Admin", "Owner"])`) that inspect JWT claims on every protected API endpoint before querying MongoDB.',
      },
      {
        problem: 'Invitation Token Expiration & Safe Activation',
        solution: 'Implemented one-time invitation hashes stored with TTL (Time-To-Live) timestamps in MongoDB, ensuring tokens cannot be replayed or hijacked.',
      },
      {
        problem: 'Multi-Tenant Data Leakage Prevention',
        solution: 'Structured Mongoose queries with strict compound owner filtering (`{ ownerId: req.user.id }`), ensuring property owners can never view or modify units belonging to another owner.',
      },
    ],
    outcomes: [
      'Eliminated manual spreadsheet reconciliation for property managers.',
      'Reduced tenant onboarding friction to under 2 minutes via automated invitation activation.',
      'Provided 100% transparent audit history for every logged rent payment.',
      'Demonstrated production-grade MERN architecture with scalable document relationships.',
    ],
  },
  {
    id: 'mern-inventory-order-api',
    slug: 'mern-inventory-order-api',
    title: 'E-Commerce Inventory & Order API',
    shortDescription: 'Scalable REST API backend with JWT authentication, inventory decrementing, and order transaction pipelines.',
    fullDescription: 'A robust backend service architected using Node.js, Express.js, and MongoDB. Features secure user authentication, inventory stock checking, atomic database transactions for order processing, and comprehensive error handling.',
    featured: false,
    category: 'Backend & API',
    image: PORTFOLIO_IMAGES.codeArchitecture,
    imageAlt: 'Backend API Architecture & REST Endpoints',
    screenshots: [PORTFOLIO_IMAGES.codeArchitecture],
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST APIs'],
    liveDemoUrl: 'https://github.com/haroonkhan31242-Devloper',
    githubUrl: 'https://github.com/haroonkhan31242-Devloper',
    features: [
      'JWT-based secure authentication pipeline',
      'CRUD product inventory with categorization',
      'Order creation with real-time stock validation',
      'Comprehensive error handling middleware',
    ],
    problemSolved: 'Provides developers with a clean, extensible backend boilerplate with enterprise-grade token security and database schema validation.',
    challenges: [
      {
        problem: 'Preventing race conditions during checkout',
        solution: 'Employed MongoDB conditional updates to ensure inventory is only decremented if available stock exceeds order quantity.',
      },
    ],
    outcomes: [
      'Tested with high-concurrency API test suites.',
      'Documented with clean Postman collection schemas.',
    ],
  },
  {
    id: 'modern-responsive-saas-dashboard',
    slug: 'modern-responsive-saas-dashboard',
    title: 'React Modern Analytics Dashboard',
    shortDescription: 'Interactive frontend web application with dynamic data cards, filterable tables, and dark mode interface.',
    fullDescription: 'A high-performance React application designed with Tailwind CSS. Incorporates responsive side navigation, searchable data grids, interactive status filters, and smooth motion animations with accessibility standards.',
    featured: false,
    category: 'Frontend',
    image: PORTFOLIO_IMAGES.aboutWorkspace,
    imageAlt: 'React SaaS Analytics Dashboard Interface',
    screenshots: [PORTFOLIO_IMAGES.aboutWorkspace],
    technologies: ['React.js', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3'],
    liveDemoUrl: 'https://github.com/haroonkhan31242-Devloper',
    githubUrl: 'https://github.com/haroonkhan31242-Devloper',
    features: [
      'Modular React component architecture',
      'Client-side search and multi-criteria filtering',
      'Responsive collapsible drawer for mobile and tablet',
      'Accessible focus rings and keyboard navigation',
    ],
    problemSolved: 'Delivers a responsive, lightweight business dashboard template that loads under 1 second without bloated third-party styling libraries.',
    challenges: [
      {
        problem: 'Optimizing render performance across large datasets',
        solution: 'Utilized React `useMemo` hooks to memoize filtered lists and prevent unnecessary child re-renders.',
      },
    ],
    outcomes: [
      '100% responsive across mobile, tablet, and widescreen viewports.',
      'Achieved 98+ Google Lighthouse accessibility and performance ratings.',
    ],
  },
];
