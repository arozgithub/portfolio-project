# Personal Portfolio Web Application

## Description
This project is a **ReactJS-based single-page portfolio** that dynamically generates and displays user-provided content. It includes sections such as **Data Entry, Navbar, Hero, About Me, Projects, Contact, and Footer**, with features like dark mode, animated elements, and draggable project cards.

## Features

### 1. **Data Entry Page**
- Input fields for **student’s name, bio, profile picture, skills, interests, project details, and social media links**.
- "Add Social Media" button to allow multiple social media entries.
- "Submit/Generate" button that dynamically creates the portfolio page with the entered data.

### 2. **Navigation Bar (Navbar Component)**
- Responsive navigation bar adaptable to different screen sizes.
- Links to major sections (Home, About, Projects, Contact).
- Hamburger menu/dropdown for mobile views using `useState` for toggling visibility.

### 3. **Hero Section**
- Displays **student’s name, a short bio, and a call-to-action button** (e.g., "View My Work" or "Contact Me").
- Receives dynamic data via **props**.

### 4. **About Me Section**
- Showcases **profile picture, skills, and a detailed description**.
- Customizable using props.

### 5. **Projects Section**
- Displays at least **three projects** using a reusable `ProjectCard` component.
- Each project includes **title, description, image, and GitHub link**.
- **Draggable project cards** using `react-draggable` or `react-beautiful-dnd`.
- **Dynamic project data fetching** using `useEffect` (e.g., from Google Drive or GitHub).

### 6. **Contact Section**
- A **contact form** with fields for **name, email, and message**.
- Uses `useState` to manage input values.
- Displays a success message using `useEffect` upon submission.

### 7. **Footer**
- Displays **social media links** (LinkedIn, GitHub, Twitter, etc.).

### 8. **Extra Features**
- **Dark Mode Toggle**: Switch between light and dark themes using `useState`.
- **Animated Elements**: Implemented via CSS animations or `Framer Motion` for smooth transitions.
- **Dynamic Data Fetching**: Fetches project details dynamically from external sources.

## Technologies Used
- **ReactJS** (Frontend Framework)
- **TailwindCSS / Bootstrap** (Styling)
- **React Hooks (useState, useEffect)**
- **React Draggable / react-beautiful-dnd** (Drag-and-Drop Features)
- **Framer Motion** (Animations)
- **REST API** (For external data fetching)

## Installation & Usage
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/your-repository.git
   ```
2. Navigate to the project directory:
   ```sh
   cd portfolio-project
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```
5. Open your browser and visit `http://localhost:3000`.

## Deployment
- The project can be deployed using **Vercel, Netlify, or GitHub Pages**.
- Run:
  ```sh
  npm run build
  ```
- Follow hosting platform guidelines for deployment.


## Author
Developed by **Aroz Imran**

## License
This project is licensed under the **MIT License**.

