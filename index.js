require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const session = require('express-session');
const dbConnect = require("./config/database")
const { login, fetchStories } = require('./helpers');
const { checkUser } = require('./helpers');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

// database connection function
// dbConnect();
// تسجيل الدخول عند بدء تشغيل الخادم
// (async () => {
//   try {
//     await login();
//   } catch (error) {
//     console.error('فشل في تسجيل الدخول عند بدء التشغيل:', error);
//   }
// })();
// app.use(session({
//   secret: 'SECRET_SESSION',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false } // استخدم true إذا كنت تستخدم HTTPS
// }));

// Routes 

app.get('/github', (req, res) => { 
  //  res.json({"msg" : "hi"})
  res.render('github')
})
app.get('/setting', (req, res) => {
  res.render("setting")
})
app.get('/', (req, res) => {
  res.render("home")
})
app.get('/search', (req, res) => {
  res.render('search_name_storeis');
});
app.get('/favorite', (req, res) => {
  res.render('favorite')
})
app.get('/view_stories', (req, res) => {
  res.render('view_stories');
});

app.get('/auth', (req, res) => {
  res.render('authentection');
});
app.get('/alert', (req, res) => {
  res.render('alert')
})
app.use('/api/v1', require('./routes/user_route'))

// Function
app.post('/login_button', (req, res) => {
  if (req.body.username === "majed") {
    res.json({ msg: "successful", data: req.body })
  }

})

app.post('/fetch-stories', async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'يرجى توفير اسم المستخدم' });
  }

  try {
    console.log(`Attempting to fetch stories for user: ${username}`);
    const stories = await fetchStories(username);

    res.json({ message: 'تم العثور على القصص', stories });
  } catch (error) {
    console.error('Error:', error);
    let errorMessage = 'حدث خطأ أثناء البحث عن القصص';
    if (error.message) {
      errorMessage += `: ${error.message}`;
    }
    res.status(500).json({ error: errorMessage });
  }
});

app.get('/proxy-media', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'يرجى توفير رابط الوسائط' });
  }

  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream'
    });

    res.setHeader('Content-Type', response.headers['content-type']);
    response.data.pipe(res);
  } catch (error) {
    console.error('Error proxying media:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء جلب الوسائط' });
  }
});


app.get('/download-story', async (req, res) => {
  const { url, filename } = req.query;

  if (!url || !filename) {
    return res.status(400).json({ error: 'يرجى توفير رابط الملف واسم الملف' });
  }

  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream'
    });

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', response.headers['content-type']);

    response.data.pipe(res);
  } catch (error) {
    console.error('Error downloading story:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء تحميل القصة' });
  }
});
app.post('/check-user', async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'يرجى توفير اسم المستخدم' });
  }

  try {
    const user = await checkUser(username);
    console.log(user)
    if (user) {
      res.json({ exists: true, user });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء التحقق من المستخدم' });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
