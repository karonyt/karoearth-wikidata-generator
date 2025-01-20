document.getElementById('jsonForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const eventDate = document.getElementById('eventDate').value;
  const historytype = document.getElementById('history-type').value;
  const id = document.getElementById('id').value;

  const jsonOutput = {
    id,
    date: eventDate,
    era: "Re:KaroEarth",
    title,
    description,
    type: historytype,
    importance: "major"
  };

  document.getElementById('output').textContent = JSON.stringify(jsonOutput, null, 2);
});

// JSONファイルを読み込む機能
document.getElementById('loadJsonButton').addEventListener('click', () => {
  const fileInput = document.getElementById('jsonFileInput');
  if (!fileInput.files.length) {
    alert('ファイルを選択してください');
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    try {
      const jsonData = JSON.parse(event.target.result);
      populateForm(jsonData);
    } catch (error) {
      alert('JSONファイルの形式が正しくありません');
    }
  };

  reader.readAsText(file);
});

// フォームにデータを反映する関数
function populateForm(data) {
  document.getElementById('title').value = data.title || '';
  document.getElementById('description').value = data.description || '';
  document.getElementById('id').value = data.id || '';
  document.getElementById('history-type').value = data.type || '';
  document.getElementById('eventDate').value = data.date || '';
}

// JSONをコピーする機能
document.getElementById('copyJsonButton').addEventListener('click', () => {
  const jsonData = document.getElementById('output').textContent
  navigator.clipboard.writeText(jsonData).then(() => {
    alert('JSONをコピーしました！');
  }).catch(() => {
    alert('コピーに失敗しました');
  });
});

// JSONをダウンロードする機能
document.getElementById('downloadJsonButton').addEventListener('click', () => {
  const jsonData = document.getElementById('output').textContent;
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'history-data.json';
  a.click();
  URL.revokeObjectURL(url);
  alert('JSONファイルをダウンロードしました！');
});  