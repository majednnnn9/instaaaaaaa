const { IgApiClient } = require('instagram-private-api');

const ig = new IgApiClient();
let isLoggedIn = false;

async function login() {
  if (!isLoggedIn) {
    ig.state.generateDevice(process.env.IG_USERNAME);
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    isLoggedIn = true;
    console.log('تم تسجيل الدخول بنجاح');
  } else {
    console.log('تم تسجيل الدخول مسبقاً');
  }
}

async function fetchStories(username) {
  const user = await ig.user.searchExact(username);
  if (!user) {
    throw new Error('لم يتم العثور على المستخدم');
  }

  const userStories = await ig.feed.userStory(user.pk).items();

  console.log(`Found ${userStories.length} stories for user ${username}`);

  if (userStories.length === 0) {
    throw new Error('لا توجد قصص متاحة لهذا المستخدم');
  }

  return userStories.map((story, index) => {
    let mediaUrl;
    let fileExtension;
    
    if (story.video_versions && story.video_versions.length > 0) {
      mediaUrl = story.video_versions[0].url;
      fileExtension = 'mp4';
    } else if (story.image_versions2 && story.image_versions2.candidates.length > 0) {
      mediaUrl = story.image_versions2.candidates[0].url;
      fileExtension = 'jpg';
    } else {
      console.log('No media found in this story item');
      return null;
    }

    return {
      url: mediaUrl,
      filename: `${username}_${story.id}.${fileExtension}`,
      type: fileExtension === 'mp4' ? 'video' : 'image'
    };
  }).filter(story => story !== null);
}
async function checkUser(username) {
  try {
    const user = await ig.user.searchExact(username);
    if (user) {
      const userInfo = await ig.user.info(user.pk);
      // console.log('User info:', userInfo); // إضافة هذا السطر للتسجيل
      return {
        username: userInfo.username,
        full_name: userInfo.full_name,
        profile_pic_url: userInfo.profile_pic_url
      };
    }
    return null;
  } catch (error) {
    console.error('Error checking user:', error);
    return null;
  }
}
module.exports = { login, fetchStories , checkUser };