/**
 * Utility function to get the correct image URL
 * Handles Cloudinary URLs, relative paths, and legacy formats
 * @param {string} imagePath - The image path from the database
 * @returns {string} - The correctly formatted image URL
 */
export const getImageUrl = (imagePath) => {
    if (!imagePath) {
        return 'https://via.placeholder.com/180?text=No+Image';
    }

    let imageUrl = imagePath;

    // Fix malformed URLs (e.g., https// -> https://)
    imageUrl = imageUrl.replace(/^(https?):\/\/+/, '$1://');

    // If it's a full URL (Cloudinary or any other), use it as-is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
    }

    // If it's a relative path, prepend the server URL
    if (imageUrl.startsWith('/')) {
        return `${process.env.REACT_APP_SERVER_URL}${imageUrl}`;
    }

    // Fallback: treat as relative path
    return `${process.env.REACT_APP_SERVER_URL}/${imageUrl}`;
};
