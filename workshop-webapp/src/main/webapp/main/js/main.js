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
    fetch("/posts", { cache: "no-store" }) // キャッシュを防ぐ
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById("posts");
            const templatePost = postsContainer.querySelector(".p-post");

            // **投稿がない場合、containerを非表示にする**
            if (posts.length === 0) {
                postsContainer.style.display = "none"; // 投稿がない時は非表示
                document.getElementById("no-posts-message").style.display = "block"; // 「投稿がありません」を表示
                return; // これ以上処理しない
            }

            // 既存の投稿IDを取得
            const existingPostIds = new Set();
            document.querySelectorAll(".p-post").forEach(post => {
                const postId = post.getAttribute("data-post-id");
                if (postId) {
                    existingPostIds.add(postId);
                }
            });

            posts.forEach(post => {
                if (!existingPostIds.has(String(post.postId))) { // 既に表示されていない投稿のみ追加
                    const postElement = templatePost.cloneNode(true);
                    postElement.style.display = ""; // 投稿を表示

                    // 投稿の情報を埋め込む
                    postElement.setAttribute("data-post-id", post.postId);
                    postElement.querySelector("[data-user]").textContent = `投稿者: ${post.postUser}`;
                    postElement.querySelector("[data-time]").textContent = new Date(post.postTime).toLocaleString();
                    postElement.querySelector("[data-image]").src = `/images/postImages/${post.postUser}/${post.postPicture}`;
                    postElement.querySelector("[data-text]").textContent = post.postText || "（本文なし）";
                    postElement.querySelector("[data-like-count]").textContent = post.goodCount;

                    // 投稿を最上部に挿入
                    postsContainer.insertBefore(postElement, postsContainer.firstChild);
                }
            });

            setupEventListeners(); // イベントリスナーを設定
        })
        .catch(error => console.error("投稿データの取得に失敗しました:", error));
}

function setupEventListeners() {
    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("p-post__listImage")) {
            toggleCommentSection(event);
        } else if (event.target.classList.contains("commentButton")) {
            validateComment(event);
        }
    });

    setupLikeButtons();
}

function toggleCommentSection(event) {
    const postContainer = event.target.closest(".p-post");
    if (!postContainer) return;

    const commentSection = postContainer.querySelector(".p-post__comment");
    if (commentSection) {
        commentSection.style.display = commentSection.style.display === "block" ? "none" : "block";
    }
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
