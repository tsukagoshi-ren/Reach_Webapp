document.querySelectorAll(".p-post__list").forEach(postList => {
  const postImage = postList.querySelector(".p-post__listImage"); 

  if (postImage) {
    postImage.addEventListener("click", function () {
      const postContainer = postList.closest(".p-post"); 
      const commentSection = postContainer.querySelector(".p-post__comment");

      if (commentSection) {
        // 表示・非表示の切り替え
        commentSection.style.display = commentSection.style.display === "block" ? "none" : "block";
      }
    });
  }
});


document.getElementById("commentButton").addEventListener("click", function () {
  const commentInput = document.getElementById("commentInput").value.trim();
  const commentMessage = document.getElementById("commentMessage");

  if (commentInput) {
      commentMessage.textContent = "";
  } else {
      commentMessage.textContent = "コメントが入力されていません";
      commentMessage.style.color = "red";
  }
});
