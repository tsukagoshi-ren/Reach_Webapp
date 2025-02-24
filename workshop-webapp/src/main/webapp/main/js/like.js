function setupLikeButtons() {
  const likeButtons = document.querySelectorAll(".like-button");
  likeButtons.forEach((button) => {
    let liked = false;
    const countElement = button.nextElementSibling;
    let count = parseInt(countElement.textContent, 10) || 0;
    
    // 初期状態(色なし）
    button.style.filter = "grayscale(100%)";
    countElement.textContent = count;
    
    // クリック時の動作(いいねされたら色あり、いいね外れたら色なし)
    button.addEventListener("click", () => {
      liked = !liked;
      count += liked ? 1 : -1;
      countElement.textContent = count;
      button.style.filter = liked ? "grayscale(0%)" : "grayscale(100%)";
    });
  });
}
