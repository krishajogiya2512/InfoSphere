# 🌐 InfoSphere – Multi-API Knowledge Dashboard

A modern React-based dashboard that aggregates real-time information from multiple public APIs into a single platform. Users can explore trending news, check weather conditions, and discover country information through an intuitive and responsive interface.

---

## Live Demo

Add your deployed link here:

```text
https://your-project-url.vercel.app
```

---

## Overview

InfoSphere is a multi-functional knowledge dashboard built using React and Vite. The application integrates multiple APIs to provide real-time data while demonstrating modern frontend development concepts such as component-based architecture, state management, API integration, search functionality, filtering, sorting, and responsive design.

---

## Objectives

* Integrate multiple public APIs into a single application
* Learn asynchronous data fetching using Fetch API
* Practice React component architecture
* Implement search, filtering, and sorting features
* Build a responsive and user-friendly interface
* Apply Context API for theme management
* Deploy a production-ready frontend application

---

## Features

### News Dashboard

* Fetch latest news articles
* Search news by keywords
* View article details
* Dynamic content rendering
* Real-time API integration

### Weather Dashboard

* Search weather by city
* Display temperature and weather conditions
* Real-time weather updates
* Clean weather information cards

### Countries Dashboard

* Search countries by name
* Filter countries by region
* Sort countries by population
* Display:

  * Country Flag
  * Capital
  * Region
  * Population
  * Currency Information

### UI Features

* Responsive design
* Dark Mode / Light Mode
* Modern dashboard layout
* Reusable React components
* Smooth user experience
* Loading and error handling

---

## Tech Stack

### Frontend

* React.js
* Vite
* JavaScript (ES6+)
* HTML5
* CSS3

### React Concepts

* Functional Components
* React Hooks
* useState
* useEffect
* Context API
* Component Reusability
* Conditional Rendering

### APIs

* News API
* OpenWeather API
* REST Countries API

### Tools

* Git
* GitHub
* VS Code
* Browser DevTools

---

## APIs Used

### News API

Provides latest news articles and headlines.

```text
https://newsapi.org
```

### OpenWeather API

Provides real-time weather information.

```text
https://openweathermap.org/api
```

### REST Countries API

Provides country-related information.

```text
https://restcountries.com
```

---

## 📂 Project Structure

```bash
InfoSphere/
│
├── api/
│   └── news.js
│
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   │
│   ├── context/
│   │   └── ThemeContext.jsx
│   │
│   ├── pages/
│   │   ├── News.jsx
│   │   ├── Weather.jsx
│   │   └── Countries.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/infosphere.git
```

### Navigate to Project

```bash
cd infosphere
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## Key Learnings

Through this project, I gained hands-on experience with:

* React Application Development
* API Integration
* Fetch API & Async JavaScript
* Context API
* State Management
* Search & Filtering Logic
* Responsive Web Design
* Component-Based Architecture
* Frontend Deployment

---

## Future Enhancements

* Favorite Articles using Local Storage
* Debounced Search
* Pagination
* Advanced Filters
* Weather Forecast Support
* Country Comparison Feature
* API Response Caching
* Progressive Web App (PWA)

---
