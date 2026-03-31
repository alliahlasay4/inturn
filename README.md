# InTurn - Intern Management System

Frontend application for managing interns and tasks.

## Tech Stack
- React.js
- Tailwind CSS
- React Router
- Axios

## Team
- **Person A**: Authentication + Form Validation
- **Person B**: Admin Dashboard
- **Person C**: Intern Dashboard

## Required Versions
- Node.js: v22.16.0(check with `node -v`)
- npm: 10.9.2 (check with `npm -v`)

## Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/monaypogi/InTurn.git
cd InTurn
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm start
```

Application will open at `http://localhost:3000`

## Project Structure
```
src/
├── components/     # Reusable UI components (Button, Input, Card)
├── pages/          # Full page views (LoginPage, AdminDashboard, InternDashboard)
├── hooks/          # Custom React hooks
├── utils/          # Helper functions (validation, formatting)
├── services/       # API calls (api.js)
├── assets/         # Images, icons, files
└── App.js          # Main routing
```

## Available Scripts
- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests

## Git Workflow

### Branch Naming
- `feature/feature-name` - New features
- `fix/bug-name` - Bug fixes
- `docs/description` - Documentation

### Development Process
1. Pull latest main: `git checkout main && git pull origin main`
2. Create feature branch: `git checkout -b feature/your-feature`
3. Make changes and commit: `git add . && git commit -m "Description"`
4. Push branch: `git push origin feature/your-feature`
5. Create Pull Request on GitHub
6. Wait for code review
7. Merge after approval

## API Configuration
Backend API runs on `http://localhost:5000/api`

Make sure backend server is running before testing API calls.

## Common Commands
```bash
# Check current branch
git branch

# Switch branch
git checkout branch-name

# See changes
git status

# Pull latest changes
git pull origin main
```

## Need Help?
Contact team members or check documentation in `/docs` folder.