document.addEventListener("DOMContentLoaded", function() {
    // プロフィール画像を取得して表示
    fetch("/profile")
        .then(response => response.json())
        .then(user => {
            const profileImage = document.getElementById("profile-image");
            const profileUsername = document.getElementById("profile-username");
            
            if (user.profilePicture) {
                profileImage.src = `../../images/${user.profilePicture}`;
            } else {
                profileImage.src = "../../images/profile.png"; // 初期表示の画像
            }

            profileUsername.textContent = user.userId; // ログインしているユーザーIDを表示
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
                        <img src="../../images/${post.postPicture}" alt="Post Image" width="200">
                        <p>${post.postText}</p>
                        <p>${new Date(post.postTime).toLocaleString()}</p>
                        <p>いいね: ${post.goodCount}</p>
                    `;
                    postsContainer.appendChild(postElement);
                });
            } else {
                noPostsMessage.style.display = "block";
            }
        });
});
