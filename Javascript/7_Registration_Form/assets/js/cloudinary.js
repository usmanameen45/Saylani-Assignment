/**
 * Cloudinary Configuration and Utility Functions
 *
 * IMPORTANT: To use this functionality, replace these placeholder values with your actual
 * Cloudinary credentials. For client-side uploads, you will need to set up an Unsigned Upload Preset
 * in your Cloudinary Settings -> Upload tab.
 */
export const CLOUDINARY_CONFIG = {
  cloudName: "abyzb5vy",              // Replace with your Cloudinary Cloud Name
  uploadPreset: "post_crud",        // Replace with your Unsigned Upload Preset name
  apiKey: "679681124537267",                  // Replace with your Cloudinary API Key
  apiSecret: "SElq3S5n_d5C5J9TPTUDQCyRsps"             // Replace with your Cloudinary API Secret
};

/**
 * Calculates a SHA-1 hash of a string using the browser's native Web Crypto API.
 * This is used to sign requests for deleting images without external dependencies.
 */
async function sha1(string) {
  const utf8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest("SHA-1", utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

/**
 * Extracts the public ID of an image from its Cloudinary URL.
 * Supports URLs containing folder structures.
 */
export function getCloudinaryPublicId(url) {
  if (!url || !url.includes("cloudinary.com")) return null;
  try {
    const parts = url.split("/upload/");
    if (parts.length < 2) return null;
    const pathAfterUpload = parts[1]; // e.g. "v1234567890/folder/image_name.jpg" or "folder/image_name.jpg"
    
    // Remove version prefix if present (e.g. v1234567890/)
    let withoutVersion = pathAfterUpload;
    if (pathAfterUpload.match(/^v\d+\//)) {
      withoutVersion = pathAfterUpload.replace(/^v\d+\//, "");
    }
    
    // Remove file extension
    const lastDotIndex = withoutVersion.lastIndexOf(".");
    if (lastDotIndex !== -1) {
      withoutVersion = withoutVersion.substring(0, lastDotIndex);
    }
    return withoutVersion;
  } catch (e) {
    console.error("Error parsing Cloudinary URL: ", e);
    return null;
  }
}

/**
 * Uploads a file to Cloudinary using an unsigned upload preset.
 * Returns the secure URL of the uploaded image.
 */
export async function uploadToCloudinary(file) {
  const { cloudName, uploadPreset } = CLOUDINARY_CONFIG;
  if (!cloudName || !uploadPreset || cloudName.startsWith("your_") || uploadPreset.startsWith("your_")) {
    throw new Error("Cloudinary cloudName or uploadPreset is not configured.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error?.message || "Cloudinary upload failed");
  }

  const data = await res.json();
  return data.secure_url;
}

/**
 * Deletes an image from Cloudinary using a signed API request.
 * Returns true if the image was successfully destroyed.
 */
export async function deleteFromCloudinary(publicId) {
  const { cloudName, apiKey, apiSecret } = CLOUDINARY_CONFIG;
  if (!publicId || !cloudName || !apiKey || !apiSecret || 
      cloudName.startsWith("your_") || apiKey.startsWith("your_") || apiSecret.startsWith("your_")) {
    console.warn("Cloudinary delete skipped: missing or placeholder credentials.");
    return false;
  }

  const timestamp = Math.floor(Date.now() / 1000);
  // Sort parameters alphabetically to calculate signature: public_id, then timestamp
  const signatureString = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = await sha1(signatureString);

  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("timestamp", timestamp);
  formData.append("api_key", apiKey);
  formData.append("signature", signature);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    console.log("Cloudinary delete response:", data);
    return data.result === "ok";
  } catch (err) {
    console.error("Cloudinary delete error:", err);
    return false;
  }
}