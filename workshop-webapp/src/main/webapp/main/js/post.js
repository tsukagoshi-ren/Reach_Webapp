document.querySelectorAll(".p-post__list").forEach(postList => {
  postList.addEventListener("click", function () {
    const postContainer = postList.closest(".p-post"); // `.p-post` を取得
    const commentSection = postContainer.querySelector(".p-post__comment"); // 兄弟の `.p-post__comment`

    if (commentSection) {
      // 表示・非表示の切り替え
      commentSection.style.display = commentSection.style.display === "block" ? "none" : "block";
    }
  });
});
