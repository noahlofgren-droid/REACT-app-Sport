# Allsvenskan Explorer

A modern, responsive Next.js web application that allows users to explore teams in the Swedish football league, **Allsvenskan**. The app fetches data from [TheSportsDB](https://www.thesportsdb.com/) API, displays a comprehensive team directory, and provides detailed views for each team, including their recent matches, social media links, and club information.

## 🚀 Features

- **Next.js App Router**: Utilizes modern Next.js file-based routing and layout conventions.
- **Responsive Layout**: Designed from scratch using vanilla CSS Grid and Flexbox, fully optimized for mobile, tablet, and desktop screens.
- **Micro-Animations**: Clean, sporty dark-mode theme featuring smooth transitions, hover effects, and page load animations.
- **Robust Error Handling**: Dynamic loading states and error screens equipped with "Try Again" fallback triggers.
- **API Workaround Logic**: Built-in adaptation for free-tier API constraints.

---

## 🛠️ Tech Stack

- **Core**: [React](https://react.dev/) & [Next.js](https://nextjs.org/)
- **Styling**: Vanilla CSS (CSS variables, Custom properties)
- **Data Source**: TheSportsDB API (Free Tier)

---

## 💡 Technical Decisions & Workarounds

### 1. API Lookup Limitation Workaround
The free tier of TheSportsDB API has a known limitation where the single-team lookup endpoint (`lookupteam.php`) always returns data for Arsenal, regardless of the requested team ID.
* **Solution**: The detail page fetches the full league team list and uses JavaScript's `.find()` method to retrieve the correct team object locally.

### 2. Styling Strategy
Instead of relying on utility-first frameworks like Tailwind CSS, this project uses vanilla CSS custom properties (variables) to demonstrate core CSS capabilities — custom transitions, keyframe animations, and responsive media queries.

### 3. Error Handling
The free API is rate-limited and can be intermittently unavailable. All data-fetching functions use `try/catch/finally` blocks, and the UI provides a "Try Again" button so users can retry failed requests without refreshing the page.

---

## ⚙️ Getting Started

Install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the application.
