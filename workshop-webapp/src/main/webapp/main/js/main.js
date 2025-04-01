document.addEventListener("DOMContentLoaded", function () {
    fetchSidebarProfile();
    fetchPosts();
});

function fetchSidebarProfile() {
    fetch("/sidebarProfile")
        .then(response => response.json())
        .then(user => {
            const profileImage = document.getElementById("profile-image");
            const profileUsername = document.getElementById("profile-username");

            profileImage.src = user.profilePicture
                ? `/images/profileImages/${user.userId.trim()}/${user.profilePicture}`
                : "../../images/default-profile.png";
            profileUsername.textContent = user.userId.trim();
        })
        .catch(error => console.error("プロフィール情報の取得に失敗しました:", error));
}

function fetchPosts() {
    fetch("/posts")
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById("posts");
            const noPostsMessage = document.getElementById("no-posts-message");

            if (posts.length > 0) {
                noPostsMessage.style.display = "none";

                const postElements = document.querySelectorAll(".p-post");
                posts.forEach((post, index) => {
                    if (index < postElements.length) {
                        const postElement = postElements[index];

                        postElement.querySelector("[data-user]").textContent = `投稿者: ${post.postUser}`;
                        postElement.querySelector("[data-time]").textContent = new Date(post.postTime).toLocaleString();
                        postElement.querySelector("[data-image]").src = `/images/postImages/${post.postUser}/${post.postPicture}`;
                        postElement.querySelector("[data-like-count]").textContent = post.goodCount;
                    }
                });

                setupEventListeners();
            } else {
                noPostsMessage.style.display = "block";
            }
        })
        .catch(error => console.error("投稿データの取得に失敗しました:", error));
}

function setupEventListeners() {
    document.querySelectorAll(".p-post__listImage").forEach(image => {
        image.addEventListener("click", toggleCommentSection);
    });
    document.querySelectorAll(".commentButton").forEach(button => {
        button.addEventListener("click", validateComment);
    });

    setupLikeButtons();
}

function toggleCommentSection(event) {
    const postContainer = event.target.closest(".p-post");
    const commentSection = postContainer.querySelector(".p-post__comment");
    commentSection.style.display = commentSection.style.display === "block" ? "none" : "block";
}

function validateComment(event) {
    const postContainer = event.target.closest(".p-post");
    const commentInput = postContainer.querySelector(".commentInput");
    const commentMessage = postContainer.querySelector(".commentMessage");

    if (commentInput.value.trim()) {
        commentMessage.textContent = "";
    } else {
        commentMessage.textContent = "コメントが入力されていません";
        commentMessage.style.color = "red";
    }
}
