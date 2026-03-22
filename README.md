# Todo App | Multiple Implementations
## A project showcasing three distinct implementations of a Todo List application with advanced features (editing, sorting, and theme/language switching).
<p align="center">
  <figure>
    <img src="https://github.com/user-attachments/assets/971fb3ae-ca27-41f3-836d-a9b278485dec" alt="Todo App Screenshot" width="450"/>
    <figcaption><i>Screenshot of the Todo Application interface</i></figcaption>
  </figure>
</p>


## [Live Project](https://id753.github.io/todo-project/) 
⚠️ Note: The server is on a free plan, so it may take 30-50s to wake up 🚀 on the first load.
#### [Vanilla JS & Accessibility (a11y)](https://id753.github.io/todo-project/js)
#### [React & TypeScript](https://todo-project-zeta-ten.vercel.app)
#### [Redux Toolkit & Tailwind CSS](https://todo-project-redux.vercel.app)
## [Backend Code](https://github.com/id753/todo-project-api)

## Tech Stack
### 🎨 Frontend Tech Stack: React, TypeScript; State Management (Redux Toolkit: Thunk, Persist); Styling (Tailwind CSS, CSS Modules); Internationalization (i18next); Notifications (iziToast); Accessibility (a11y); Storage (localStorage); Build Tool (Vite)
### ⚙️ [Backend](https://github.com/id753/todo-project-api) Tech Stack: Node.js, Express.js, MongoDB, Mongoose; REST API; Validation (Joi, Celebrate); Logging (Pino); Error Handling; Pagination & Search; API Testing (Postman); Deployment (Render) 

## Features
### Frontend Experience
- 🎨 **Responsive UI:** Fully adaptive interface optimized for mobile and desktop.  
- ⚡ **State Management:** Efficient handling of application state (filters, lists, loading) using Redux Toolkit.  
- 💾 **Persistent Preferences:** Server-side synchronization of "Favorite" and "Completed" statuses for data persistence.  
- ♿ **Accessibility (A11y):** Semantic HTML and adherence to accessibility standards.  
- ⏱ **Real-time Feedback:** Loading states and API error handling enhance UX.  
- ✏️ **Self-designed UI/UX:** Developed versions using Vanilla JS (a11y focus), React + TypeScript, Redux Toolkit + Tailwind CSS.  
- ✅ **Best Practices:** Applied state management, styling, and accessibility principles throughout the project.

## Getting Started (Frontend)
Clone the repository
      
    git clone git@github.com:id753/todo-project.git
Install dependencies

     npm install
Environment Variables
Create a .env file in the root directory (use .env.example as a template):

    VITE_API_URL=http://localhost:3000
Run the app

    npm run dev
Open http://localhost:3000 in your browser.

## ⚠️ Note: The server is hosted on Render's free plan and may “sleep” when idle — the first load after waking up can take 30–50 seconds.
