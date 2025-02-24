// 投稿100件ダミーデータ
const posts = [];
for (let i = 1; i <= 100; i++) {
  posts.push({
    userId: `ユーザー${i}`,
    userImage: "assets/images/common/profile.png",
    postImage: "assets/images/common/sample.png",
    likeCount: 0
  });
}

const postsPerPage = 10;
let currentPage = 1;

// 投稿100件表示
function renderPosts() {
  const postContainer = document.getElementById("post");
  postContainer.innerHTML = "";

  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const visiblePosts = posts.slice(start, end);

  visiblePosts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("p-post", "p-post__list");
    postElement.innerHTML = `
      <div class="p-post__listUser">
        <img class="p-post__listUser__image" src="${post.userImage}" alt="">
        <div class="p-post__listUser__name">${post.userId}</div>
      </div>
      <img class="p-post__listProfile" src="${post.postImage}" alt="">
      <div class="p-post__listLike">
        <img class="like-button" src="assets/images/common/like.png" alt="いいね" width="30" height="30">
        <span class="like-count">${post.likeCount}</span>
      </div>
    `;
    postContainer.appendChild(postElement);
  });
  
  setupLikeButtons();
  setupPagination(posts.length, postsPerPage, renderPosts);
}

renderPosts();
