// Selectors
const videoContainer = document.querySelector(".video-container");
const modal = document.getElementById("video-modal");
const closeModalBtn = document.querySelector(".close");
const selectedVideo = document.getElementById("selected-video");
const commentInput = document.getElementById("comment-input");
const submitCommentBtn = document.getElementById("submit-comment");
const commentsList = document.getElementById("comments-list");

// Fetch videos from the GitHub repository's videos folder
async function fetchVideos() {
  const repoUrl = "https://api.github.com/repos/JelleBultiauw-School/ViennaVlogs/contents/videos"; // Correct URL
  try {
    const response = await fetch(repoUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch videos: ${response.statusText}`);
    }
    const data = await response.json();

    // Filter out only video files (e.g., .mp4)
    const videoFiles = data.filter(file => file.name.endsWith(".mp4"));

    // Populate the video gallery
    videoFiles.forEach(file => {
      const videoElement = document.createElement("video");
      videoElement.src = file.download_url; // Use the direct download URL
      videoElement.controls = false;
      videoElement.classList.add("gallery-video");
      videoContainer.appendChild(videoElement);

      // Add click event to open modal
      videoElement.addEventListener("click", () => {
        selectedVideo.src = file.download_url;
        modal.style.display = "block";
        commentsList.innerHTML = ""; // Clear previous comments
      });
    });

    // Highlight the middle video after loading all videos
    highlightMiddleVideo();
  } catch (error) {
    console.error(error);
  }
}

// Close modal
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Handle comment submission
submitCommentBtn.addEventListener("click", () => {
  const commentText = commentInput.value.trim();
  if (commentText) {
    const commentItem = document.createElement("li");
    commentItem.textContent = commentText;
    commentsList.appendChild(commentItem);
    commentInput.value = ""; // Clear input
  }
});

// Highlight the middle video
function highlightMiddleVideo() {
  const galleryVideos = document.querySelectorAll(".gallery-video");
  galleryVideos.forEach((video, index) => {
    video.classList.toggle("middle", index === Math.floor(galleryVideos.length / 2));
  });
}

// Re-adjust middle video on window resize
window.addEventListener("resize", highlightMiddleVideo);

// Fetch and load videos when the page loads
fetchVideos();