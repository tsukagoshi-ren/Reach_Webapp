document.addEventListener('DOMContentLoaded', function() {
	
	// 初期表示：プロフィール画像、ユーザーIDを取得
	fetch("/profile")
	.then(response => response.json())
	.then(user => {
		// サイドバーのプロフィール
	    const profileImage = document.getElementById("profile-image");
	    const profileUsername = document.getElementById("profile-username");
	    
	    // 投稿画面のプロフィール
	    const postUserImage = document.getElementById("post-userimage");
	    const postUsername = document.getElementById("post-username");
	
	    if (user.profilePicture) {
	        // 空白を削除したユーザーIDでパスを構成
	        const trimmedUserId = user.userId.trim(); // 空白を削除
	        profileImage.src = `/images/profileImages/${trimmedUserId}/${user.profilePicture}`;
	        postUserImage.src = `/images/profileImages/${trimmedUserId}/${user.profilePicture}`;
	    } else {
	        profileImage.src = "../../images/default-profile.png"; // デフォルト画像
	    }
	
	    // 空白を削除してユーザーIDを表示
	    profileUsername.textContent = user.userId.trim();
	    postUsername.textContent = user.userId.trim();
	})
	.catch(error => {
	    console.error("プロフィール情報の取得に失敗しました:", error);
	});
	
  // フォーム要素を取得
  const form = document.querySelector('.p-post__form form');
  
  // 投稿ボタンのクリックイベントをリッスン
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // デフォルトの送信をキャンセル
    
    // ユーザーIDを取得
    const postUser = document.querySelector('.p-post__formUser__id').textContent;
    
    // 画像ファイルを取得
    const postPicture = document.getElementById('image-upload').files[0];
    
    // テキストを取得
    const postText = document.getElementById('post-text').value;

    // 入力チェック - テキストと画像の両方が空かどうか確認
    if (!postText.trim() && !postPicture) {
      alert('テキストまたは画像を入力してください。');
      return; // 処理を中断
      
    }else if (!postText.trim()) {
      alert('コメントを入力してください。');
      return; // 処理を中断
      
    }else if(!postPicture){
      alert('画像をアップロードしてください。');
      return; // 処理を中断
	}
    
    // 送信データの作成
    const formData = new FormData();
    formData.append('post_user', postUser);
    if (postPicture) {
      formData.append('post_picture', postPicture);
    }
    formData.append('post_text', postText);
    
    // バックエンドへ送信
    fetch('/api/posts', {  // 実際のAPIエンドポイントに変更してください
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('送信に失敗しました');
    })
    .then(data => {
      console.log('投稿成功:', data);
      // 成功時の処理
      form.reset(); // フォームをリセット
      alert('投稿が完了しました');
      // 投稿後にホーム画面に遷移したい場合はコメントを外す
       window.location.href = '../../main/html/main.html';
    })
    .catch(error => {
      console.error('エラー:', error);
      alert('投稿に失敗しました。もう一度お試しください。');
    });
  });

  // キャンセルボタンの処理（オプション）
  const resetButton = document.querySelector('input[type="reset"]');
  resetButton.addEventListener('click', function() {
    // リセット後に何か処理をしたい場合はここに記述
    console.log('フォームがリセットされました');
     window.location.href = '../../main/html/main.html';
  });
});