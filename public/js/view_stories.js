const form = document.getElementById('usernameForm');
const resultDiv = document.getElementById('result');
const downloadAllBtn = document.getElementById('downloadAllBtn');

document.addEventListener('DOMContentLoaded', async () => {
    const resultDiv = document.getElementById('result');
    const downloadAllBtn = document.getElementById('downloadAllBtn');

    // جلب اسم المستخدم من query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if (!username) {
        resultDiv.innerHTML = 'لم يتم تحديد اسم المستخدم. الرجاء إضافة ?username=اسم_المستخدم إلى URL.';
        return;
    }

    resultDiv.innerHTML = 'جاري البحث...';
    resultDiv.style.textAlign = 'center';
    downloadAllBtn.style.display = 'none';

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
        } else if (data.error === "حدث خطأ أثناء البحث عن القصص: لا توجد قصص متاحة لهذا المستخدم") {
            resultDiv.innerHTML = `لا توجد قصص متاحة لهذا المستخدم`;
        } else {
            console.log(data.error)
            resultDiv.innerHTML = `حدث خطا : حاول مرة أخرى`;
        }
    } catch (error) {
        resultDiv.innerHTML = 'حدث خطأ أثناء جلب القصص';
    }
});

function downloadStory(url, filename) {
    const link = document.createElement('a');
    link.href = `/download-story?url=${url}&filename=${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function printQueryParams() {
    // الحصول على query string من URL
    const queryString = window.location.search;

    // تحويل query string إلى object
    const urlParams = new URLSearchParams(queryString);

    console.log("Query Parameters:");

    // طباعة كل query parameter في console
    for (const [key, value] of urlParams) {
        console.log(`${key}: ${value}`);
    }

    // إذا لم تكن هناك parameters، اطبع رسالة توضيحية
    if (urlParams.toString() === '') {
        console.log("لا توجد query parameters في URL");
    }
}

// استدعاء الدالة عند تحميل الصفحة
window.onload = printQueryParams;