// 初期表示
document.addEventListener('DOMContentLoaded', function() {
    // 初期表示：プロフィール画像、ユーザーIDを取得
    fetch("/sidebarProfile")
    .then(response => response.json())
    .then(user => {
        const profileImage = document.getElementById("profile-image");
        const profileUsername = document.getElementById("profile-username");

        const userImage = document.getElementById("profile_image");
        const username = document.getElementById("prpfile_userId");

        if (user.profilePicture) {
            const trimmedUserId = user.userId.trim(); // 空白を削除
            profileImage.src = `/images/profileImages/${trimmedUserId}/${user.profilePicture}`;
            userImage.src = `/images/profileImages/${trimmedUserId}/${user.profilePicture}`;
        } else {
            profileImage.src = "../../images/default-profile.png"; // デフォルト画像
        }

        profileUsername.textContent = user.userId.trim();
        username.textContent = user.userId.trim();
    })
    .catch(error => {
        console.error("プロフィール情報の取得に失敗しました:", error);
    });
});

// 選択された画像ファイルを保存
let selectedImageFile = null;

// 各ボタンや要素を取得
const editButton = document.getElementById("profile_editButton");
const adaptButton = document.getElementById("profileEdit_adaptBtn");
const cancelButton = document.getElementById("profileEdit_cancelBtn");
const uploadInput = document.getElementById("uploadProfileImage");
const uploadButton = document.getElementById("uploadButton");
const profileImage = document.getElementById("profile_image");
const profileUserId = document.getElementById("prpfile_userId");
const userIdTextbox = document.getElementById("userId_textbox");
const profileEditUserId = document.getElementById("prpfile_userId_edit");
const profileDiv = document.querySelector(".profile");
const profileEditDiv = document.querySelector(".profileEdit");

// 表示内容切り替え：プロフィール編集表示
editButton.addEventListener("click", function() {
    profileDiv.style.display = "none";
    profileEditDiv.style.display = "block";

//    userIdTextbox.disabled = true;
    profileEditUserId.textContent = profileUserId.textContent.trim();
});

// 表示内容切り替え：プロフィール編集非表示
cancelButton.addEventListener("click", function() {
    profileDiv.style.display = "block";
    profileEditDiv.style.display = "none";

    profileImage.src = document.getElementById("profile-image").src;
    selectedImageFile = null;
    uploadInput.value = ''; // ファイル選択をクリア
});

// 画像選択時にプレビュー
uploadInput.addEventListener("change", (event) => {
    const file = event.target.files[0]; // ファイル選択
    if (file) {
        selectedImageFile = file; // 選択されたファイルを保存
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadButton.src = e.target.result; // プレビュー表示の更新
        };
        reader.readAsDataURL(file); // ファイルをDataURLとして読み込み
    } else {
        alert("画像が選択されていません");
    }
});


// 適応ボタンを押下時にAPIを呼び出し、画像を更新
adaptButton.addEventListener("click", async () => {
    if (!selectedImageFile) {
        alert("画像を選択してください！");
        return;
    }

    const userId = document.getElementById("prpfile_userId").textContent.trim();

    try {
        const uploadResponse = await uploadImage(userId, selectedImageFile);
        if (uploadResponse.success) {
            alert("画像アップロードに失敗しました");
            return;
        }

        profileEditDiv.style.display = "none"; // 編集画面を閉じる
        profileDiv.style.display = "block";

        // `uploadButton` の画像をアップロードされたものに変更
        uploadButton.src = uploadResponse.imageUrl;

        const profileImageDefault = document.getElementById("profile-image");
        profileImageDefault.src = uploadResponse.imageUrl;
        
        window.location.reload();

        alert("プロフィール画像が更新されました！");
    } catch (error) {
        console.error("エラー:", error);
        alert("エラーが発生しました");
    }
});

// Spring Boot に画像を直接送信する関数
async function uploadImage(userId, file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    try {
        const response = await fetch(`/profile/profile-picture`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) throw new Error("アップロードに失敗しました");

        const imageUrl = await response.text();
        console.log("アップロード成功:", imageUrl);
        return { success: true, imageUrl };
    } catch (error) {
        console.error("画像アップロードエラー:", error);
        return { success: false, error: error.message };
    }
}
