import {
  getAuth,
  onAuthStateChanged,
  signOut,
  doc,
  getDoc,
  db,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
  updateProfile,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  EmailAuthProvider,
  GoogleAuthProvider,
  deleteUser,
} from "../../fireconfig.js";

import {
  getCloudinaryPublicId,
  uploadToCloudinary,
  deleteFromCloudinary,
} from "./cloudinary.js";

const auth = getAuth();

/* ---- DOM refs ---- */
const pageLoader      = document.getElementById("pageLoader");
const mainNav         = document.getElementById("mainNav");
const dashboardLayout = document.getElementById("dashboardLayout");
const navUserName     = document.getElementById("navUserName");
const logoutBtn       = document.getElementById("logoutBtn");

// Profile Display
const profileAvatar  = document.getElementById("profileAvatar");
const profileName    = document.getElementById("profileName");
const profileEmail   = document.getElementById("profileEmail");
const profilePhone   = document.getElementById("profilePhone");
const profileAddress = document.getElementById("profileAddress");

// Profile Actions & Modals
const editProfileBtn        = document.getElementById("editProfileBtn");
const editProfileModal      = document.getElementById("editProfileModal");
const closeProfileModalBtn  = document.getElementById("closeProfileModalBtn");
const cancelProfileBtn      = document.getElementById("cancelProfileBtn");
const editProfileForm       = document.getElementById("editProfileForm");
const editProfileName       = document.getElementById("editProfileName");
const editProfilePhone      = document.getElementById("editProfilePhone");
const editProfileAddress    = document.getElementById("editProfileAddress");
const editProfilePhoto      = document.getElementById("editProfilePhoto");
const editProfilePhotoFile  = document.getElementById("editProfilePhotoFile");
const editProfilePhotoPreview = document.getElementById("editProfilePhotoPreview");
const imagePreviewContainer = document.getElementById("imagePreviewContainer");
const saveProfileBtn        = document.getElementById("saveProfileBtn");

const editProfileNameErr    = document.getElementById("editProfileNameErr");
const editProfilePhoneErr   = document.getElementById("editProfilePhoneErr");
const editProfileAddressErr = document.getElementById("editProfileAddressErr");
const editProfilePhotoErr   = document.getElementById("editProfilePhotoErr");

const deleteAccountBtn      = document.getElementById("deleteAccountBtn");
const deleteAccountModal    = document.getElementById("deleteAccountModal");
const closeDeleteModalBtn   = document.getElementById("closeDeleteModalBtn");
const cancelDeleteBtn       = document.getElementById("cancelDeleteBtn");
const deleteAccountForm     = document.getElementById("deleteAccountForm");
const deleteConfirmPassword = document.getElementById("deleteConfirmPassword");
const deletePasswordErr     = document.getElementById("deletePasswordErr");
const confirmDeleteBtn      = document.getElementById("confirmDeleteBtn");
const deletePasswordGroup   = document.getElementById("deletePasswordGroup");
const deleteGoogleGroup     = document.getElementById("deleteGoogleGroup");
const deleteGoogleErr       = document.getElementById("deleteGoogleErr");
const googleReauthBtn       = document.getElementById("googleReauthBtn");

// Posts UI
const newPostBtn     = document.getElementById("newPostBtn");
const emptyNewBtn    = document.getElementById("emptyNewBtn");
const composeBox     = document.getElementById("composeBox");
const composeTitle   = document.getElementById("composeTitle");
const composeForm    = document.getElementById("composeForm");
const postTitleInput = document.getElementById("postTitle");
const postBodyInput  = document.getElementById("postBody");
const cancelBtn      = document.getElementById("cancelBtn");
const saveBtn        = document.getElementById("saveBtn");
const composeError   = document.getElementById("composeError");
const skeletonLoader = document.getElementById("skeletonLoader");
const emptyState     = document.getElementById("emptyState");
const postsList      = document.getElementById("postsList");
const toast          = document.getElementById("toast");

let currentUser = null;

/* ---- Toast helper ---- */
let toastTimer;
function showToast(message, isError = false) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.className = "toast visible" + (isError ? " error-toast" : "");
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 3000);
}

/* ---- Auth guard ---- */
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.replace("login.html");
    return;
  }

  currentUser = user;

  // Reveal the UI
  pageLoader.classList.add("hidden");
  setTimeout(() => {
    pageLoader.style.display = "none";
    mainNav.style.display = "flex";
    dashboardLayout.style.display = "grid";
  }, 320);

  await loadProfile(user.uid);
  await loadPosts(user.uid);
});

// Avatar background choices with guaranteed readability contrast
const AVATAR_PALETTES = [
  { bg: "#eff6ff", text: "#1e40af" }, // Blue
  { bg: "#f0fdf4", text: "#166534" }, // Green
  { bg: "#fff7ed", text: "#9a3412" }, // Orange
  { bg: "#fdf2f8", text: "#9d174d" }, // Pink
  { bg: "#faf5ff", text: "#6b21a8" }, // Purple
  { bg: "#fff1f2", text: "#9f1239" }, // Rose
  { bg: "#fefce8", text: "#854d0e" }, // Yellow
  { bg: "#f0fdfa", text: "#115e59" }  // Teal
];

function getInitials(name) {
  return (name || "?")
    .split(" ")
    .map(w => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function setAvatar(container, name, photoURL) {
  container.innerHTML = "";
  
  // Choose random palette
  const palette = AVATAR_PALETTES[Math.floor(Math.random() * AVATAR_PALETTES.length)];
  container.style.backgroundColor = palette.bg;
  container.style.color = palette.text;
  
  if (photoURL) {
    const img = document.createElement("img");
    img.src = photoURL;
    img.alt = name || "User Avatar";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.borderRadius = "50%";
    img.style.objectFit = "cover";
    img.style.display = "block";
    img.onerror = () => {
      img.remove();
      container.textContent = getInitials(name);
    };
    container.appendChild(img);
  } else {
    container.textContent = getInitials(name);
  }
}

/* ---- Load user profile ---- */
async function loadProfile(uid) {
  try {
    const snap = await getDoc(doc(db, "users", uid));
    if (!snap.exists()) return;
    
    const data = snap.data();
    
    // Fetch photoURL from currentUser of the auth instance, fallback to Firestore if needed
    const photoURL = currentUser.photoURL || data.photoURL || "";
    const name = data.name || currentUser.displayName || "-";
    
    setAvatar(profileAvatar, name, photoURL);
    
    profileName.textContent    = name;
    profileEmail.textContent   = data.email || currentUser.email || "-";
    profilePhone.textContent   = data.phone || "-";
    profileAddress.textContent = data.address || "-";
    navUserName.textContent    = name !== "-" ? name.split(" ")[0] : "";
  } catch (err) {
    console.error("Profile load error:", err);
  }
}

/* ---- Load posts ---- */
async function loadPosts(uid) {
  skeletonLoader.style.display = "flex";
  postsList.innerHTML = "";
  emptyState.classList.remove("visible");

  try {
    const q = query(collection(db, "posts"), where("uid", "==", uid));
    const snapshot = await getDocs(q);

    skeletonLoader.style.display = "none";

    if (snapshot.empty) {
      emptyState.classList.add("visible");
      return;
    }

    // Sort by createdAt descending (client-side)
    const docs = [];
    snapshot.forEach(d => docs.push({ id: d.id, ...d.data() }));
    docs.sort((a, b) => {
      const ta = a.createdAt?.seconds || 0;
      const tb = b.createdAt?.seconds || 0;
      return tb - ta;
    });

    docs.forEach(post => postsList.appendChild(buildPostCard(post)));

  } catch (err) {
    skeletonLoader.style.display = "none";
    showToast("Failed to load posts.", true);
    console.error(err);
  }
}

/* ---- Escape HTML to prevent XSS ---- */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ---- Format date ---- */
function formatDate(createdAt) {
  if (!createdAt?.seconds) return "Just now";
  return new Date(createdAt.seconds * 1000).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

/* ---- Build a post card element ---- */
function buildPostCard(post) {
  const card = document.createElement("div");
  card.className = "post-card";
  card.id = `card-${post.id}`;

  card.innerHTML = `
    <div class="post-view" id="view-${post.id}">
      <div class="post-card-header">
        <div class="post-title">${escapeHtml(post.title)}</div>
        <div class="post-card-actions">
          <button class="btn-icon" title="Edit post" data-action="edit" data-id="${post.id}">&#9998;</button>
          <button class="btn-icon delete" title="Delete post" data-action="delete" data-id="${post.id}">&#128465;</button>
        </div>
      </div>
      <div class="post-body">${escapeHtml(post.body)}</div>
      <div class="post-meta">${formatDate(post.createdAt)}</div>
    </div>

    <div class="edit-form" id="edit-${post.id}">
      <input type="text" id="edit-title-${post.id}" value="${escapeHtml(post.title)}" maxlength="120" placeholder="Title">
      <textarea id="edit-body-${post.id}" placeholder="Post body...">${escapeHtml(post.body)}</textarea>
      <div class="compose-actions">
        <button type="button" class="btn-cancel" data-action="cancel-edit" data-id="${post.id}">Cancel</button>
        <button type="button" class="btn-save" data-action="save-edit" data-id="${post.id}">
          <span class="save-label">Save</span>
          <span class="btn-spinner"></span>
        </button>
      </div>
    </div>
  `;

  return card;
}

/* ---- Delegated event listener for post actions ---- */
postsList.addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;

  const action = btn.dataset.action;
  const postId = btn.dataset.id;

  if (action === "edit") {
    document.getElementById(`view-${postId}`).classList.add("hidden");
    document.getElementById(`edit-${postId}`).classList.add("visible");
    document.getElementById(`edit-title-${postId}`).focus();
  }

  if (action === "cancel-edit") {
    document.getElementById(`edit-${postId}`).classList.remove("visible");
    document.getElementById(`view-${postId}`).classList.remove("hidden");
  }

  if (action === "save-edit") {
    const titleInput = document.getElementById(`edit-title-${postId}`);
    const bodyInput  = document.getElementById(`edit-body-${postId}`);
    const title = titleInput.value.trim();
    const body  = bodyInput.value.trim();

    if (!title || !body) {
      showToast("Title and body are required.", true);
      return;
    }

    btn.classList.add("loading");
    btn.disabled = true;

    try {
      await updateDoc(doc(db, "posts", postId), { title, body });

      const viewEl = document.getElementById(`view-${postId}`);
      viewEl.querySelector(".post-title").textContent = title;
      viewEl.querySelector(".post-body").textContent  = body;

      document.getElementById(`edit-${postId}`).classList.remove("visible");
      document.getElementById(`view-${postId}`).classList.remove("hidden");
      showToast("Post updated.");
    } catch (err) {
      showToast("Update failed.", true);
      console.error(err);
    } finally {
      btn.classList.remove("loading");
      btn.disabled = false;
    }
  }

  if (action === "delete") {
    if (!confirm("Delete this post?")) return;
    try {
      await deleteDoc(doc(db, "posts", postId));
      const card = document.getElementById(`card-${postId}`);
      if (card) card.remove();
      if (postsList.children.length === 0) {
        emptyState.classList.add("visible");
      }
      showToast("Post deleted.");
    } catch (err) {
      showToast("Delete failed.", true);
      console.error(err);
    }
  }
});

/* ---- Compose new post ---- */
function openCompose() {
  composeTitle.textContent = "New post";
  saveBtn.querySelector(".save-label").textContent = "Publish";
  postTitleInput.value = "";
  postBodyInput.value  = "";
  composeError.textContent = "";
  composeBox.classList.add("visible");
  postTitleInput.focus();
}

newPostBtn.addEventListener("click", openCompose);
emptyNewBtn.addEventListener("click", openCompose);

cancelBtn.addEventListener("click", () => {
  composeBox.classList.remove("visible");
});

composeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  composeError.textContent = "";

  const title = postTitleInput.value.trim();
  const body  = postBodyInput.value.trim();

  if (!title || !body) {
    composeError.textContent = "Both title and body are required.";
    return;
  }

  saveBtn.classList.add("loading");
  saveBtn.disabled = true;

  try {
    const docRef = await addDoc(collection(db, "posts"), {
      uid: currentUser.uid,
      title,
      body,
      createdAt: serverTimestamp(),
    });

    // Prepend new card with local timestamp (server timestamp arrives async)
    const newPost = {
      id: docRef.id,
      title,
      body,
      createdAt: { seconds: Math.floor(Date.now() / 1000) },
    };

    emptyState.classList.remove("visible");
    postsList.insertBefore(buildPostCard(newPost), postsList.firstChild);
    composeBox.classList.remove("visible");
    showToast("Post published.");
  } catch (err) {
    composeError.textContent = "Failed to publish. Try again.";
    console.error(err);
  } finally {
    saveBtn.classList.remove("loading");
    saveBtn.disabled = false;
  }
});

/* ---- Logout ---- */
logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    window.location.replace("login.html");
  } catch (err) {
    showToast("Sign out failed.", true);
  }
});

/* ---- File input: show live preview when user picks an image ---- */
if (editProfilePhotoFile) {
  editProfilePhotoFile.addEventListener("change", () => {
    const file = editProfilePhotoFile.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      editProfilePhotoPreview.src = objectUrl;
      imagePreviewContainer.style.display = "block";
    }
  });
}

/* ---- Edit Profile Event Listeners ---- */
editProfileBtn.addEventListener("click", async () => {
  editProfileNameErr.textContent = "";
  editProfilePhoneErr.textContent = "";
  editProfileAddressErr.textContent = "";
  editProfilePhotoErr.textContent = "";
  // Reset file input and preview
  if (editProfilePhotoFile) editProfilePhotoFile.value = "";

  try {
    const snap = await getDoc(doc(db, "users", currentUser.uid));
    if (snap.exists()) {
      const data = snap.data();
      editProfileName.value = data.name || currentUser.displayName || "";
      editProfilePhone.value = data.phone || "";
      editProfileAddress.value = data.address || "";
      const existingPhotoURL = currentUser.photoURL || data.photoURL || "";
      editProfilePhoto.value = existingPhotoURL;

      // Show current profile picture in preview
      if (existingPhotoURL && imagePreviewContainer && editProfilePhotoPreview) {
        editProfilePhotoPreview.src = existingPhotoURL;
        imagePreviewContainer.style.display = "block";
      } else if (imagePreviewContainer) {
        imagePreviewContainer.style.display = "none";
      }
    }
  } catch (err) {
    console.error("Failed to load profile for editing:", err);
  }
  
  editProfileModal.classList.add("visible");
});

const closeEditProfileModal = () => {
  editProfileModal.classList.remove("visible");
};
closeProfileModalBtn.addEventListener("click", closeEditProfileModal);
cancelProfileBtn.addEventListener("click", closeEditProfileModal);

function validateProfileName(val) { return val.trim().length >= 3; }
function validateProfilePhone(val) { return /^[0-9]{10,15}$/.test(val.replace(/[\s\-()]/g, "")); }
function validateProfileAddress(val) { return val.trim().length >= 5; }

editProfileForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  let valid = true;
  editProfileNameErr.textContent = "";
  editProfilePhoneErr.textContent = "";
  editProfileAddressErr.textContent = "";
  editProfilePhotoErr.textContent = "";
  
  const name = editProfileName.value.trim();
  const phone = editProfilePhone.value.trim();
  const address = editProfileAddress.value.trim();
  const selectedFile = editProfilePhotoFile ? editProfilePhotoFile.files[0] : null;
  
  if (!validateProfileName(name)) {
    editProfileNameErr.textContent = "Full name must be at least 3 characters.";
    valid = false;
  }
  if (!validateProfilePhone(phone)) {
    editProfilePhoneErr.textContent = "Phone must be between 10 and 15 digits.";
    valid = false;
  }
  if (!validateProfileAddress(address)) {
    editProfileAddressErr.textContent = "Address must be at least 5 characters.";
    valid = false;
  }
  
  if (!valid) return;
  
  saveProfileBtn.classList.add("loading");
  saveProfileBtn.disabled = true;
  
  try {
    let finalPhotoURL = editProfilePhoto.value.trim() || null;

    // 1. Upload new image to Cloudinary if a file was selected
    if (selectedFile) {
      editProfilePhotoErr.textContent = "";
      try {
        const previousPhotoURL = currentUser.photoURL || editProfilePhoto.value.trim() || null;
        const previousPublicId = getCloudinaryPublicId(previousPhotoURL);

        // Upload new image
        finalPhotoURL = await uploadToCloudinary(selectedFile);

        // Delete the previous Cloudinary image (fire-and-forget, non-blocking)
        if (previousPublicId) {
          deleteFromCloudinary(previousPublicId).catch(err =>
            console.warn("Old profile image cleanup failed:", err)
          );
        }
      } catch (uploadErr) {
        console.error("Cloudinary upload failed:", uploadErr);
        editProfilePhotoErr.textContent = "Image upload failed. Please check your Cloudinary configuration and try again.";
        saveProfileBtn.classList.remove("loading");
        saveProfileBtn.disabled = false;
        return;
      }
    }

    // 2. Sync Firebase Auth profile details
    await updateProfile(currentUser, {
      displayName: name,
      photoURL: finalPhotoURL
    });
    
    // 3. Sync Firestore user document
    await updateDoc(doc(db, "users", currentUser.uid), {
      name: name,
      phone: phone,
      address: address,
      photoURL: finalPhotoURL
    });
    
    // 4. Refresh display details
    await loadProfile(currentUser.uid);
    
    showToast("Profile updated successfully!");
    closeEditProfileModal();
  } catch (err) {
    console.error("Failed to update profile:", err);
    showToast("Profile update failed.", true);
  } finally {
    saveProfileBtn.classList.remove("loading");
    saveProfileBtn.disabled = false;
  }
});

/* ---- Delete Account Event Listeners ---- */

/** Returns true if the signed-in user authenticated via Google only */
function isGoogleUser() {
  return currentUser?.providerData?.some(p => p.providerId === "google.com") &&
         !currentUser?.providerData?.some(p => p.providerId === "password");
}

deleteAccountBtn.addEventListener("click", () => {
  // Reset state
  deleteConfirmPassword.value = "";
  deletePasswordErr.textContent = "";
  if (deleteGoogleErr) deleteGoogleErr.textContent = "";

  // Show the correct confirmation UI based on sign-in provider
  if (isGoogleUser()) {
    deletePasswordGroup.style.display = "none";
    confirmDeleteBtn.style.display    = "none";
    deleteGoogleGroup.style.display   = "block";
  } else {
    deletePasswordGroup.style.display = "block";
    confirmDeleteBtn.style.display    = "";
    deleteGoogleGroup.style.display   = "none";
  }

  deleteAccountModal.classList.add("visible");
});

const closeDeleteModal = () => {
  deleteAccountModal.classList.remove("visible");
};
closeDeleteModalBtn.addEventListener("click", closeDeleteModal);
cancelDeleteBtn.addEventListener("click", closeDeleteModal);

/** Shared helper: wipe all user data and auth account after re-auth succeeds */
async function performAccountDeletion() {
  // Delete profile image from Cloudinary
  try {
    const snap = await getDoc(doc(db, "users", currentUser.uid));
    const profilePhotoURL = currentUser.photoURL || (snap.exists() ? snap.data().photoURL : null);
    const publicId = getCloudinaryPublicId(profilePhotoURL);
    if (publicId) await deleteFromCloudinary(publicId);
  } catch (cloudErr) {
    console.warn("Cloudinary image deletion failed (continuing):", cloudErr);
  }

  // Delete all posts by this user
  const q = query(collection(db, "posts"), where("uid", "==", currentUser.uid));
  const postsSnap = await getDocs(q);
  await Promise.all(postsSnap.docs.map(d => deleteDoc(d.ref)));

  // Delete Firestore user document
  await deleteDoc(doc(db, "users", currentUser.uid));

  // Delete Firebase Auth account
  await deleteUser(currentUser);

  showToast("Account deleted successfully.");
  closeDeleteModal();
  setTimeout(() => window.location.replace("../../index.html"), 1500);
}

/* --- Email/password deletion flow --- */
deleteAccountForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  deletePasswordErr.textContent = "";

  const password = deleteConfirmPassword.value;
  if (!password) {
    deletePasswordErr.textContent = "Password is required.";
    return;
  }

  confirmDeleteBtn.classList.add("loading");
  confirmDeleteBtn.disabled = true;

  try {
    const credential = EmailAuthProvider.credential(currentUser.email, password);
    await reauthenticateWithCredential(currentUser, credential);
    await performAccountDeletion();
  } catch (err) {
    console.error("Account deletion failed:", err);
    let msg = "Failed to delete account. Please try again.";
    if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
      msg = "Incorrect password. Please try again.";
    }
    deletePasswordErr.textContent = msg;
    showToast(msg, true);
  } finally {
    confirmDeleteBtn.classList.remove("loading");
    confirmDeleteBtn.disabled = false;
  }
});

/* --- Google re-authentication deletion flow --- */
if (googleReauthBtn) {
  googleReauthBtn.addEventListener("click", async () => {
    if (deleteGoogleErr) deleteGoogleErr.textContent = "";
    googleReauthBtn.classList.add("loading");
    googleReauthBtn.disabled = true;

    try {
      const provider = new GoogleAuthProvider();
      await reauthenticateWithPopup(currentUser, provider);
      await performAccountDeletion();
    } catch (err) {
      console.error("Google re-auth deletion failed:", err);
      let msg = "Verification failed. Please try again.";
      if (err.code === "auth/popup-closed-by-user" || err.code === "auth/cancelled-popup-request") {
        msg = "Google sign-in popup was closed. Please try again.";
      } else if (err.code === "auth/user-mismatch") {
        msg = "The selected Google account does not match your account.";
      }
      if (deleteGoogleErr) deleteGoogleErr.textContent = msg;
      showToast(msg, true);
      googleReauthBtn.classList.remove("loading");
      googleReauthBtn.disabled = false;
    }
  });
}
