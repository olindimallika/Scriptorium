# Scriptorium

**Your Ultimate Coding Playground & Knowledge Sharing Platform**

---

## Table of Contents
- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Roadmap](#roadmap)
- [Contribution Guidelines](#contribution-guidelines)

---

## Project Overview
Scriptorium is a modern web platform that allows developers to:
- **Write and execute code** in multiple programming languages securely using Docker containers.
- **Create, share, and discover code templates** for rapid development and learning.
- **Blog about coding topics** and interact with a developer community.

**Motivation:**
Scriptorium was built to provide a single, integrated space for learning by doing, sharing knowledge, and fostering a collaborative coding community.

---

## Getting Started

**Prerequisites:**
- Node.js 18+
- npm 9+ or yarn 1.22+
- Docker 20+ (for code execution)
- Git 2.30+

**Quick Setup:**
Run this command in your terminal after cloning the repository:
```bash
chmod +x startup.sh && ./startup.sh && chmod +x run.sh && ./run.sh
```
This script will install all dependencies, set up the database, build Docker images, and start the development server for you.

Visit [http://localhost:3000](http://localhost:3000) to get started!

---

## Key Features
- Multi-language code execution in secure Docker containers
- Create, fork, and share code templates
- Blogging platform with comments and ratings
- User authentication and profiles
- Content moderation and reporting
- Advanced search and discovery
- Light/dark mode design

---

## Tech Stack

**Frontend:**
- Next.js 14 - React framework with App Router
- React 18 - UI library
- TypeScript 5.7.2 - Type-safe JavaScript
- Tailwind CSS 3.4.15 - Utility-first CSS framework
- CodeMirror 6.0.2 - Code editor with syntax highlighting

**Backend:**
- Next.js API Routes - Serverless API endpoints
- Prisma ORM 5.21.1 - Type-safe database operations
- SQLite - Database
- JWT - Authentication
- Bcrypt - Password hashing

**Code Execution:**
- Docker - Containerized execution environments
- Multiple language runtimes (Python, JavaScript, C++, Java, Go, PHP, Rust, SQL, Ruby, C#, C)

**Development:**
- ESLint - Code linting
- PostCSS - CSS processing

---

## Roadmap
- Real-time collaborative code editing
- Integrated debugging tools
- Interactive coding tutorials and challenges
- AI-powered code suggestions and review
- Mobile app and cloud deployment support
- Enterprise features (SSO, advanced team management)

---

## Contribution Guidelines
We welcome contributions from the community!
1. Fork the repository and create a feature branch.
2. Set up the project locally using the instructions above.
3. Make your changes following our code style (TypeScript, Prettier, ESLint).
4. Write tests for new features and bug fixes.
5. Update documentation as needed.
6. Submit a pull request with a clear description.

---

**Made with ❤️ by the Scriptorium Team**


