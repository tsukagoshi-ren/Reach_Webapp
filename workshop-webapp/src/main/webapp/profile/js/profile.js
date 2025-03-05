// 初期表示
document.addEventListener("DOMContentLoaded", function() {
	// プロフィール画像を取得して表示
	fetch("/profile")
		.then(response => response.json())
		.then(user => {
			const sidebar_profileImage = document.getElementById("sidebar_profileImage");
			const sidebar_profileUseriD = document.getElementById("sidebar_profileUserId");
			const profile_image = document.getElementById("profile_image");
			const prpfile_userId = document.getElementById("prpfile_userId");

			if (user.profilePicture) {
				sidebar_profileImage.src = `/workshop-webapp/src/main/webapp/images/${user.profilePicture}`; // ログインしているユーザーのプロフィール画像を表示
				profile_image.src = `/workshop-webapp/src/main/webapp/images/${user.profilePicture}`; // ログインしているユーザーのプロフィール画像を表示
			} else {
				sidebar_profileImage.src = "/workshop-webapp/src/main/webapp/images/profile.png"; // 初期表示の画像
				profile_image.src = "/workshop-webapp/src/main/webapp/images/profile.png"; // 初期表示の画像
			}
			if (user.userId) {
				sidebar_profileUseriD.textContent = user.userId; // ログインしているユーザーIDを表示
				prpfile_userId.textContent = user.userId; // ログインしているユーザーIDを表示
			} else {
				sidebar_profileUseriD.textContent = "プロフィール"; // 初期表示の文字列
				prpfile_userId.textContent = "ユーザーID"; // 初期表示の文字列
			}

		});
});

// 表示内容切り替え
document.getElementById("profile_editButton").addEventListener("click", function() {
	let profileDiv = document.querySelector(".profile");
	let profileEditDiv = document.querySelector(".profileEdit");
	profileDiv.style.display = "none";
	profileEditDiv.style.display = "block";
});

document.getElementById("profileEdit_cancelBtn").addEventListener("click", function() {
	let profileDiv = document.querySelector(".profile");
	let profileEditDiv = document.querySelector(".profileEdit");
	profileDiv.style.display = "block";
	profileEditDiv.style.display = "none";


});

// プロフィール編集
