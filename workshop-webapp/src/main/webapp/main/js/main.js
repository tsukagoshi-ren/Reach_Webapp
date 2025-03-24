document.addEventListener("DOMContentLoaded", function() {
    fetch("/sidebarProfile")
        .then(response => response.json())
        .then(user => {
            const profileImage = document.getElementById("profile-image");
            const profileUsername = document.getElementById("profile-username");

            if (user.profilePicture) {
                // 空白を削除したユーザーIDでパスを構成
                const trimmedUserId = user.userId.trim(); // 空白を削除
                profileImage.src = `/images/profileImages/${trimmedUserId}/${user.profilePicture}`;
            } else {
                profileImage.src = "../../images/default-profile.png"; // デフォルト画像
            }

            // 空白を削除してユーザーIDを表示
            profileUsername.textContent = user.userId.trim();
        })
        .catch(error => {
            console.error("プロフィール情報の取得に失敗しました:", error);
        });

    // 投稿情報を取得して表示
    fetch("/posts")
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById("posts");
            const noPostsMessage = document.getElementById("no-posts-message");

            if (posts.length > 0) {
                noPostsMessage.style.display = "none";
                posts.forEach(post => {
                    const postElement = document.createElement("div");
                    
                    postElement.innerHTML = `
						<div class="p-post">
						    <div class="p-post__listUser">
						        <div class="p-post__listUser__name">投稿者: ${post.postUser}</div>
						        <p>${new Date(post.postTime).toLocaleString()}</p>
						    </div>
						    <img class="p-post__listProfile" src="/images/postImages/${post.postUser}/${post.postPicture}" alt="Post Image">
						    <div class="p-post__listLike">
						        <img class="like-button" src="../../images/like.png" alt="いいね" width="30" height="30">
						        <span class="like-count">${post.goodCount}</span>
						    </div>
						</div>
                    `;
                    postsContainer.appendChild(postElement);
                });
                  setupLikeButtons();
            } else {
                noPostsMessage.style.display = "block";
            }
        })
        .catch(error => {
            console.error("投稿データの取得に失敗しました:", error);
        });
});
