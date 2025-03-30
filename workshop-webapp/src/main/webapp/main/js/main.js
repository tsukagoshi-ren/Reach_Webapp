document.addEventListener("DOMContentLoaded", function() {
    // サイドバープロフィールの取得
    fetch("/sidebarProfile")
        .then(response => response.json())
        .then(user => {
            const profileImage = document.getElementById("profile-image");
            const profileUsername = document.getElementById("profile-username");

            if (user.profilePicture) {
                const trimmedUserId = user.userId.trim();
                profileImage.src = `/images/profileImages/${trimmedUserId}/${user.profilePicture}`;
            } else {
                profileImage.src = "../../images/default-profile.png";
            }
            profileUsername.textContent = user.userId.trim();
        })
        .catch(error => console.error("プロフィール情報の取得に失敗しました:", error));

    // 投稿情報の取得
    fetch("/posts")
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById("posts");
            const noPostsMessage = document.getElementById("no-posts-message");

            if (posts.length > 0) {
                noPostsMessage.style.display = "none";
                posts.forEach(post => {
                    const postElement = document.createElement("div");
                    postElement.classList.add("p-post");

                    postElement.innerHTML = `
                        <div class="p-post__list">
                            <div class="p-post__listUser">
                                <div class="p-post__listUser__name">投稿者: ${post.postUser}</div>
                                <p>${new Date(post.postTime).toLocaleString()}</p>
                            </div>
                            <img class="p-post__listImage" src="/images/postImages/${post.postUser}/${post.postPicture}" alt="Post Image">
                            <div class="p-post__listLike">
                                <img class="like-button" src="../../images/like.png" alt="いいね" width="30" height="30">
                                <span class="like-count">${post.goodCount}</span>
                            </div>
                        </div>
                        <div class="p-post__comment" style="display: none;">
                            <div class="p-post__commentList">
                                <h3>コメント一覧</h3>
                                <p>コメント1</p>
                                <p>コメント2</p>
                                <p>コメント3</p>
                            </div>
                            <input type="text" class="commentInput" placeholder="コメントを書く">
                            <button class="commentButton">コメント</button>
                            <p class="commentMessage"></p> 
                        </div>
                    `;

                    postsContainer.appendChild(postElement);
                });

                setupLikeButtons();
                setupCommentToggle();
            } else {
                noPostsMessage.style.display = "block";
            }
        })
        .catch(error => console.error("投稿データの取得に失敗しました:", error));
});

// 画像クリックでコメント欄の表示・非表示を切り替える
function setupCommentToggle() {
    document.querySelectorAll(".p-post__listImage").forEach(image => {
        image.addEventListener("click", function () {
            const postContainer = this.closest(".p-post");
            const commentSection = postContainer.querySelector(".p-post__comment");
            commentSection.style.display = commentSection.style.display === "block" ? "none" : "block";
        });
    });
}

// コメントバリデーション
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("commentButton")) {
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
});