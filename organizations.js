document.getElementById('jsonForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const foundedDate = document.getElementById('foundedDate').value;
  const activities = document.getElementById('activities').value;
  const headquarters = document.getElementById('headquarters').value;
  const id = document.getElementById('id').value;

  const jsonOutput = {
    id,
    foundedDate,
    name,
    description,
    activities,
    headquarters,
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
  a.download = 'organizations-data.json';
  a.click();
  URL.revokeObjectURL(url);
  alert('JSONファイルをダウンロードしました！');
});  