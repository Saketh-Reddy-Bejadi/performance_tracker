# CodeTrackr: Competitive Programming Leaderboard

CodeTrackr is a web application designed to track and display competitive programming performance for students. It provides a unified leaderboard by scraping and syncing scores from various platforms, allowing users to monitor their progress and compete with peers. The application also features a secure handle update mechanism using OTP verification.

## Features

*   **Dynamic Leaderboards:** View sorted leaderboards for different batches (e.g., 2026, 2027) with student performance metrics across multiple competitive programming platforms.
*   **Search Functionality:** Easily search for students by roll number or competitive programming handles.
*   **Handle Management:** Securely update competitive programming handles via an email OTP verification process.
*   **Real-time Scraping Stats:** Displays the last updated timestamp for the leaderboard data.
*   **Responsive Design:** Optimized for both mobile and desktop viewing.
*   **Interactive UI:** Utilizes `magicui` components for enhanced visual appeal.

## Technologies Used

*   **Frontend:**
    *   React.js: A JavaScript library for building user interfaces.
    *   Vite: A fast build tool for modern web projects.
    *   Tailwind CSS: A utility-first CSS framework for rapid UI development.
    *   `@tailwindcss/vite`: Tailwind CSS integration for Vite.
    *   `react-router-dom`: Declarative routing for React.js.
    *   `axios`: Promise-based HTTP client for API requests.
    *   `clsx` and `tailwind-merge`: Utilities for conditionally joining CSS class names.
    *   `lucide-react`, `react-icons`: Icon libraries.
    *   `motion`: Animation library.
    *   `magicui`: Custom UI components (`AnimatedGridPattern`, `ShimmerButton`).
*   **Linting:**
    *   ESLint: Pluggable JavaScript linter.
    *   `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`: ESLint configurations and plugins for React.

## Project Structure

```
.
├── public/
│   └── Codetrackr.svg       # Application logo
├── src/
│   ├── components/
│   │   ├── Attributes.jsx      # Table header for leaderboard
│   │   ├── Footer.jsx          # Application footer with navigation and links
│   │   ├── HandleUpdate.jsx    # Component for updating user handles with OTP
│   │   ├── Hero.jsx            # Landing page hero section
│   │   ├── Home.jsx            # Home page component
│   │   ├── LeaderBoardOutline.jsx # Main leaderboard display component
│   │   ├── SkeletonLoader.jsx  # Loading skeleton for the leaderboard
│   │   ├── StudentData.jsx     # Displays individual student data in the leaderboard
│   │   └── magicui/            # Custom UI components
│   │       ├── animated-grid-pattern.jsx
│   │       └── shimmer-button.jsx
│   ├── lib/
│   │   └── utils.js            # Utility functions (e.g., for Tailwind CSS class merging)
│   ├── services/
│   │   └── api.js              # API service for interacting with the backend
│   ├── App.jsx                 # Main application component with routing
│   ├── index.css               # Global styles and Tailwind CSS imports
│   └── main.jsx                # React entry point
├── .gitignore                  # Git ignore patterns
├── components.json             # Configuration for UI components (likely shadcn/ui related)
├── eslint.config.js            # ESLint configuration
├── index.html                  # Main HTML file
├── jsconfig.json               # JavaScript compiler options and path aliases
├── package-lock.json           # npm dependency lock file
├── package.json                # Project metadata and dependencies
├── README.md                   # Project README
└── vercel.json                 # Vercel deployment configuration
```

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm (comes with Node.js) or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Saketh-Reddy-Bejadi/performance_tracker.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd performance_tracker
    ```
3.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```
VITE_API_BASE_URL=YOUR_BACKEND_API_URL
VITE_TOKEN=YOUR_AUTH_TOKEN
```

Replace `YOUR_BACKEND_API_URL` with the base URL of your backend API and `YOUR_AUTH_TOKEN` with the appropriate authorization token.

### Running the Application

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will typically run on `http://localhost:5173` (or another available port).

To run the application on your network:

```bash
npm run host
# or
yarn host
```

### Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

This will create a `dist` directory with the production-ready build.

## API Integration

The application interacts with a backend API for fetching user data, scraping statistics, and managing user handles. The API endpoints are defined in `src/services/api.js`.

## Deployment

The project is configured for deployment on Vercel, with a rewrite rule in `vercel.json` to serve `index.html` for all routes, which is typical for Single Page Applications (SPAs).

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---