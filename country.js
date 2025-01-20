document.getElementById('addHistory').addEventListener('click', () => {
  const container = document.getElementById('historyContainer');
  const id = Date.now();
  const html = `
      <div class="history-item" data-id="${id}">
        <label>
          日付:
          <input type="date" class="history-date" required>
        </label>
        <label>
          タイトル:
          <input type="text" class="history-title" required>
        </label>
        <label>
          説明:
          <textarea class="history-description" required></textarea>
        </label>
        <label>
          タイプ:
          <select class="history-type">
            <option value="default">その他(デフォルト)</option>
            <option value="foundation">国家の重大事項(建国、崩壊、名称変更等)</option>
            <option value="development">発展</option>
            <option value="diplomacy">外交関係</option>
            <option value="conflict">戦争</option>
          </select>
        </label>
        <button type="button" onclick="removeItem(this)">削除</button>
      </div>
    `;
  container.insertAdjacentHTML('beforeend', html);
});

document.getElementById('addLandmark').addEventListener('click', () => {
  const container = document.getElementById('landmarksContainer');
  const id = Date.now();
  const html = `
      <div class="landmark-item" data-id="${id}">
        <label>
          名前:
          <input type="text" class="landmark-name" required>
        </label>
        <label>
          説明:
          <textarea class="landmark-description" required></textarea>
        </label>
        <label>
          完成日:
          <input type="date" class="landmark-completionDate" required>
        </label>
        <label>
          座標:
          <br>X:<br> <input type="number" class="landmark-coordX" required>
          <br>Y:<br> <input type="number" class="landmark-coordY" required>
          <br>Z:<br> <input type="number" class="landmark-coordZ" required>
        </label>
        <button type="button" onclick="removeItem(this)">削除</button>
      </div>
    `;
  container.insertAdjacentHTML('beforeend', html);
});

function removeItem(button) {
  button.parentElement.remove();
}

document.getElementById('jsonForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const location = document.getElementById('location').value;
  const foundedDate = document.getElementById('foundedDate').value;
  const governmentType = document.getElementById('governmentType').value;
  const features = document.getElementById('features').value;
  const coordinates = {
    x: parseInt(document.getElementById('coordX').value),
    y: parseInt(document.getElementById('coordY').value),
    z: parseInt(document.getElementById('coordZ').value),
  };

  const history = Array.from(document.querySelectorAll('.history-item')).map((item) => ({
    date: item.querySelector('.history-date').value,
    title: item.querySelector('.history-title').value,
    description: item.querySelector('.history-description').value,
    type: item.querySelector('.history-type').value,
  }));

  const landmarks = Array.from(document.querySelectorAll('.landmark-item')).map((item) => ({
    name: item.querySelector('.landmark-name').value,
    description: item.querySelector('.landmark-description').value,
    completionDate: item.querySelector('.landmark-completionDate').value,
    coordinates: {
      x: parseInt(item.querySelector('.landmark-coordX').value),
      y: parseInt(item.querySelector('.landmark-coordY').value),
      z: parseInt(item.querySelector('.landmark-coordZ').value),
    },
  }));

  const jsonOutput = {
    id: Date.now(),
    name,
    location,
    foundedDate,
    governmentType,
    features,
    coordinates,
    history,
    landmarks,
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
  document.getElementById('name').value = data.name || '';
  document.getElementById('location').value = data.location || '';
  document.getElementById('foundedDate').value = data.foundedDate || '';
  document.getElementById('governmentType').value = data.governmentType || '';
  document.getElementById('features').value = data.features || '';

  document.getElementById('coordX').value = data.coordinates?.x || 0;
  document.getElementById('coordY').value = data.coordinates?.y || 0;
  document.getElementById('coordZ').value = data.coordinates?.z || 0;

  const historyContainer = document.getElementById('historyContainer');
  const histories = data.history || [];
  if (histories.length != 0) {
    historyContainer.innerHTML = '<button type="button" id="addHistory">+ イベント追加</button>';
    (histories).forEach((item) => {
      addHistoryItem(item);
    });
    document.getElementById('addHistory').addEventListener('click', () => {
      const container = document.getElementById('historyContainer');
      const id = Date.now();
      const html = `
              <div class="history-item" data-id="${id}">
                <label>
                  日付:
                  <input type="date" class="history-date" required>
                </label>
                <label>
                  タイトル:
                  <input type="text" class="history-title" required>
                </label>
                <label>
                  説明:
                  <textarea class="history-description" required></textarea>
                </label>
                <label>
                  タイプ:
                  <select class="history-type">
                    <option value="default">その他(デフォルト)</option>
                    <option value="foundation">国家の重大事項(建国、崩壊、名称変更等)</option>
                    <option value="development">発展</option>
                    <option value="diplomacy">外交関係</option>
                    <option value="conflict">戦争</option>
                  </select>
                </label>
                <button type="button" onclick="removeItem(this)">削除</button>
              </div>
            `;
      container.insertAdjacentHTML('beforeend', html);
    });
  }

  const landmarksContainer = document.getElementById('landmarksContainer');
  const landmarks = data.landmarks || [];
  if (landmarks.length != 0) {
    landmarksContainer.innerHTML = '<button type="button" id="addLandmark">+ ランドマーク追加</button>';
    (landmarks).forEach((item) => {
      addLandmarkItem(item);
    });
    document.getElementById('addLandmark').addEventListener('click', () => {
      const container = document.getElementById('landmarksContainer');
      const id = Date.now();
      const html = `
              <div class="landmark-item" data-id="${id}">
                <label>
                  名前:
                  <input type="text" class="landmark-name" required>
                </label>
                <label>
                  説明:
                  <textarea class="landmark-description" required></textarea>
                </label>
                <label>
                  完成日:
                  <input type="date" class="landmark-completionDate" required>
                </label>
                <label>
                  座標:
                  <br>X:<br> <input type="number" class="landmark-coordX" required>
                  <br>Y:<br> <input type="number" class="landmark-coordY" required>
                  <br>Z:<br> <input type="number" class="landmark-coordZ" required>
                </label>
                <button type="button" onclick="removeItem(this)">削除</button>
              </div>
            `;
      container.insertAdjacentHTML('beforeend', html);
    });
  }
}

// 履歴項目を追加する関数
function addHistoryItem(history) {
  const container = document.getElementById('historyContainer');
  const id = Date.now();
  const html = `
      <div class="history-item" data-id="${id}">
        <label>
          日付:
          <input type="date" class="history-date" value="${history.date || ''}" required>
        </label>
        <label>
          タイトル:
          <input type="text" class="history-title" value="${history.title || ''}" required>
        </label>
        <label>
          説明:
          <textarea class="history-description" required>${history.description || ''}</textarea>
        </label>
        <label>
          タイプ:
          <select class="history-type" value="${history.type || ''}">
            <option value="foundation">建国</option>
            <option value="development">発展</option>
            <option value="conflict">戦争</option>
          </select>
        </label>
        <button type="button" onclick="removeItem(this)">削除</button>
      </div>
    `;
  container.insertAdjacentHTML('beforeend', html);
}

// ランドマーク項目を追加する関数
function addLandmarkItem(landmark) {
  const container = document.getElementById('landmarksContainer');
  const id = Date.now();
  const html = `
      <div class="landmark-item" data-id="${id}">
        <label>
          名前:
          <input type="text" class="landmark-name" value="${landmark.name || ''}" required>
        </label>
        <label>
          説明:
          <textarea class="landmark-description" required>${landmark.description || ''}</textarea>
        </label>
        <label>
          完成日:
          <input type="date" class="landmark-completionDate" value="${landmark.completionDate || ''}" required>
        </label>
        <label>
          座標:
          <br>X:<br> <input type="number" class="landmark-coordX" value="${landmark.coordinates?.x || 0}" required>
          <br>Y:<br> <input type="number" class="landmark-coordY" value="${landmark.coordinates?.y || 0}" required>
          <br>Z:<br> <input type="number" class="landmark-coordZ" value="${landmark.coordinates?.z || 0}" required>
        </label>
        <button type="button" onclick="removeItem(this)">削除</button>
      </div>
    `;
  container.insertAdjacentHTML('beforeend', html);
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
  a.download = 'nation-data.json';
  a.click();
  URL.revokeObjectURL(url);
  alert('JSONファイルをダウンロードしました！');
});  