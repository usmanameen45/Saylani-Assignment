import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  getDoc,
  getDocs,
  db,
  query,
  where,
  collection,
  GoogleAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
} from "../../fireconfig.js";

/* ---- DOM refs ---- */
const pageLoader  = document.getElementById("pageLoader");
const authCard    = document.getElementById("authCard");
const form        = document.getElementById("registerForm");
const nameInput   = document.getElementById("name");
const emailInput  = document.getElementById("email");
const phoneInput  = document.getElementById("phone");
const addressInput = document.getElementById("address");
const passwordInput = document.getElementById("password");
const submitBtn   = document.getElementById("submitBtn");
const globalError = document.getElementById("globalError");

const nameErr     = document.getElementById("nameError");
const emailErr    = document.getElementById("emailError");
const phoneErr    = document.getElementById("phoneError");
const addressErr  = document.getElementById("addressError");
const passwordErr = document.getElementById("passwordError");

const auth = getAuth();

/* ---- Registration state flag to prevent premature redirect ---- */
let isRegistering = false;

/* ---- Auth guard: redirect if already logged in ---- */
onAuthStateChanged(auth, (user) => {
  if (user) {
    if (!isRegistering) {
      window.location.replace("dashboard.html");
    }
  } else {
    // User not logged in — show the form
    pageLoader.classList.add("hidden");
    setTimeout(() => {
      pageLoader.style.display = "none";
      authCard.style.display = "block";
    }, 320);
  }
});

/* ---- Validation helpers ---- */
function setError(input, errEl, message) {
  if (message) {
    input.classList.add("invalid");
    errEl.textContent = message;
  } else {
    input.classList.remove("invalid");
    errEl.textContent = "";
  }
}

function validateName(val)     { return val.trim().length >= 3; }
function validatePhone(val)    { return /^[0-9]{10,15}$/.test(val.replace(/[\s\-()]/g, "")); }
function validateAddress(val)  { return val.trim().length >= 5; }
function validatePassword(val) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(val);
}

/* ---- Real-time validation ---- */
nameInput.addEventListener("input", () => {
  setError(nameInput, nameErr, validateName(nameInput.value) ? "" : "At least 3 characters.");
});
emailInput.addEventListener("input", () => {
  setError(emailInput, emailErr, emailInput.validity.valid ? "" : "Enter a valid email.");
});
phoneInput.addEventListener("input", () => {
  setError(phoneInput, phoneErr, validatePhone(phoneInput.value) ? "" : "10-15 digits only.");
});
addressInput.addEventListener("input", () => {
  setError(addressInput, addressErr, validateAddress(addressInput.value) ? "" : "At least 5 characters.");
});
passwordInput.addEventListener("input", () => {
  setError(passwordInput, passwordErr,
    validatePassword(passwordInput.value) ? "" : "Min 8 chars with upper, lower, number, and symbol.");
});

/* ---- Submit ---- */
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  globalError.classList.remove("visible");

  // Run all validations first
  let valid = true;

  if (!validateName(nameInput.value)) {
    setError(nameInput, nameErr, "At least 3 characters.");
    valid = false;
  }
  if (!emailInput.validity.valid) {
    setError(emailInput, emailErr, "Enter a valid email.");
    valid = false;
  }
  if (!validatePhone(phoneInput.value)) {
    setError(phoneInput, phoneErr, "10-15 digits only.");
    valid = false;
  }
  if (!validateAddress(addressInput.value)) {
    setError(addressInput, addressErr, "At least 5 characters.");
    valid = false;
  }
  if (!validatePassword(passwordInput.value)) {
    setError(passwordInput, passwordErr, "Min 8 chars with upper, lower, number, and symbol.");
    valid = false;
  }

  if (!valid) return;

  // Show loading state
  submitBtn.classList.add("loading");
  submitBtn.disabled = true;

  try {
    // Check if user email already exists in our users collection
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", emailInput.value));
    const snapshot = await getDocs(q);

    if (snapshot.size > 0) {
      setError(emailInput, emailErr, "An account with this email already exists.");
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
      return;
    }

    // Set registering flag to true to prevent premature auth state redirection
    isRegistering = true;

    // Create Firebase auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      emailInput.value,
      passwordInput.value
    );

    const user = userCredential.user;
    console.log("user created: ", user);

    // Save extra profile data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      name:    nameInput.value.trim(),
      email:   emailInput.value.trim(),
      phone:   phoneInput.value.trim(),
      address: addressInput.value.trim(),
    });

    // Redirect to dashboard
    window.location.replace("dashboard.html");

  } catch (error) {
    isRegistering = false;
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;

    if (error.code === "auth/email-already-in-use") {
      // Check whether the existing account was created via Google
      try {
        const methods = await fetchSignInMethodsForEmail(auth, emailInput.value.trim());
        if (methods.includes("google.com") && !methods.includes("password")) {
          // Purely a Google account — guide the user clearly
          setError(
            emailInput,
            emailErr,
            "This email is already linked to a Google account. Please sign in with Google instead."
          );
          globalError.innerHTML =
            `This email was previously registered via Google Sign-In. ` +
            `<a href="login.html" style="color:inherit;text-decoration:underline;font-weight:600;">Go to Sign In</a> ` +
            `and click "Continue with Google" to access your account.`;
          globalError.classList.add("visible");
          return;
        }
      } catch (_) {
        // fetchSignInMethodsForEmail failed — fall through to generic message
      }
      // Standard email/password duplicate
      setError(emailInput, emailErr, "An account with this email already exists.");
      return;
    }

    // Map other Firebase error codes to readable messages
    const messages = {
      "auth/weak-password": "Password is too weak.",
      "auth/network-request-failed": "Network error. Check your connection.",
    };
    const msg = messages[error.code] || "Registration failed. Please try again.";
    globalError.textContent = msg;
    globalError.classList.add("visible");
  }
});

/* ---- Google Sign Up ---- */
const googleBtn = document.getElementById("googleBtn");
if (googleBtn) {
  googleBtn.addEventListener("click", async () => {
    globalError.classList.remove("visible");
    googleBtn.classList.add("loading");
    googleBtn.disabled = true;

    try {
      isRegistering = true;
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Sync user profile data to Firestore if they don't already have a document
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          name: user.displayName || "Google User",
          email: user.email,
          phone: "",
          address: "",
          photoURL: user.photoURL || "",
        });
      }

      // Redirect to dashboard
      window.location.replace("dashboard.html");

    } catch (error) {
      isRegistering = false;
      googleBtn.classList.remove("loading");
      googleBtn.disabled = false;
      console.error("Google Authentication error:", error);

      // Handle common Firebase Google Auth errors
      const messages = {
        "auth/popup-closed-by-user": "Sign-in popup was closed before completion.",
        "auth/cancelled-popup-request": "Sign-in request was cancelled.",
        "auth/network-request-failed": "Network error. Check your connection.",
        "auth/account-exists-with-different-credential": "An account already exists with a different credential.",
      };
      const msg = messages[error.code] || "Google authentication failed. Please try again.";
      globalError.textContent = msg;
      globalError.classList.add("visible");
    }
  });
}
