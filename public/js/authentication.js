function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function showLogin() {
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('registerContainer').style.display = 'none';
}

function showRegister() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('registerContainer').style.display = 'block';
}

document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const button = document.getElementById("button")
    button.innerText = "انتظر قليلا .. "
    button.style.backgroundColor = "#808080"
    // هنا يمكنك إضافة كود لإرسال بيانات تسجيل الدخول إلى الخادم
    // console.log('تسجيل الدخول:', { username, password });
    const response = await fetch('/click_button', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.msg == "successful") {
        button.innerText = "تم تسجيل الدخول"
        button.style.backgroundColor = "#006400"
        await delay(1000)
        window.location.href = '/';
    } else {
        console.log("لم يتم تسجيل الدخول")
    }
    // console.log(data)
});

document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('كلمات المرور غير متطابقة');
        return;
    }

    // هنا يمكنك إضافة كود لإرسال بيانات التسجيل إلى الخادم
    console.log('إنشاء حساب:', { username, email, password });
});