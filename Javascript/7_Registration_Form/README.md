

# 🧾 Registration Form with Firebase Authentication

A simple registration form built with vanilla HTML, CSS, and JavaScript that validates user input and registers new users through Firebase Authentication.

## 🔗 Live Preview
[View the Registration form Live](https://saylani-assignment-nu.vercel.app/Javascript/7_Registration_Form/index.html)


## ✨ Features
- Email input with browser validation
- Password validation for:
  - minimum 8 characters
  - uppercase and lowercase letters
  - numbers
  - special characters
- Real-time validation feedback while typing
- Firebase Authentication via `createUserWithEmailAndPassword`
- Clean, minimal UI with responsive form layout

## 🚀 How to Use
1. Enter a valid email address.
2. Enter a strong password that follows the validation rules.
3. Click the **Register** button.
4. If validation passes, the app attempts to create a new Firebase user account.

## ✅ Validation Rules
- Email must be a valid email address
- Password must include:
  - at least one uppercase letter
  - at least one lowercase letter
  - at least one digit
  - at least one special character (`@$!%*?&`)
  - a minimum length of 8 characters

## 🧩 Project Structure
```text
D:\Saylani-Assignment\Javascript\7_Registration_Form\
├── index.html      # Registration form layout
├── style.css       # Form styling and responsive UI
├── app.js          # Validation and Firebase auth logic
├── fireconfig.js   # Firebase config and SDK imports
└── README.md       # Project documentation
```

## 🔧 Files Overview
- `index.html` — Contains the registration form markup
- `style.css` — Styles the form and error messages
- `app.js` — Handles input validation, form submission, and Firebase sign-up
- `fireconfig.js` — Initializes Firebase and exports auth utilities

## 📌 Notes
- This project uses Firebase Web SDK modules imported directly from the CDN.
- The app currently logs user creation responses and Firebase errors to the console.
- For production, add proper user feedback and secure Firebase rules.

## 📚 Learning Outcomes
- Client-side form validation with JavaScript
- Working with the Firebase Authentication API
- Structuring a small front-end project with modular JS

---
*Built as a practice project for user registration and authentication with Firebase.*
