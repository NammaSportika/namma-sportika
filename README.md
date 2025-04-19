# Namma Sportika Website

## Event Overview
Namma Sportika, held on March 28-29, brought together over 600+ athletes from 12+ universities in a spectacular celebration of sportsmanship, talent, and camaraderie. As a premier inter-university sports meet, the event featured exciting competitions in:

- Athletics 🏃
- Basketball 🏀
- Chess ♟️
- Cricket 🏏
- Football ⚽
- Kabaddi 🤼‍♂️
- Throwball 🤾
- Volleyball 🏐

## Digital Contribution
For this landmark event, We conceptualized and developed the official Namma Sportika website – creating a first-of-its-kind digital platform across all three GITAM campuses. This achievement marks a significant milestone in GITAM's sports technology integration!

👉 **Explore the website:** [https://namma-sportika.gitam.edu/](https://namma-sportika.gitam.edu/)

## Website Features
- Complete event information with Home, About, Events, Gallery, and Team sections
- A secure registration system ensuring only eligible athletes could participate
- A live scoreboard with real-time updates after matches
- Built using React JS frontend and Firebase backend for powerful real-time functionality

## Project Overview
Namma Sportika Website provides a comprehensive solution for sports event management, scorekeeping, and user engagement. The application offers both user-facing features and administrative capabilities.

## Technology Stack
- **Frontend**: React 19, React Router DOM, Tailwind CSS, Framer Motion
- **Backend**: Firebase (Firestore, Authentication, Hosting)
- **Build Tools**: Vite, ESLint
- **Additional Libraries**: XLSX for data export, File-Saver for downloads

## Project Structure
- `/src/components`: Reusable UI components
- `/src/pages`: Main application pages including:
  - `/Events`: Event-related pages including sporting events
  - `/ScoreBoard`: Match scoreboard displays
  - `/ScoreBoardAdmin`: Admin tools for managing match data
- `/src/firebase`: Firebase configuration and utilities
- `/public`: Static assets including images

## Key Components
- **MatchScore.jsx**: Component for displaying match data
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

## Creating a Lasting Legacy
What makes this project truly special is that we've established more than just a website – we've created a digital foundation that will support Namma Sportika for years to come. Future editions will build upon this platform, ensuring our technological innovation continues to enhance the sporting experience at GITAM.

## Contact
For any inquiries, please reach out to agrawalvanshn@gmail.com
