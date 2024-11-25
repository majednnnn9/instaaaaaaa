const addPersonForm = document.getElementById('addPersonForm');
const personNameInput = document.getElementById('personName');
const peopleList = document.getElementById('peopleList');

addPersonForm.addEventListener('submit', async function (e) {
    const button = document.getElementById("button")
    button.innerText = "انتظر قليلا ..."
    e.preventDefault();
    const name = personNameInput.value.trim();
    if (name) {
        try {
            const response = await fetch('/check-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: name }),
            });
            const data = await response.json();
            if (data.exists) {
                addPerson(data.user);
                personNameInput.value = '';
            } else {
                alert('هذا المستخدم غير موجود على Instagram');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ أثناء التحقق من المستخدم');
        }
    }
    button.innerText = "اضافة شخص" 
});

function addPerson(user) {
    const personItem = document.createElement('div');
    personItem.className = 'person-item';
    
    const defaultAvatar = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEDUlEQVR4nO2aTW8TVxSGH5MQKEEgJIJCUZMQtUFqP0BXbNm75CfwCxCLhp/AqquWdR3KChWJLaRSF0nUTUwSFL6aEFBbqrZplcQex87g8fhePnru9YwzdmLHccaZI71KdOee8z4+985cnyNBQEBAQMDHyLYdxAr/J1ZB8SjwRwxEYvBiDbQVi1hBP/7/EZ4nXeJkRtVXPgb4DPgV+A54uwF6gNmMqq984QHgGnAGiGwA0VHgOvAF8BGwI6PqK18UuArsB7IbIPw14DugA0iUXHSbQIxQvj9ahRihlGhnVRAaXwX9+P9HeJ500SVfn4Ke7DJFA/4v0W0CBT3ZZYoG/F+i2wQKerLLFA34v0S3CRT0ZJcpGvB/iW4TKOjJLlM04P8S3SZQ0JNdpmjA/yW6TaCgJ7tM0YD/S3SbQEFPdpmiAf+X6DaBgp7sMkUD/i/RbQIFPdllisZ2WwL/9T3Qs3/8EKxN+BeeL3Xgu8BBq5OD9N898MYn8eV74N0Lfb7u8+vO4/2wZ9/4vs6v4Pm/8MIDePGXtRYtVwA+N4VHD8GzR9aGX/wNzx7D9DRoE5Bzw0Pw12OYmnTOTz2xrrXVKXDrgL/yqn/u/eJ+G7zsg+lnMDFhEXmhr9Vq79Rz0GZgesYSWvfR5+X7wkP4s9O5fmvSVqe8fzQ1BjNa8HOrk/7/KLzusfYrSp38dQTe9sO/zyHbYwn2+hUM/g6vX5mE0k8tYVLJsX7MdsPgSwvV5bjVKd//j9ILkO2F0ZdVEJ6ZsAzKvbI+c5OwoG0qMbczlsBjA5awQxn4owPGhi1RYi+tDv1MdwLRXnNPrsf6zL6A3IAlXnbAEkn3iY/Aq0fWgE13wPgwZHRbyrZbR3KFg934iPU5ORYcv9paBYx5n4D4CIwNWueMvqnhflb5OToIwwNrC5A9/8OQzdgTMdJvTVE0YwnrnA9Cdtg5kkPW+c4nNFYBr4dNR45D9wWPiyxLzNExS7xEn7WUEgPmvGSfaazjw5D6Cd50weFOOH0eOk7BoTNw8Fvo/AHOX4IrN+HqLfjlfyAJXL4Bv96GKz/DpevWMfmddW35nXPtxWvw8004d9Hqc/q8dW35t7Z/05bAvxEV4HcJNEQFbDa+BIzGV4DPl0CDAkZbqgB/L4GGBYy2VAH+XgINCxhtqQL8vQQaFjDaUgX4ewk0LGC0pQrw9xJoWMBoSxXg7yXQsIDRlirA30ugYQGjLVWAv5dAwwJGW6oAvyyBCHDIDuUJdW6HHV4OJhsVPmUfbRHxVzhWSPgoG0/YPx8lSk+7hT/MxhP2z0eJ0tNu4Q+z8YT981Gi9LRb+MNsPGH/fJQoPe0W/jAbT9g/HyVKT7uFP8zGE1Xzcb6AoDZ+JmtAQEBAQBDg8A7+C75mlJsvxgAAAABJRU5ErkJggg==';
    
    const profilePicUrl = user.profile_pic_url && user.profile_pic_url.trim() !== '' 
        ? `/proxy-media?url=${encodeURIComponent(user.profile_pic_url)}`
        : defaultAvatar;

    personItem.innerHTML = `
        <img src="${profilePicUrl}" alt="${user.username}" onerror="this.onerror=null; this.src='${defaultAvatar}';">
        <h3 >${user.full_name || 'اسم غير معروف'}</h3>
        <p>@${user.username}</p>
        <button style ="font-family: 'Tajawal', sans-serif;  font-weight: bold; " class="download-btn">تحميل القصص</button>
        <button style ="font-family: 'Tajawal', sans-serif;  font-weight: bold; " class="view-btn">عرض ستوريات</button>
        <button style ="font-family: 'Tajawal', sans-serif;  font-weight: bold; " class="delete-btn">حذف</button>
    `;

    personItem.querySelector('.view-btn').addEventListener('click', function () {
        window.location.href = `/view_stories?username=${encodeURIComponent(user.username)}`;
    });
    personItem.querySelector('.delete-btn').addEventListener('click', function () {
        peopleList.removeChild(personItem);
    });

    personItem.querySelector('.download-btn').addEventListener('click', async function () {
        await downloadStories(user.username);
    });

    peopleList.appendChild(personItem);

    const img = personItem.querySelector('img');
    img.onload = function() {
        console.log(`تم تحميل الصورة بنجاح لـ ${user.username}`);
    };
    img.onerror = function() {
        console.error(`فشل في تحميل الصورة لـ ${user.username}، استخدام الصورة الافتراضية`);
        this.src = defaultAvatar;
    };
}

async function downloadStories(username) {
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
            if (data.stories && data.stories.length > 0) {
                // تحميل جميع القصص
                data.stories.forEach((story, index) => {
                    setTimeout(() => {
                        downloadStory(story.url, story.filename);
                    }, index * 1000); // تأخير كل تحميل بثانية واحدة لتجنب التحميل المتزامن
                });
                alert(`جاري تحميل ${data.stories.length} قصة لـ ${username}`);
            } else {
                alert(`لا توجد قصص متاحة لـ ${username}`);
            }
        } else {
            alert(`خطأ: ${data.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ أثناء جلب القصص');
    }
}

function downloadStory(url, filename) {
    const link = document.createElement('a');
    link.href = `/download-story?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


// const addPersonForm = document.getElementById('addPersonForm');
// const personNameInput = document.getElementById('personName');
// const peopleList = document.getElementById('peopleList');

// addPersonForm.addEventListener('submit', async function (e) {
//     const button = document.getElementById("button")
//     button.innerText = "انتظر قليلا ..."
//     e.preventDefault();
//     const name = personNameInput.value.trim();
//     if (name) {
//         try {
//             const response = await fetch('/check-user', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ username: name }),
//             });
//             const data = await response.json();
//             if (data.exists) {
//                 addPerson(data.user);
//                 personNameInput.value = '';
//             } else {
//                 alert('هذا المستخدم غير موجود على Instagram');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('حدث خطأ أثناء التحقق من المستخدم');
//         }
//     }
//     button.innerText = "اضافة شخص" 
// });

// function addPerson(user) {
//     const personItem = document.createElement('div');
//     personItem.className = 'person-item';
    
//     const defaultAvatar = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEDUlEQVR4nO2aTW8TVxSGH5MQKEEgJIJCUZMQtUFqP0BXbNm75CfwCxCLhp/AqquWdR3KChWJLaRSF0nUTUwSFL6aEFBbqrZplcQex87g8fhePnru9YwzdmLHccaZI71KdOee8z4+985cnyNBQEBAQMDHyLYdxAr/J1ZB8SjwRwxEYvBiDbQVi1hBP/7/EZ4nXeJkRtVXPgb4DPgV+A54uwF6gNmMqq984QHgGnAGiGwA0VHgOvAF8BGwI6PqK18UuArsB7IbIPw14DugA0iUXHSbQIxQvj9ahRihlGhnVRAaXwX9+P9HeJ500SVfn4Ke7DJFA/4v0W0CBT3ZZYoG/F+i2wQKerLLFA34v0S3CRT0ZJcpGvB/iW4TKOjJLlM04P8S3SZQ0JNdpmjA/yW6TaCgJ7tM0YD/S3SbQEFPdpmiAf+X6DaBgp7sMkUD/i/RbQIFPdllisZ2WwL/9T3Qs3/8EKxN+BeeL3Xgu8BBq5OD9N898MYn8eV74N0Lfb7u8+vO4/2wZ9/4vs6v4Pm/8MIDePGXtRYtVwA+N4VHD8GzR9aGX/wNzx7D9DRoE5Bzw0Pw12OYmnTOTz2xrrXVKXDrgL/yqn/u/eJ+G7zsg+lnMDFhEXmhr9Vq79Rz0GZgesYSWvfR5+X7wkP4s9O5fmvSVqe8fzQ1BjNa8HOrk/7/KLzusfYrSp38dQTe9sO/zyHbYwn2+hUM/g6vX5mE0k8tYVLJsX7MdsPgSwvV5bjVKd//j9ILkO2F0ZdVEJ6ZsAzKvbI+c5OwoG0qMbczlsBjA5awQxn4owPGhi1RYi+tDv1MdwLRXnNPrsf6zL6A3IAlXnbAEkn3iY/Aq0fWgE13wPgwZHRbyrZbR3KFg934iPU5ORYcv9paBYx5n4D4CIwNWueMvqnhflb5OToIwwNrC5A9/8OQzdgTMdJvTVE0YwnrnA9Cdtg5kkPW+c4nNFYBr4dNR45D9wWPiyxLzNExS7xEn7WUEgPmvGSfaazjw5D6Cd50weFOOH0eOk7BoTNw8Fvo/AHOX4IrN+HqLfjlfyAJXL4Bv96GKz/DpevWMfmddW35nXPtxWvw8004d9Hqc/q8dW35t7Z/05bAvxEV4HcJNEQFbDa+BIzGV4DPl0CDAkZbqgB/L4GGBYy2VAH+XgINCxhtqQL8vQQaFjDaUgX4ewk0LGC0pQrw9xJoWMBoSxXg7yXQsIDRlirA30ugYQGjLVWAv5dAwwJGW6oAvyyBCHDIDuUJdW6HHV4OJhsVPmUfbRHxVzhWSPgoG0/YPx8lSk+7hT/MxhP2z0eJ0tNu4Q+z8YT981Gi9LRb+MNsPGH/fJQoPe0W/jAbT9g/HyVKT7uFP8zGE1Xzcb6AoDZ+JmtAQEBAQBDg8A7+C75mlJsvxgAAAABJRU5ErkJggg==';
    
//     const profilePicUrl = user.profile_pic_url && user.profile_pic_url.trim() !== '' 
//         ? `/proxy-media?url=${encodeURIComponent(user.profile_pic_url)}`
//         : defaultAvatar;

//     personItem.innerHTML = `
//         <img src="${profilePicUrl}" alt="${user.username}" onerror="this.onerror=null; this.src='${defaultAvatar}';">
//         <h3>${user.full_name || 'اسم غير معروف'}</h3>
//         <p>@${user.username}</p>
//         <button class="download-btn">تحميل القصص</button>
//         <button class="view-btn"> عرض ستوريات</button>
//         <button class="delete-btn">حذف</button>
//     `;

//     personItem.querySelector('.view-btn').addEventListener('click', function () {
//         window.location.href = "/view_stories";
//     });
//     personItem.querySelector('.delete-btn').addEventListener('click', function () {
//         peopleList.removeChild(personItem);
//     });

//     personItem.querySelector('.download-btn').addEventListener('click', async function () {
//         await downloadStories(user.username);
//     });

//     peopleList.appendChild(personItem);

//     const img = personItem.querySelector('img');
//     img.onload = function() {
//         console.log(`تم تحميل الصورة بنجاح لـ ${user.username}`);
//     };
//     img.onerror = function() {
//         console.error(`فشل في تحميل الصورة لـ ${user.username}، استخدام الصورة الافتراضية`);
//         this.src = defaultAvatar;
//     };
// }

// async function downloadStories(username) {
//     try {
//         const response = await fetch('/fetch-stories', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ username }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//             if (data.stories && data.stories.length > 0) {
//                 // تحميل جميع القصص
//                 data.stories.forEach((story, index) => {
//                     setTimeout(() => {
//                         downloadStory(story.url, story.filename);
//                     }, index * 1000); // تأخير كل تحميل بثانية واحدة لتجنب التحميل المتزامن
//                 });
//                 alert(`جاري تحميل ${data.stories.length} قصة لـ ${username}`);
//             } else {
//                 alert(`لا توجد قصص متاحة لـ ${username}`);
//             }
//         } else {
//             alert(`خطأ: ${data.error}`);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('حدث خطأ أثناء جلب القصص');
//     }
// }

// function downloadStory(url, filename) {
//     const link = document.createElement('a');
//     link.href = `/download-story?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`;
//     link.download = filename;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// }
// // const addPersonForm = document.getElementById('addPersonForm');
// // const personNameInput = document.getElementById('personName');
// // const peopleList = document.getElementById('peopleList');

// // addPersonForm.addEventListener('submit', async function (e) {
// //     e.preventDefault();
// //     const name = personNameInput.value.trim();
// //     if (name) {
// //         try {
// //             const response = await fetch('/check-user', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify({ username: name }),
// //             });
// //             const data = await response.json();
// //             if (data.exists) {
// //                 addPerson(data.user);
// //                 personNameInput.value = '';
// //             } else {
// //                 alert('هذا المستخدم غير موجود على Instagram');
// //             }
// //         } catch (error) {
// //             console.error('Error:', error);
// //             alert('حدث خطأ أثناء التحقق من المستخدم');
// //         }
// //     }
// // });

// // function addPerson(user) {
// //     const personItem = document.createElement('div');
// //     personItem.className = 'person-item';
    
// //     // Use a data URI for the default avatar
// //     const defaultAvatar = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEDUlEQVR4nO2aTW8TVxSGH5MQKEEgJIJCUZMQtUFqP0BXbNm75CfwCxCLhp/AqquWdR3KChWJLaRSF0nUTUwSFL6aEFBbqrZplcQex87g8fhePnru9YwzdmLHccaZI71KdOee8z4+985cnyNBQEBAQMDHyLYdxAr/J1ZB8SjwRwxEYvBiDbQVi1hBP/7/EZ4nXeJkRtVXPgb4DPgV+A54uwF6gNmMqq984QHgGnAGiGwA0VHgOvAF8BGwI6PqK18UuArsB7IbIPw14DugA0iUXHSbQIxQvj9ahRihlGhnVRAaXwX9+P9HeJ500SVfn4Ke7DJFA/4v0W0CBT3ZZYoG/F+i2wQKerLLFA34v0S3CRT0ZJcpGvB/iW4TKOjJLlM04P8S3SZQ0JNdpmjA/yW6TaCgJ7tM0YD/S3SbQEFPdpmiAf+X6DaBgp7sMkUD/i/RbQIFPdllisZ2WwL/9T3Qs3/8EKxN+BeeL3Xgu8BBq5OD9N898MYn8eV74N0Lfb7u8+vO4/2wZ9/4vs6v4Pm/8MIDePGXtRYtVwA+N4VHD8GzR9aGX/wNzx7D9DRoE5Bzw0Pw12OYmnTOTz2xrrXVKXDrgL/yqn/u/eJ+G7zsg+lnMDFhEXmhr9Vq79Rz0GZgesYSWvfR5+X7wkP4s9O5fmvSVqe8fzQ1BjNa8HOrk/7/KLzusfYrSp38dQTe9sO/zyHbYwn2+hUM/g6vX5mE0k8tYVLJsX7MdsPgSwvV5bjVKd//j9ILkO2F0ZdVEJ6ZsAzKvbI+c5OwoG0qMbczlsBjA5awQxn4owPGhi1RYi+tDv1MdwLRXnNPrsf6zL6A3IAlXnbAEkn3iY/Aq0fWgE13wPgwZHRbyrZbR3KFg934iPU5ORYcv9paBYx5n4D4CIwNWueMvqnhflb5OToIwwNrC5A9/8OQzdgTMdJvTVE0YwnrnA9Cdtg5kkPW+c4nNFYBr4dNR45D9wWPiyxLzNExS7xEn7WUEgPmvGSfaazjw5D6Cd50weFOOH0eOk7BoTNw8Fvo/AHOX4IrN+HqLfjlfyAJXL4Bv96GKz/DpevWMfmddW35nXPtxWvw8004d9Hqc/q8dW35t7Z/05bAvxEV4HcJNEQFbDa+BIzGV4DPl0CDAkZbqgB/L4GGBYy2VAH+XgINCxhtqQL8vQQaFjDaUgX4ewk0LGC0pQrw9xJoWMBoSxXg7yXQsIDRlirA30ugYQGjLVWAv5dAwwJGW6oAvyyBCHDIDuUJdW6HHV4OJhsVPmUfbRHxVzhWSPgoG0/YPx8lSk+7hT/MxhP2z0eJ0tNu4Q+z8YT981Gi9LRb+MNsPGH/fJQoPe0W/jAbT9g/HyVKT7uFP8zGE1Xzcb6AoDZ+JmtAQEBAQBDg8A7+C75mlJsvxgAAAABJRU5ErkJggg==';
    
// //     // Use the proxy-media endpoint to load the profile picture
// //     const profilePicUrl = user.profile_pic_url && user.profile_pic_url.trim() !== '' 
// //         ? `/proxy-media?url=${encodeURIComponent(user.profile_pic_url)}`
// //         : defaultAvatar;

// //     personItem.innerHTML = `
// //         <img src="${profilePicUrl}" alt="${user.username}" onerror="this.onerror=null; this.src='${defaultAvatar}';">
// //         <h3>${user.full_name || 'اسم غير معروف'}</h3>
// //         <p>@${user.username}</p>
// //         <button class="download-btn">تحميل القصص</button>
// //         <button class="delete-btn">حذف</button>
// //     `;

// //     personItem.querySelector('.delete-btn').addEventListener('click', function () {
// //         peopleList.removeChild(personItem);
// //     });

// //     personItem.querySelector('.download-btn').addEventListener('click', function () {
// //         alert(`تم طلب تحميل قصص ${user.username}`);
// //     });

// //     peopleList.appendChild(personItem);

// //     // Check if the image loaded successfully
// //     const img = personItem.querySelector('img');
// //     img.onload = function() {
// //         console.log(`تم تحميل الصورة بنجاح لـ ${user.username}`);
// //     };
// //     img.onerror = function() {
// //         console.error(`فشل في تحميل الصورة لـ ${user.username}، استخدام الصورة الافتراضية`);
// //         this.src = defaultAvatar;
// //     };
// // }