document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // フォームのサブミット時にページリロードを防ぐ

    var userId = document.getElementById("user-id-textbox").value;
    var password = document.getElementById("password-textbox").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/login", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // ログイン成功時にメイン画面にリダイレクト
                window.location.href = "../../main/html/main.html";
            } else {
                // ログイン失敗時にエラーメッセージを表示
                alert("ログインに失敗しました。ユーザーIDとパスワードを確認してください。");
            }
        }
    };
    xhr.send("user_id=" + encodeURIComponent(userId) + "&password=" + encodeURIComponent(password));
});
