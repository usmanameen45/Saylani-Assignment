import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  doc,
  setDoc,
  getDoc,
  db,
} from "../../fireconfig.js";

/* ---- DOM refs ---- */
const pageLoader    = document.getElementById("pageLoader");
const authCard      = document.getElementById("authCard");
const form          = document.getElementById("loginForm");
const emailInput    = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn     = document.getElementById("submitBtn");
const globalError   = document.getElementById("globalError");
const emailErr      = document.getElementById("emailError");
const passwordErr   = document.getElementById("passwordError");

const auth = getAuth();

/* ---- Auth guard: redirect if already logged in ---- */
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.replace("dashboard.html");
  } else {
    pageLoader.classList.add("hidden");
    setTimeout(() => {
      pageLoader.style.display = "none";
      authCard.style.display = "block";
    }, 320);
  }
});

/* ---- Helpers ---- */
function setError(input, errEl, message) {
  if (message) {
    input.classList.add("invalid");
    errEl.textContent = message;
  } else {
    input.classList.remove("invalid");
    errEl.textContent = "";
  }
}

/* ---- Real-time validation ---- */
emailInput.addEventListener("input", () => {
  setError(emailInput, emailErr, emailInput.validity.valid ? "" : "Enter a valid email.");
});

passwordInput.addEventListener("input", () => {
  setError(passwordInput, passwordErr, passwordInput.value.length >= 8 ? "" : "Password is too short.");
});

/* ---- Submit ---- */
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  globalError.classList.remove("visible");

  let valid = true;

  if (!emailInput.validity.valid) {
    setError(emailInput, emailErr, "Enter a valid email.");
    valid = false;
  }
  if (passwordInput.value.length < 8) {
    setError(passwordInput, passwordErr, "Password is too short.");
    valid = false;
  }

  if (!valid) return;

  submitBtn.classList.add("loading");
  submitBtn.disabled = true;

  try {
    await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    window.location.replace("dashboard.html");
  } catch (error) {
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;

    const messages = {
      "auth/invalid-credential":     "Incorrect email or password.",
      "auth/user-not-found":         "No account found with this email.",
      "auth/wrong-password":         "Incorrect password.",
      "auth/too-many-requests":      "Too many attempts. Try again later.",
      "auth/network-request-failed": "Network error. Check your connection.",
      "auth/user-disabled":          "This account has been disabled.",
    };
    const msg = messages[error.code] || "Sign in failed. Please try again.";
    globalError.textContent = msg;
    globalError.classList.add("visible");
  }
});

/* ---- Google Sign In ---- */
const googleBtn = document.getElementById("googleBtn");
if (googleBtn) {
  googleBtn.addEventListener("click", async () => {
    globalError.classList.remove("visible");
    googleBtn.classList.add("loading");
    googleBtn.disabled = true;

    try {
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
      googleBtn.classList.remove("loading");
      googleBtn.disabled = false;
      console.error("Google Sign-In error:", error);

      const messages = {
        "auth/popup-closed-by-user": "Sign-in popup was closed before completion.",
        "auth/cancelled-popup-request": "Sign-in request was cancelled.",
        "auth/network-request-failed": "Network error. Check your connection.",
      };
      const msg = messages[error.code] || "Google authentication failed. Please try again.";
      globalError.textContent = msg;
      globalError.classList.add("visible");
    }
  });
}

/* ---- Forgot Password Modal ---- */
const forgotLink = document.getElementById("forgotPasswordLink");
const forgotModal = document.getElementById("forgotPasswordModal");
const closeForgotBtn = document.getElementById("closeForgotModalBtn");
const cancelForgotBtn = document.getElementById("cancelForgotBtn");
const forgotForm = document.getElementById("forgotPasswordForm");
const forgotEmailInput = document.getElementById("forgotEmail");
const forgotEmailError = document.getElementById("forgotEmailError");
const sendResetBtn = document.getElementById("sendResetBtn");

if (forgotLink) {
  forgotLink.addEventListener("click", (e) => {
    e.preventDefault();
    forgotEmailInput.value = "";
    forgotEmailError.textContent = "";
    forgotEmailInput.classList.remove("invalid");
    forgotModal.classList.add("visible");
    setTimeout(() => forgotEmailInput.focus(), 150);
  });
}

const hideForgotModal = () => {
  if (forgotModal) forgotModal.classList.remove("visible");
};

if (closeForgotBtn) closeForgotBtn.addEventListener("click", hideForgotModal);
if (cancelForgotBtn) cancelForgotBtn.addEventListener("click", hideForgotModal);

if (forgotForm) {
  forgotForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    forgotEmailError.textContent = "";
    forgotEmailInput.classList.remove("invalid");

    const email = forgotEmailInput.value.trim();
    if (!forgotEmailInput.validity.valid || !email) {
      forgotEmailInput.classList.add("invalid");
      forgotEmailError.textContent = "Enter a valid email address.";
      return;
    }

    sendResetBtn.classList.add("loading");
    sendResetBtn.disabled = true;

    try {
      await sendPasswordResetEmail(auth, email);
      alert("A password reset email has been sent to: " + email);
      hideForgotModal();
    } catch (error) {
      console.error("Password reset error:", error);
      let msg = "Failed to send reset email. Please try again.";
      if (error.code === "auth/user-not-found") {
        msg = "No account found with this email.";
      } else if (error.code === "auth/invalid-email") {
        msg = "Invalid email address.";
      } else if (error.code === "auth/network-request-failed") {
        msg = "Network error. Check your connection.";
      }
      forgotEmailInput.classList.add("invalid");
      forgotEmailError.textContent = msg;
    } finally {
      sendResetBtn.classList.remove("loading");
      sendResetBtn.disabled = false;
    }
  });
}
