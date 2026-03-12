# 🚀 CodeLeap Network - Technical Challenge

A modern, responsive, and performance-oriented social network application built as part of the CodeLeap frontend recruitment process. This project implements a central feed where users can share thoughts, interact with posts, and enjoy a seamless UI experience.

---

## 🌟 Key Features

### Core Functionality
- **User Identification**: Simple and persistent signup flow.
- **Thought Feed**: View, create, edit, and delete posts in real-time.
- **Content Persistence**: Saves your session locally so you don't have to re-enter your name.
- **Full CRUD**: Complete integration with the CodeLeap Careers API.

### 💎 Bonus Features (Extra Implementation)
- **Infinite Scrolling**: Automatically loads new posts as you reach the bottom of the feed using `IntersectionObserver`.
- **Mock Interactions**: "Fake" like and comment system with local persistence (`localStorage`), allowing for a fully interactive experience.
- **Smooth Animations**: High-quality transitions and entry animations powered by `framer-motion`.
- **Mobile First**: Fully responsive design optimized for everything from smartphones to wide-screen desktops.
- **Logout System**: Dedicated session management with the ability to clear data and switch users.
- **Hover & Micro-interactions**: Visual feedback on cards and buttons to enhance UX.

---

## 🛠️ Technologies Used

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Data Fetching**: [Axios](https://axios-http.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Formatting**: [date-fns](https://date-fns.org/)
- **Styling**: Vanilla CSS with modern practices (CSS Variables, Flexbox, Grid).

---

## 🏗️ Architecture & Decisions

### State Management
The application uses a centralized **Redux store** to manage:
- `user`: Handles session state and persistence.
- `posts`: Manages the API data, loading states, and pagination logic.
- `interactions`: A dedicated slice for mock likes and comments, ensuring they persist locally across refreshes.

### Infinite Scroll Logic
Instead of standard pagination buttons, I implemented a robust `IntersectionObserver` pattern in the `Feed` component. This provides a "native app" feel where content flows continuously.

### UI/UX Refinements
- **Stacking Context Correction**: Portaled-like logic (using Fragments) to ensure modals render outside transformed containers, preventing visual clipping.
- **User Feedback**: Immediate UI updates for local interactions and clear loading indicators for async operations.

### Documentation
The entire codebase is documented using **JSDoc** standards, explaining the intent, logic, and side effects of every function and component to assist future maintainers.

---

## 🚀 How to Run

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   cd codeleap
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---
*Created for the CodeLeap Frontend Challenge.*