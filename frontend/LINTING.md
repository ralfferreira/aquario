# Linting and Formatting Setup

This document explains the linting and formatting configuration for the Aquário frontend project.

## 🛠️ Tools Used

### Prettier
- **Purpose**: Code formatting
- **Config**: `.prettierrc`
- **Ignore**: `.prettierignore`

### ESLint
- **Purpose**: Code linting and quality checks
- **Config**: `.eslintrc.json`
- **Extends**: Next.js core web vitals + Prettier

### Husky + lint-staged
- **Purpose**: Pre-commit hooks for automatic formatting and linting
- **Config**: `.husky/pre-commit` + `.lintstagedrc.json`

## 📋 Configuration Details

### Prettier Configuration (`.prettierrc`)
```json
{
  "semi": true,                    // Use semicolons
  "trailingComma": "es5",         // Trailing commas where valid in ES5
  "singleQuote": true,            // Use single quotes
  "printWidth": 100,              // Line length limit
  "tabWidth": 2,                  // Indentation size
  "useTabs": false,               // Use spaces instead of tabs
  "bracketSpacing": true,         // Spaces in object literals
  "bracketSameLine": false,       // JSX brackets on new line
  "arrowParens": "avoid",         // Avoid parentheses around arrow functions
  "endOfLine": "lf",              // Unix line endings
  "quoteProps": "as-needed",      // Quote object properties only when needed
  "jsxSingleQuote": true,         // Single quotes in JSX
  "proseWrap": "preserve"         // Don't wrap prose
}
```

### ESLint Rules
- **Prettier integration**: Enforces Prettier formatting
- **React rules**: Optimized for Next.js
- **TypeScript rules**: Type safety and best practices
- **Code quality**: Prevents common mistakes and enforces good practices

## 📁 File Naming Conventions

**All files must follow kebab-case naming convention (automatically enforced by ESLint):**

### Universal Rule: kebab-case
- **Pattern**: `kebab-case.tsx`
- **Example**: `user-profile.tsx`, `about-us.tsx`, `my-component.tsx`, `use-auth.tsx`
- **Applies to**: ALL files in the project
- **Enforcement**: ESLint will show an error if files don't follow kebab-case

### Examples by File Type:
- **Pages**: `user-profile.tsx`, `about-us.tsx`
- **Components**: `my-component.tsx`, `user-card.tsx`
- **Hooks**: `use-auth.tsx`, `use-local-storage.tsx`
- **Utilities**: `format-date.ts`, `api-client.ts`
- **Types**: `user-types.ts`, `api-response.ts`
- **Constants**: `api-endpoints.ts`, `default-config.ts`

### Current Files That Need Renaming:
Many existing files don't follow kebab-case and should be renamed:
- `MyComponent.tsx` → `my-component.tsx`
- `UserProfile.tsx` → `user-profile.tsx`
- `useAuth.tsx` → `use-auth.tsx`
- `formatDate.ts` → `format-date.ts`

### How to Check for Filename Issues:
```bash
# Check specific file for naming issues
npx eslint src/components/MyComponent.tsx

# Check all files for naming issues
npm run lint
```

### How to Rename Files:
1. **Rename the file** using your IDE or file system
2. **Update imports** in all files that reference the renamed file
3. **Update exports** if the file exports components/functions
4. **Test** to ensure everything still works

### Example Renaming Process:
```bash
# 1. Rename the file
mv src/components/MyComponent.tsx src/components/my-component.tsx

# 2. Update imports in other files
# Change: import MyComponent from './MyComponent'
# To: import MyComponent from './my-component'

# 3. Update the component export if needed
# The component name inside the file can stay the same
export default function MyComponent() { ... }
```

### Ignored Files
The following files are exempt from naming rules:
- `README.md`, `LICENSE`, `CHANGELOG.md`
- `package.json`, `tsconfig.json`
- `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs`
- `components.json`, `.eslintrc.json`, `.prettierrc`, `.lintstagedrc.json`

## 🚀 Available Scripts

### Formatting
```bash
# Format all files
npm run format

# Check if files are formatted correctly
npm run format:check

# Format only staged files
npm run format:staged
```

### Linting
```bash
# Run ESLint
npm run lint

# Run ESLint with auto-fix
npm run lint:fix
```

### Type Checking
```bash
# Check TypeScript types
npm run type-check
```

### All Checks
```bash
# Run all checks (lint + format + type-check)
npm run check-all
```

## 🔧 Pre-commit Hooks

When you commit code, the following happens automatically:

1. **lint-staged** runs on staged files
2. **ESLint** fixes issues automatically where possible
3. **Prettier** formats the code
4. If any issues remain, the commit is blocked

### Manual Setup (if needed)
```bash
# Install husky
npm run prepare

# The pre-commit hook is already configured
```

## 📝 Usage Examples

### Before Committing
```bash
# Format and lint all files
npm run format
npm run lint:fix

# Or run all checks
npm run check-all
```

### IDE Integration

#### VS Code
Install these extensions:
- **Prettier - Code formatter**
- **ESLint**

Add to your VS Code settings:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

#### Other IDEs
- Configure your IDE to use Prettier for formatting
- Enable ESLint integration
- Set up format-on-save

## 🐛 Troubleshooting

### Common Issues

1. **Prettier conflicts with ESLint**
   - Solution: ESLint config extends "prettier" to avoid conflicts

2. **TypeScript errors**
   - Run `npm run type-check` to see detailed errors
   - Fix type issues before committing

3. **Pre-commit hook fails**
   - Fix the linting/formatting issues shown
   - Re-stage and commit again

4. **File naming issues**
   - Check the naming conventions above
   - Rename files to follow the patterns

### Override Rules (if needed)
You can disable specific rules for a file by adding comments:

```javascript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = response;

/* eslint-disable react-hooks/exhaustive-deps */
useEffect(() => {
  // effect code
}, []);
```

## 📚 Additional Resources

- [Prettier Documentation](https://prettier.io/docs/en/)
- [ESLint Documentation](https://eslint.org/docs/)
- [Next.js ESLint Config](https://nextjs.org/docs/basic-features/eslint)
- [Husky Documentation](https://typicode.github.io/husky/)
