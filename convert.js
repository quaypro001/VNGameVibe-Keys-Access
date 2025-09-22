function convertCSV() {
    const fileInput = document.getElementById('csv-file');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a CSV file!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const csv = e.target.result;
        const lines = csv.split('\n');
        const result = [];
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '') continue;
            const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index] || '';
            });
            result.push(obj);
        }

        const jsonString = JSON.stringify(result, null, 2);
        document.getElementById('result').innerHTML = `<pre>${jsonString}</pre>
            <button onclick="downloadJSON('${jsonString}')">Download data.json</button>`;

        // Store in localStorage for the main page to use (if needed)
        localStorage.setItem('keysData', jsonString);
    };
    reader.readAsText(file);
}

function downloadJSON(jsonString) {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
}

function switchToMain() {
    window.location.href = 'index.html';
}
