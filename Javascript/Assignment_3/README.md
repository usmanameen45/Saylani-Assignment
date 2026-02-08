# 🎨 ChromaMatch - Color Selection Game

A vibrant, interactive web-based game designed to test your visual reflexes and color recognition. Built with a focus on clean code, DOM manipulation, and engaging user experience.

[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://saylani-assignment-nu.vercel.app/Javascript/Assignment_3/index.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🚀 Overview

**ChromaMatch** is a minimalist yet addictive color-matching game. The objective is simple: identify and click the tile that matches the target color displayed at the top. As you progress, the challenge continues with dynamic color shifts and a limited life system.

This project demonstrates core front-end development skills, including dynamic UI rendering, event-driven programming, and state management without external libraries.

## ✨ Features

-   **Dynamic Target System:** A target color is randomly generated for each round.
-   **Live Score Tracking:** Real-time score updates as you successfully match colors.
-   **Health System:** Start with 3 lives (represented by ❤️). Every mistake costs a life, adding an element of risk and strategy.
-   **Responsive Grid:** A 20-tile interactive grid that adapts to your screen.
-   **Instant Feedback:** Visual updates and alerts provide immediate feedback on game state and game-over conditions.
-   **Automatic Reset:** Seamless transition from game-over back to a fresh start.

## 🛠️ Technologies Used

-   **HTML5:** Semantic structure for the game layout.
-   **CSS3:** Custom styling with Flexbox for a responsive and centered UI.
-   **JavaScript (ES6):**
    -   Dynamic DOM creation and manipulation.
    -   Event delegation for efficient click handling.
    -   State management for scores and lives.
    -   Randomization algorithms for game logic.

## 🎮 How to Play

1.  **Identify the Target:** Look at the large color box in the header.
2.  **Find the Match:** Scan the 20 tiles below to find the one matching the target.
3.  **Click to Score:** Click the correct tile to gain +1 point. A new target will appear!
4.  **Watch Your Lives:** Clicking the wrong color will cost you one ❤️.
5.  **Game Over:** Once you lose all 3 lives, the game ends. Try to beat your high score!

## 📂 Project Structure

```text
Assignment_3/
├── index.html   # Main entry point and game structure
├── style.css    # Visual styling and layout configurations
└── script.js    # Game logic, state management, and DOM manipulation
```

## 👨‍💻 Development Insights

In this project, I focused on:
-   **Efficient Event Handling:** Using a single event listener on the parent container (`main`) to handle clicks on all 20 dynamic divs, showcasing an understanding of event bubbling.
-   **Dry Principle:** Implementing reusable functions for color randomization to keep the codebase clean and maintainable.
-   **UX/UI:** Ensuring the interface is intuitive and the game loop is satisfyingly fast.

---

## 🔗 Live Link
Check out the live project here: [Live Demo](https://saylani-assignment-nu.vercel.app/Javascript/Assignment_3/index.html)

---

*Developed with ❤️ by Muhammad Usman Ameen*
