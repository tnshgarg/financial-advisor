📌 Overview

Financial Advisor is a Next.js-powered web application that helps users make informed financial decisions through AI-powered recommendations. Built with Google Gemini API, the platform provides personalized financial advice in Hindi. It features a quiz functionality to assess users' financial knowledge, Clerk authentication for secure access, and a speech-to-text feature for hands-free interactions.

🚀 Features

- AI-Powered Financial Advice – Get personalized financial guidance using the Gemini API.
- Hindi Language Support – The entire platform operates in Hindi for better accessibility.
- Interactive Quiz – Assess your financial literacy with engaging quizzes.
- Clerk Authentication – Secure user authentication and account management.
- Speech-to-Text – Users can interact using voice commands for seamless experience.

🛠️ Tech Stack

- Frontend: Next.js (React-based framework)
- AI Integration: Google Gemini API
- Authentication: Clerk
- Speech-to-Text: Browser Web Speech API / Google Speech-to-Text API
- State Management: React Context / Zustand
- Styling: Tailwind CSS

📂 Project Setup

1️⃣ Clone the Repository

2️⃣ Install Dependencies

`npm install`

3️⃣ Setup Environment Variables

Create a .env file and add the following:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
REACT_APP_GEMINI_API_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

NEXT_PUBLIC_APP_URL=

4️⃣ Run the Development Server

`npm run dev`

Application will be available at http://localhost:3000
