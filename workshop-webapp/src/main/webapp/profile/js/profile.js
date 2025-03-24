// 初期表示
//document.addEventListener("DOMContentLoaded", function() {
//	// プロフィール画像を取得して表示
//	fetch("/profile")
//		.then(response => response.json())
//		.then(user => {
//			const sidebar_profileImage = document.getElementById("sidebar_profileImage");
//			const sidebar_profileUseriD = document.getElementById("sidebar_profileUserId");
//			const profile_image = document.getElementById("profile_image");
//			const prpfile_userId = document.getElementById("prpfile_userId");
//
//			if (user.profilePicture) {
//				sidebar_profileImage.src = `/workshop-webapp/src/main/webapp/images/${user.profilePicture}`; // ログインしているユーザーのプロフィール画像を表示
//				profile_image.src = `/workshop-webapp/src/main/webapp/images/${user.profilePicture}`; // ログインしているユーザーのプロフィール画像を表示
//			} else {
//				sidebar_profileImage.src = "/workshop-webapp/src/main/webapp/images/profile.png"; // 初期表示の画像
//				profile_image.src = "/workshop-webapp/src/main/webapp/images/profile.png"; // 初期表示の画像
//			}
//			if (user.userId) {
//				sidebar_profileUseriD.textContent = user.userId; // ログインしているユーザーIDを表示
//				prpfile_userId.textContent = user.userId; // ログインしているユーザーIDを表示
//			} else {
//				sidebar_profileUseriD.textContent = "プロフィール"; // 初期表示の文字列
//				prpfile_userId.textContent = "ユーザーID"; // 初期表示の文字列
//			}
//
//		});
//});
document.addEventListener('DOMContentLoaded', function() {
	
	// 初期表示：プロフィール画像、ユーザーIDを取得
	fetch("/sidebarProfile")
	.then(response => response.json())
	.then(user => {
		// サイドバーのプロフィール
	    const profileImage = document.getElementById("profile-image");
	    const profileUsername = document.getElementById("profile-username");
	    
	    // プロフィール画面のプロフィール
	    const userImage = document.getElementById("profile_image");
	    const username = document.getElementById("prpfile_userId");
	
	    if (user.profilePicture) {
	        // 空白を削除したユーザーIDでパスを構成
	        const trimmedUserId = user.userId.trim(); // 空白を削除
	        profileImage.src = `/images/profileImages/${trimmedUserId}/${user.profilePicture}`;
	        userImage.src = `/images/profileImages/${trimmedUserId}/${user.profilePicture}`;
	    } else {
	        profileImage.src = "../../images/default-profile.png"; // デフォルト画像
	    }
	
	    // 空白を削除してユーザーIDを表示
	    profileUsername.textContent = user.userId.trim();
	    username.textContent = user.userId.trim();
	})
	.catch(error => {
	    console.error("プロフィール情報の取得に失敗しました:", error);
	});
});

// Spring Boot APIのURL
const API_BASE_URL = "http://localhost:8080/users";
// 選択された画像ファイルを保存
let selectedImageFile = null;
// 各ボタンや要素を取得
const editButton = document.getElementById("profile_editButton");
const adaptButton = document.getElementById("profileEdit_adaptBtn");
const cancelButton = document.getElementById("profileEdit_cancelBtn");
const uploadInput = document.getElementById("uploadProfileImage");
const profileImage = document.getElementById("profile_image");
const userIdTextbox = document.getElementById("userId_textbox");
const profileUserId = document.getElementById("prpfile_userId");
const profileDiv = document.querySelector(".profile");
const profileEditDiv = document.querySelector(".profileEdit");

// 表示内容切り替え：プロフィール編集表示
editButton.addEventListener("click", function() {
	profileDiv.style.display = "none";
	profileEditDiv.style.display = "block";
});
// 表示内容切り替え：プロフィール編集非表示
cancelButton.addEventListener("click", function() {
	profileDiv.style.display = "block";
	profileEditDiv.style.display = "none";
});

// 画像選択時にプレビュー
uploadInput.addEventListener("change", (event) => {
	const file = event.target.files[0];
	if (file) {
		selectedImageFile = file;
		const reader = new FileReader();
		reader.onload = (e) => {
			profileImage.src = e.target.result; // 画像をプレビュー
		};
		reader.readAsDataURL(file);
	}
});

// ?適応ボタンを押下時にAPIを呼び出し、IDと画像を更新
adaptButton.addEventListener("click", async () => {
    const newUserId = userIdTextbox.value.trim();

    if (!newUserId) {
        alert("ユーザーIDを入力してください！");
        return;
    }

    if (!selectedImageFile) {
        alert("画像を選択してください！");
        return;
    }

    try {
        // ① 画像を直接 Spring Boot にアップロード
        const uploadResponse = await uploadImage(newUserId, selectedImageFile);
        if (!uploadResponse.success) {
            alert("画像アップロードに失敗しました");
            return;
        }

        // ② 更新成功したら UI を更新
        profileUserId.textContent = newUserId; // ユーザーIDを更新
        profileEdit.style.display = "none"; // 編集画面を閉じる
        alert("プロフィールが更新されました！");
    } catch (error) {
        console.error("エラー:", error);
        alert("エラーが発生しました");
    }
});

// 📤 **Spring Boot に画像を直接送信する関数**
async function uploadImage(userId, file) {
    const formData = new FormData();
    formData.append("file", file); // 画像ファイルを追加

    try {
        const response = await fetch(`${API_BASE_URL}/${userId}/profile-picture`, {
            method: "POST",
            body: formData, // `Content-Type` は自動設定される
        });

        if (!response.ok) throw new Error("アップロード失敗");
        const imageUrl = await response.text(); // Spring Boot から返される画像URL
        profileImage.src = imageUrl; // 新しい画像を表示
        return { success: true };
    } catch (error) {
        console.error("画像アップロードエラー:", error);
        return { success: false };
    }
}
