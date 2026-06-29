import { getAuth, createUserWithEmailAndPassword, doc, setDoc, getDocs, db, query, where, collection } from "../../fireconfig.js";

// Form elements - Check if they exist before accessing
let username = document.querySelector("#username");
let email = document.querySelector("#email");
let phone = document.querySelector("#phone");
let address = document.querySelector("#address");
let password = document.querySelector("#password");
let regLoader = document.querySelector(".loader");
let regText = document.querySelector(".reg-text");
let submitBtn = document.querySelector("button[type='submit']");
let form = document.querySelector("form");
let usernameError = document.querySelector("#usernameError");
let emailError = document.querySelector("#emailError");
let phoneError = document.querySelector("#phoneError");
let addressError = document.querySelector("#addressError");
let passwordError = document.querySelector("#passwordError");

// Only run form validation if form elements exist (registration page)
if (form && username && email && phone && address && password) {
  // Username validation function
  function validateUsername(usernameValue) {
    return usernameValue.trim().length >= 3;
  }

  // Event listener for real-time validation for username
  username.addEventListener("input", () => {
    if (validateUsername(username.value)) {
      username.classList.remove("invalid");
      usernameError.textContent = "";
    } else {
      username.classList.add("invalid");
      usernameError.textContent = "Username must be at least 3 characters long.";
    }
  });

  // Phone validation function
  function validatePhone(phoneValue) {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phoneValue.replace(/[\s\-()]/g, ""));
  }

  // Event listener for real-time validation for phone
  phone.addEventListener("input", () => {
    if (validatePhone(phone.value)) {
      phone.classList.remove("invalid");
      phoneError.textContent = "";
    } else {
      phone.classList.add("invalid");
      phoneError.textContent = "Please enter a valid phone number (10-15 digits).";
    }
  });

  // Address validation function
  function validateAddress(addressValue) {
    return addressValue.trim().length >= 5;
  }

  // Event listener for real-time validation for address
  address.addEventListener("input", () => {
    if (validateAddress(address.value)) {
      address.classList.remove("invalid");
      addressError.textContent = "";
    } else {
      address.classList.add("invalid");
      addressError.textContent = "Please enter a valid address (at least 5 characters).";
    }
  });

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
  function validatePassword(passwordValue) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(passwordValue);
  }

  // Event listener for real-time validation for password
  password.addEventListener("input", () => {
    if (validatePassword(password.value)) {
      password.classList.remove("invalid");
      passwordError.textContent = "";
    } else {
      password.classList.add("invalid");
      passwordError.textContent =
        "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.";
    }
  });

  // Form submission event listener
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    if (!validateUsername(username.value)) {
      usernameError.textContent = "Username must be at least 3 characters long.";
      username.classList.add("invalid");
      return;
    }
    if (!email.validity.valid) {
      emailError.textContent = "Please enter a valid email address.";
      email.classList.add("invalid");
      return;
    }
    if (!validatePhone(phone.value)) {
      phoneError.textContent = "Please enter a valid phone number (10-15 digits).";
      phone.classList.add("invalid");
      return;
    }
    if (!validateAddress(address.value)) {
      addressError.textContent = "Please enter a valid address (at least 5 characters).";
      address.classList.add("invalid");
      return;
    }
    if (!validatePassword(password.value)) {
      passwordError.textContent =
        "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.";
      password.classList.add("invalid");
      return;
    }
    
    regText.style.display = "none";
    submitBtn.disabled = true;
    regLoader.style.display = "inline-block";

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email.value));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      emailError.textContent = "User with this email already exists.";
      email.classList.add("invalid");
      regLoader.style.display = "none";
      regText.style.display = "inline-block";
      submitBtn.disabled = false;
      return;
    }

    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        const data = {
          username: username.value,
          email: email.value,
          phone: phone.value,
          address: address.value,
          password: password.value,
        }
        await setDoc(doc(db, "users", user.uid), data);
        regLoader.style.display = "none";
        regText.style.display = "inline-block";
        username.value = "";
        email.value = "";
        phone.value = "";
        address.value = "";
        password.value = "";
        submitBtn.disabled = false;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        regLoader.style.display = "none";
        regText.style.display = "inline-block";
        submitBtn.disabled = false;
        // ..
      });
  });
}
