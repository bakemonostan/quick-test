# Environment Configuration

## Overview

This project uses 3 different environments, each with its own configuration file.

---

## Environment Files to Create

You need to create 3 `.env` files in the root directory:

### 1. `.env.development`

For local development and dev.kaparki.nl

```env
# Development Environment
NEXT_PUBLIC_API_BASE_URL=https://dev-api.kaparki.nl/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
NEXT_PUBLIC_ENV=development
```



### 2. `.env.acc`

For acceptance/staging environment (acc.kaparki.nl)

```env
# Acceptance Environment
NEXT_PUBLIC_API_BASE_URL=https://acc-api.kaparki.nl/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
NEXT_PUBLIC_ENV=acc
```

### 3. `.env.production`

For production environment (kaparki.nl)

```env
# Production Environment
NEXT_PUBLIC_API_BASE_URL=https://api.kaparki.nl/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
NEXT_PUBLIC_ENV=production
```

---

## Quick Setup

Create the 3 environment files manually in the root directory, then fill in your actual API keys.

## Environment Variables Explained

### NEXT_PUBLIC_API_BASE_URL

The backend API endpoint for each environment:

- **Development**: `https://dev-api.kaparki.nl/api`
- **Acceptance**: `https://acc-api.kaparki.nl/api`
- **Production**: `https://api.kaparki.nl/api`

### NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

Your Google Maps JavaScript API key from [Google Cloud Console](https://console.cloud.google.com)

- Used for location features, map displays, and geocoding
- Get it from: Google Cloud Console → APIs & Services → Credentials
- **Same key can be used across all environments** (or use different keys for better quota management)

### NEXT_PUBLIC_GOOGLE_CLIENT_ID

Your Google OAuth 2.0 Client ID from [Google Cloud Console](https://console.cloud.google.com)

- Used for "Sign in with Google" functionality
- Get it from: Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs
- **Important**: Set authorized redirect URIs for each environment:
  - Development: `http://localhost:3000` and `https://dev.kaparki.nl`
  - Acceptance: `https://acc.kaparki.nl`
  - Production: `https://kaparki.nl`

### NEXT_PUBLIC_ENV

Environment name for debugging and logging:

- **Development**: `development`
- **Acceptance**: `acc`
- **Production**: `production`

---

## How It Works

- **Local Development**: Run `npm run dev` → Uses `.env.development`
- **Development Build**: Run `npm run build:development` → Uses `.env.development`
- **Acceptance Build**: Run `npm run build:acc` → Uses `.env.acc`
- **Production Build**: Run `npm run build:production` → Uses `.env.production`

Each environment gets its own build with the correct API endpoint already configured.

### Building for Each Environment

```bash
# Development build
npm run build:development

# Acceptance build (copy .env.acc first)
copy .env.acc .env.production.local
npm run build:acc

# Production build
npm run build:production
```

**How it works:**

1. Next.js loads the appropriate `.env` file based on NODE_ENV
2. Environment variables are "baked into" the build at build time
3. You deploy that specific build to the matching domain
4. The app already knows which API to use (no runtime domain checking needed)

**Note:** For acceptance builds, you need to copy `.env.acc` to `.env.production.local` before building, or set the environment variables in your deployment platform (Vercel, etc.).

---

## Important Notes

- Never commit the actual `.env` files (they contain secrets)
- The `.gitignore` is already configured to exclude them
- All client-side variables must start with `NEXT_PUBLIC_`
- The API configuration in `src/config/api.ts` automatically uses the correct URL
