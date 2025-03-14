// Array of video file names
const videos = ["video1.mp4", "video2.mp4", "video3.mp4"];

// Selectors
const videoContainer = document.querySelector(".video-container");
const modal = document.getElementById("video-modal");
const closeModalBtn = document.querySelector(".close");
const selectedVideo = document.getElementById("selected-video");
const commentInput = document.getElementById("comment-input");
const submitCommentBtn = document.getElementById("submit-comment");
const commentsList = document.getElementById("comments-list");

// Populate the video gallery
videos.forEach((video, index) => {
  const videoElement = document.createElement("video");
  videoElement.src = `videos/${video}`;
  videoElement.controls = false;
  videoElement.classList.add("gallery-video");
  videoContainer.appendChild(videoElement);

  // Add click event to open modal
  videoElement.addEventListener("click", () => {
    selectedVideo.src = `videos/${video}`;
    modal.style.display = "block";
    commentsList.innerHTML = ""; // Clear previous comments
  });
});

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

highlightMiddleVideo();

// Re-adjust middle video on window resize
window.addEventListener("resize", highlightMiddleVideo);