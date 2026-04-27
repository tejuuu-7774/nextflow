NextFlow

NextFlow is a full-stack AI workflow builder that enables users to design, manage, and execute AI-powered workflows through a visual interface. It provides a structured way to connect prompts, models, and logic into reusable workflows, making AI interactions more organized, repeatable, and scalable.

Overview

Modern AI tools are powerful but often fragmented—users repeatedly write prompts, switch between models, and lose context. NextFlow solves this by introducing a workflow-based approach where AI interactions can be visually composed, saved, and reused.

The platform allows users to create workflows, define their structure, and execute them using integrated AI models such as Google's Gemini and Groq APIs.

Features
Workflow Management
Create and name workflows
Load and switch between saved workflows
Delete workflows with proper state handling
Persistent storage of workflow structure (nodes and edges)
Visual Builder
Node-based workflow design using a drag-and-drop interface
Dynamic connection of steps within a workflow
Real-time updates to workflow structure
AI Integration
Integration with Gemini (Google Generative AI)
Integration with Groq (fallback for reliability and free-tier usage)
Structured execution of AI-driven workflows
State Management
Centralized workflow state using a global store
Automatic UI updates without page reloads
Reset of builder state upon workflow deletion
Error Handling
Inline error messaging for better user experience
Graceful handling of API failures
Loading and disabled states for user actions
Tech Stack
Frontend
Next.js (App Router)
React
Tailwind CSS
React Flow (for workflow visualization)
Backend
Node.js
Express.js
Prisma ORM
Database
PostgreSQL (via Prisma)
AI Services
Gemini API (Google Generative AI)
Groq API
Project Structure
nextflow/
│
├── client/                  # Frontend (Next.js)
│   ├── app/
│   ├── components/
│   ├── lib/api/
│   └── store/
│
├── server/                  # Backend (Express + Prisma)
│   ├── src/routes/
│   ├── prisma/
│   └── index.ts
│
└── README.md
Installation and Setup
Prerequisites
Node.js (v18 or higher)
npm or yarn
PostgreSQL database
1. Clone the repository
git clone <your-repo-url>
cd nextflow
2. Backend Setup
cd server
npm install

Create a .env file:

DATABASE_URL=your_database_url
PORT=3001

Run migrations:

npx prisma migrate dev

Start the backend server:

npm run dev
3. Frontend Setup
cd client
npm install

Create a .env.local file:

NEXT_PUBLIC_API_URL=http://localhost:3001

Start the frontend:

npm run dev
API Endpoints
Workflows
GET /api/workflows
Fetch all workflows
POST /api/workflows
Create a new workflow
PUT /api/workflows/:id
Update an existing workflow
DELETE /api/workflows/:id
Delete a workflow and its associated data
Key Design Decisions
1. Workflow-Centric Architecture

Instead of treating prompts as isolated inputs, NextFlow structures them into workflows, enabling reuse and better organization.

2. Transaction-Safe Deletion

Workflow deletion is handled using database transactions to ensure:

Related records are deleted first
No orphaned data remains
System consistency is maintained
3. Minimal and Functional UI

The interface prioritizes clarity and usability over visual complexity, ensuring a smooth user experience for workflow management.

4. Separation of Concerns
Frontend handles UI and state
Backend manages data and business logic
API layer acts as a clean interface between both
Future Improvements
Workflow duplication
Versioning and history tracking
Collaborative workflows
Advanced node types (conditions, loops)
Execution logs and analytics
Deployment and sharing of workflows
Deployment

The project is structured to support independent deployment:

Frontend: Vercel
Backend: Render / Railway
Database: Managed PostgreSQL (e.g., Supabase, Neon)
Conclusion

NextFlow transforms how users interact with AI by introducing structure, reusability, and clarity through workflows. It bridges the gap between raw prompt usage and scalable AI systems, making it easier to build, manage, and execute intelligent processes.