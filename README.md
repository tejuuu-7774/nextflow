# NextFlow

NextFlow is a full-stack AI workflow builder that allows users to visually create, manage, and execute AI-powered workflows. It provides a node-based interface where users can design workflows, connect components, and run them using modern LLM APIs.

The application focuses on simplicity, modularity, and real-time interaction, enabling users to experiment with AI pipelines without dealing with backend complexity.

---

## Features

### Core Functionality
- Create and manage workflows
- Visual workflow builder using node-based architecture
- Select and configure AI models (Gemini, Groq, etc.)
- Save and load workflows from database
- Delete workflows with safe relational handling
- Execute workflows end-to-end

### UI/UX
- Clean and minimal dark-themed interface
- Real-time updates without page reloads
- Inline error handling (no intrusive alerts)
- Loading states for async operations
- Smooth workflow selection and switching

### Data Handling
- Persistent storage using Prisma ORM
- Safe deletion using transactional queries
- Structured workflow storage (nodes + edges)

---

## Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- React Flow (for visual builder)
- Tailwind CSS

### Backend
- Node.js
- Express.js
- Prisma ORM

### Database
- PostgreSQL / MySQL (via Prisma)

### AI Integration
- Google Gemini API
- Groq API (fallback / alternative)

---

## Project Structure
nextflow/
│
├── client/ # Frontend (Next.js)
│ ├── app/ # App Router pages
│ ├── components/ # UI components (Sidebar, Builder, etc.)
│ ├── lib/ # API utilities
│ └── store/ # State management (Zustand or equivalent)
│
├── server/ # Backend (Express + Prisma)
│ ├── src/
│ │ ├── routes/ # API routes (workflowRoutes.ts)
│ │ ├── controllers/ # Business logic (if separated)
│ │ └── prisma/ # Prisma client setup
│ ├── prisma/
│ │ └── schema.prisma # Database schema
│
└── README.md


---

## Architecture Overview

NextFlow follows a clear separation of concerns between frontend and backend.

### Frontend Layer
- Built using Next.js with client-side interactivity
- React Flow manages node-based workflow visualization
- Global state is handled via a lightweight store
- API layer abstracts backend communication

### Backend Layer
- Express server exposes REST APIs
- Prisma ORM handles database operations
- Routes are modular and focused on specific entities (e.g., workflows)

### Data Flow

1. User creates or edits a workflow in the UI
2. Frontend updates local state (nodes, edges)
3. On save, data is sent to backend via API
4. Backend validates and persists data using Prisma
5. On fetch, workflows are loaded and rendered in UI

### Deletion Flow (Important)

- User triggers delete from sidebar
- Frontend sends DELETE request to `/api/workflows/:id`
- Backend:
  - Validates workflow existence
  - Deletes related records (e.g., workflowRun)
  - Deletes workflow inside a transaction
- Frontend updates state without reload

This ensures data consistency and prevents orphan records.

---

## API Endpoints

### Workflows

- `GET /api/workflows`  
  Fetch all workflows

- `POST /api/workflows`  
  Create a new workflow

- `PUT /api/workflows/:id`  
  Update an existing workflow

- `DELETE /api/workflows/:id`  
  Delete a workflow (with relational cleanup)

---

## Environment Variables

### Client (`.env.local`)
NEXT_PUBLIC_API_URL=http://localhost:3001


### Server (`.env`)

DATABASE_URL=your_database_url
GEMINI_API_KEY=your_key
GROQ_API_KEY=your_key


---

## Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd nextflow
2. Setup Backend
    cd server
    npm install
    npx prisma generate
    npx prisma migrate dev
    npm run dev
3. Setup Frontend
    cd client
    npm install
    npm run dev
    Running the Application
    Frontend: http://localhost:3000
    Backend: http://localhost:3001

Key Design Decisions
1. Node-Based Workflow Builder
    React Flow is used to provide a flexible and scalable visual interface for building workflows.

2. Prisma ORM

    Chosen for:

    Type safety
    Clean schema management
    Easy relational queries
3. Transactional Deletion

    Workflow deletion uses Prisma transactions to:

    Remove dependent records
    Maintain database integrity
    Prevent partial deletes
4. Minimal UI Philosophy

    The UI avoids unnecessary styling and focuses on:

    clarity
    speed
    usability
    Future Improvements
    Workflow duplication
    Version history for workflows
    Execution logs and analytics
    Drag-and-drop enhancements
    Authentication and multi-user support
    Conclusion

    NextFlow demonstrates a complete full-stack system integrating:

    modern frontend architecture
    robust backend design
    real-world database handling
    AI workflow execution

It is built with a focus on clean structure, scalability, and practical usability.
