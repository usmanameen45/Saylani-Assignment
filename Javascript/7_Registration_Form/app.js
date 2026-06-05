import { getAuth, createUserWithEmailAndPassword} from "./fireconfig.js";

// DOM elements
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let form = document.querySelector("form");
let emailError = document.querySelector("#emailError");
let passwordError = document.querySelector("#passwordError");

// Event listeners for real-time validation for email
email.addEventListener("input", () => {
    if (email.validity.valid) {
        email.classList.remove("invalid");
        emailError.textContent = "";
    } else {
        email.classList.add("invalid");
        emailError.textContent = "Please enter a valid email address.";
    }
});

// Password validation function
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

// Event listener for real-time validation for password
password.addEventListener("input", () => {
    if (validatePassword(password.value)) {
        password.classList.remove("invalid");
        passwordError.textContent = "";
    } else {
        password.classList.add("invalid");
        passwordError.textContent = "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.";
    }
});

// Form submission event listener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!email.validity.valid ) {
    emailError.textContent = "Please enter a valid email address.";
    email.classList.add("invalid");
    return;
  }
  if (!validatePassword(password.value)) {
    passwordError.textContent = "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.";
    password.classList.add("invalid");
    return;
  }
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ..
    });
});

