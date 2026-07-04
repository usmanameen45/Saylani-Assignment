import {
  getAuth,
  onAuthStateChanged,
  signOut,
  db,
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "./fireconfig.js";

const auth = getAuth();
const navLinks = document.getElementById("navLinks");
const postPreviewsContainer = document.getElementById("postPreviewsContainer");

// Cache the original static HTML content of post previews
const defaultPreviewsHtml = postPreviewsContainer ? postPreviewsContainer.innerHTML : "";

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

// Escape HTML helper
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Format date helper
function formatDate(createdAt) {
  if (!createdAt?.seconds) return "Just now";
  const diff = Math.floor(Date.now() / 1000 - createdAt.seconds);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(createdAt.seconds * 1000).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

// Load real posts from Firestore
async function loadUserPosts(uid) {
  if (!postPreviewsContainer) return;
  
  try {
    const q = query(collection(db, "posts"), where("uid", "==", uid));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      postPreviewsContainer.innerHTML = `
        <div class="post-preview">
          <div class="post-preview-meta">PostHub &middot; Now</div>
          <div class="post-preview-title">No posts yet</div>
          <div class="post-preview-body">Go to your dashboard page and publish some posts to display them here!</div>
        </div>
      `;
      return;
    }
    
    const posts = [];
    snapshot.forEach(d => posts.push({ id: d.id, ...d.data() }));
    
    // Sort by createdAt descending
    posts.sort((a, b) => {
      const ta = a.createdAt?.seconds || 0;
      const tb = b.createdAt?.seconds || 0;
      return tb - ta;
    });
    
    // Display up to 3 posts
    postPreviewsContainer.innerHTML = "";
    posts.slice(0, 3).forEach(post => {
      const card = document.createElement("div");
      card.className = "post-preview";
      card.innerHTML = `
        <div class="post-preview-meta">You &middot; ${formatDate(post.createdAt)}</div>
        <div class="post-preview-title">${escapeHtml(post.title)}</div>
        <div class="post-preview-body">${escapeHtml(post.body)}</div>
      `;
      postPreviewsContainer.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to load user posts on homepage:", err);
  }
}

// Observe authentication state
onAuthStateChanged(auth, async (user) => {
  if (user) {
    let name = user.displayName || "";
    let photoURL = user.photoURL || "";
    
    // Fetch detailed profile details from Firestore
    try {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        const data = snap.data();
        if (!name && data.name) name = data.name;
        if (!photoURL && data.photoURL) photoURL = data.photoURL;
      }
    } catch (err) {
      console.error("Failed to fetch user details for homepage nav:", err);
    }
    
    // Replace "Sign in" and "Get started" links with Dashboard link, Sign out button, and avatar
    if (navLinks) {
      navLinks.innerHTML = `
        <li><a href="assets/pages/dashboard.html">Dashboard</a></li>
        <li><button class="btn-logout" id="logoutBtn">Sign out</button></li>
        <li><div class="nav-avatar-circle" id="navAvatar"></div></li>
      `;
      
      const navAvatar = document.getElementById("navAvatar");
      if (navAvatar) {
        setAvatar(navAvatar, name || user.email || "?", photoURL);
      }
      
      const logoutBtn = document.getElementById("logoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
          try {
            await signOut(auth);
            window.location.reload();
          } catch (err) {
            console.error("Logout failed:", err);
          }
        });
      }
    }
    
    // Load real user posts
    await loadUserPosts(user.uid);
  } else {
    // If logged out, display default links and restore static posts
    if (navLinks) {
      navLinks.innerHTML = `
        <li><a href="assets/pages/login.html">Sign in</a></li>
        <li><a href="assets/pages/register.html" class="btn-nav">Get started</a></li>
      `;
    }
    if (postPreviewsContainer) {
      postPreviewsContainer.innerHTML = defaultPreviewsHtml;
    }
  }
});
