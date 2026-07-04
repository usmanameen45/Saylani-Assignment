# PostHub ✨

A modern, polished, and user-friendly blogging experience built with vanilla JavaScript, Firebase Authentication, Firestore, and Cloudinary. PostHub lets users sign up, log in, create and manage personal posts, update their profile, and enjoy a smooth dashboard experience with thoughtful animations and responsive design.

## 🚀 Live Preview

- Open the app here: [Preview PostHub](https://saylani-assignment-nu.vercel.app/Javascript/7_Registration_Form/index.html)

## 🌟 Project Overview

PostHub is a simple yet elegant CRUD application where users can:

- Create an account or sign in securely
- Publish personal posts with titles and content
- Edit and delete their own posts
- Update their profile information and profile picture
- Enjoy a smooth, modern interface with animated feedback and transitions

## ✨ Key Features

- Secure authentication with email/password and Google sign-in
- Real-time user profile management
- Firestore-backed post storage for each signed-in user
- Cloudinary integration for profile image uploads
- Responsive layout for desktop and mobile screens
- Friendly UI with loading states, toast notifications, and modal animations

## 🎞️ UI & Animation Highlights

The experience includes several polished interactions such as:

- Smooth page transitions and reveal animations
- Animated loading indicators for forms and actions
- Toast notifications for success and error feedback
- Elegant modal popups for profile editing and account deletion
- Hover effects and card-based layout for a more immersive feel

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES Modules)
- Firebase Authentication
- Firebase Firestore
- Cloudinary for image uploads

## 📁 Project Structure

```text
.
├── app.js
├── fireconfig.js
├── index.html
├── style.css
├── assets/
│   ├── js/
│   │   ├── cloudinary.js
│   │   ├── dashboard.js
│   │   ├── login.js
│   │   └── register.js
│   └── pages/
│       ├── dashboard.html
│       ├── login.html
│       └── register.html
```

## ▶️ How to Run Locally

1. Clone the repository
2. Open the project folder in your preferred code editor
3. Launch a local development server
   - Example with VS Code Live Server
4. Open the preview in your browser

> If you want to use the image upload feature, make sure your Cloudinary credentials are configured correctly in the project files.

## 🔐 Authentication Flow

The app supports:

- User registration with validation
- Login with email/password
- Google sign-in
- Password reset support
- Secure account deletion for both email/password and Google users

## 💡 Why This Project Stands Out

PostHub combines a clean design, practical CRUD functionality, and modern authentication into one simple web app. It is a great example of how a beginner-friendly JavaScript project can still feel polished, interactive, and professional.

## 🤝 Contributing

Feel free to fork the project, improve the UI, add new features, or refine the experience. Contributions are always welcome.

## 📌 Notes

This project is ideal for learning:

- Firebase integration
- Auth state management
- Firestore CRUD operations
- Responsive UI development
- Modern web app UX patterns
