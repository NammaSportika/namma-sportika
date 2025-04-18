# Namma Sportika Website

A modern web application for Namma Sportika, a sports management platform featuring cricket match scoring, event management, and administrative tools.

## Project Overview

Namma Sportika Website is built with React and Firebase, providing a comprehensive solution for sports event management, scorekeeping, and user engagement. The application offers both user-facing features and administrative capabilities.

## Features

- **Cricket Match Scoring**: Real-time cricket match scoreboard display
- **Event Management**: Information about upcoming and past sporting events
- **Admin Dashboard**: Tools for managing match data, registrations, and feedback
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Authentication**: Secure login with Firebase Authentication

## Technology Stack

- **Frontend**: React 19, React Router DOM, Tailwind CSS, Framer Motion
- **Backend**: Firebase (Firestore, Authentication, Hosting)
- **Build Tools**: Vite, ESLint
- **Additional Libraries**: XLSX for data export, File-Saver for downloads

## Project Structure

- `/src/components`: Reusable UI components
- `/src/pages`: Main application pages including:
  - `/Events`: Event-related pages including Cricket events
  - `/ScoreBoard`: Match scoreboard displays
  - `/ScoreBoardAdmin`: Admin tools for managing match data
- `/src/firebase`: Firebase configuration and utilities
- `/public`: Static assets including images

## Key Components

- **CricketScore.jsx**: Component for displaying cricket match data
- **SportsAdmin.jsx**: Administrative interface for managing sports data
- **firebaseUtils.js**: Firebase utility functions for data operations

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd nammaSportikaWebsite
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with your Firebase configuration:
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

4. Start the development server
```bash
npm run dev
```

## Deployment

The application can be deployed to Firebase Hosting:

```bash
npm run build
firebase deploy
```

## Contact

For questions or support, please contact [Vansh Agrawal](mailto:agrawalvansh@gmail.com).

