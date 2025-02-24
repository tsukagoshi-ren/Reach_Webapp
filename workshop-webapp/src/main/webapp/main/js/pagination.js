function setupPagination(totalPosts, postsPerPage, renderCallback) {  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const pageCount = Math.ceil(totalPosts / postsPerPage);
  const delta = 2;
  const range = [];
  const rangeWithDots = [];
  let l;

  range.push(1);
  for (let i = currentPage - delta; i <= currentPage + delta; i++) {
    if (i > 1 && i < pageCount) {
      range.push(i);
    }
  }
  range.push(pageCount);
// ページ省略
  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l > 2) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }
 // ページ番号のリンク作成
  rangeWithDots.forEach((i) => {
    const li = document.createElement("li");
    if (i === '...') {
      li.innerHTML = `<span>${i}</span>`;
    } else {
      li.innerHTML = `<a href="#">${i}</a>`;
      if (i === currentPage) {
        li.classList.add("active");
      }
      li.addEventListener("click", function(e) {
        e.preventDefault();
        currentPage = i;
        renderCallback();

        //クリックしたら上に戻る
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }
    paginationContainer.appendChild(li);
  });
}
