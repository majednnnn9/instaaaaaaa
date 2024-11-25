const form = document.getElementById('usernameForm');
const resultDiv = document.getElementById('result');
const downloadAllBtn = document.getElementById('downloadAllBtn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    // button.innerText = "انتظر قليلا .. "
    // resultDiv.innerHTML = 'جاري البحث...';
    // resultDiv.style.textAlign = 'center'
    // downloadAllBtn.style.display = 'none';
    const button = document.getElementById("button")
    button.innerText = "انتظر قليلا .. "
    try {
        const response = await fetch('/fetch-stories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        });

        const data = await response.json();

        if (response.ok) {
            resultDiv.innerHTML = `<h2>قصص ${username}:</h2><div class="stories-grid"></div>`;
            const storiesGrid = resultDiv.querySelector('.stories-grid');
            data.stories.forEach((story, index) => {
                const mediaElement = story.type === 'video'
                    ? `<video src="/proxy-media?url=${encodeURIComponent(story.url)}" controls></video>`
                    : `<img src="/proxy-media?url=${encodeURIComponent(story.url)}" alt="Story ${index + 1}">`;

                const storyItem = document.createElement('div');
                storyItem.className = 'story-item';
                storyItem.innerHTML = `
                    ${mediaElement}
                    <button onclick="downloadStory('${encodeURIComponent(story.url)}', '${encodeURIComponent(story.filename)}')">تحميل</button>
                `;

                storiesGrid.appendChild(storyItem);
            });
            downloadAllBtn.style.display = 'block';
        } else {
            // resultDiv.innerHTML = `خطأ: ${data.error}`;
        }
    } catch (error) {
        resultDiv.innerHTML = 'حدث خطأ أثناء جلب القصص';
    }
    button.innerText = "البحث"
});

downloadAllBtn.addEventListener('click', () => {
    const storyItems = document.querySelectorAll('.story-item');
    storyItems.forEach((item, index) => {
        const button = item.querySelector('button');
        setTimeout(() => {
            button.click();
        }, index * 1000); // تأخير 1 ثانية بين كل تحميل
    });
});

function downloadStory(url, filename) {
    const link = document.createElement('a');
    link.href = `/download-story?url=${url}&filename=${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}