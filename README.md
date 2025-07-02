# Scriptorium

**Your Ultimate Coding Playground & Knowledge Sharing Platform**

---

## Table of Contents
- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Key Features](#key-features)
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

### Prerequisites
- Node.js 18+
- npm 9+ or yarn 1.22+
- Docker 20+ (for code execution)
- Git 2.30+

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Scriptorium
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up the database:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   npx prisma db seed
   ```
4. Build Docker images (for code execution):
   ```bash
   chmod +x build-docker-images.sh
   ./build-docker-images.sh
   ```

### Running Locally
```bash
npm run dev
# or
yarn dev
```
Visit [http://localhost:3000](http://localhost:3000)

---

## Key Features
- Multi-language code execution in secure Docker containers
- Create, fork, and share code templates
- Blogging platform with comments and ratings
- User authentication and profiles
- Content moderation and reporting
- Advanced search and discovery
- Light/dark mode and responsive design

---

## Roadmap
- Real-time collaborative code editing
- Integrated debugging tools
- Interactive coding tutorials and challenges
- AI-powered code suggestions and review
- Mobile app and cloud deployment support
- Enterprise features (SSO, advanced team management)


---
