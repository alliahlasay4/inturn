# Development Guide

## Coding Standards

### Naming Conventions
- **Components**: PascalCase (Button.jsx, LoginPage.jsx)
- **Functions**: camelCase (validateEmail, handleSubmit)
- **Constants**: UPPER_SNAKE_CASE (API_BASE_URL, MAX_LENGTH)
- **CSS Classes**: kebab-case or Tailwind utilities

### File Organization
- One component per file
- Component name = File name
- Keep components small and focused

### Component Structure
```jsx
import statements

function ComponentName({ props }) {
  // State
  const [state, setState] = useState();
  
  // Functions
  const handleSomething = () => {};
  
  // Effects
  useEffect(() => {}, []);
  
  // Render
  return ();
}

export default ComponentName;
```

## Tailwind Best Practices
- Use utility classes instead of custom CSS
- Use responsive prefixes: `md:`, `lg:`
- Common spacing: `p-4`, `m-4`, `gap-4`
- Common colors: `text-gray-700`, `bg-blue-600`

## Shared Components Usage

### Button
```jsx
<Button 
  text="Click Me" 
  onClick={handleClick} 
  type="primary" // primary, secondary, success, danger, outline
  disabled={false}
/>
```

### Input
```jsx
<Input 
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter email"
  error={errors.email}
  required={true}
/>
```

### Card
```jsx
<Card title="Card Title">
  <p>Card content goes here</p>
</Card>
```

## API Usage

### Making API Calls
```jsx
import { authAPI } from '../services/api';

const handleLogin = async () => {
  try {
    const response = await authAPI.login({ email, password });
    console.log(response.data);
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

## Validation Usage
```jsx
import { validateEmail, validateForm } from '../utils/validation';

// Simple validation
if (!validateEmail(email)) {
  setError('Invalid email');
}

// Form validation
const errors = validateForm(
  { email, password },
  { 
    email: { required: true, email: true },
    password: { required: true, minLength: 8 }
  }
);
```

## Git Tips

### Before Starting Work
```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature
```

### While Working
```bash
# Commit often
git add .
git commit -m "Clear description of changes"
```

### Handling Merge Conflicts
1. Pull latest main: `git pull origin main`
2. Resolve conflicts in files
3. Mark as resolved: `git add .`
4. Complete merge: `git commit`

## Testing Locally

### Test Login Flow
1. Run backend server: `npm start` (in backend folder)
2. Run frontend: `npm start` (in InTurn folder)
3. Navigate to `http://localhost:3000`
4. Try logging in

### Test API Calls
Use browser console to check for errors:
- Right-click → Inspect → Console tab
- Look for red error messages
- Check Network tab for API responses

## Common Issues

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
```

### npm install Fails
```bash
# Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Tailwind Styles Not Working
- Make sure `index.css` has @tailwind directives
- Restart development server
- Clear browser cache

## Questions?
Ask in team chat or create an issue on GitHub.
```

---

### **Part 14: Create .gitignore**

**Create `.gitignore` in project root** (should already exist, but verify it has):
```
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo