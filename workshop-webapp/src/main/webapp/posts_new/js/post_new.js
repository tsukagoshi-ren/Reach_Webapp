document.addEventListener('DOMContentLoaded', function() {
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