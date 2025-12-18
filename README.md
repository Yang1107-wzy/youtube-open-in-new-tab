# YouTube Open Video in New Tab  
# YouTube 视频在新标签页打开（左键）

A Tampermonkey userscript that forces YouTube video links to open in a new browser tab,
similar to the behavior on Bilibili.

一个 Tampermonkey 用户脚本，用于强制 YouTube 视频在**新标签页**中打开，  
效果类似 B 站，避免覆盖当前推荐页 / 搜索页。

---

## ✨ Features | 功能特性

- Left-click opens videos in a new tab  
  左键点击视频即可在新标签页打开
- Keeps YouTube feed / search page intact  
  保留当前首页或搜索页，不会被覆盖
- Works with YouTube SPA navigation  
  适配 YouTube 单页应用（SPA）机制
- No ads, no tracking, lightweight  
  无广告、无追踪、脚本轻量
- Does not affect right-click or middle-click  
  不影响右键 / 中键原有行为

---

## 📦 Installation | 安装方式

### Step 1: Install Tampermonkey  
安装 Tampermonkey 浏览器扩展  
https://www.tampermonkey.net/

### Step 2: Install the userscript  
点击下面链接即可一键安装脚本：
https://raw.githubusercontent.com/Yang1107-wzy/youtube-open-in-new-tab/main/youtube-open-in-new-tab.user.js


Then click **Install** in Tampermonkey.  
在 Tampermonkey 页面点击 **Install / 安装** 即可完成。

---

## 🧭 Usage | 使用说明

1. Open YouTube homepage or search results  
   打开 YouTube 首页或搜索页
2. Left-click a video thumbnail or title  
   左键点击视频缩略图或标题
3. The video opens in a new tab automatically  
   视频会自动在新标签页打开

The original page will remain intact.  
原页面会被完整保留。

---

## ⚙️ Notes | 注意事项

- Only affects YouTube video links (`/watch`)  
  仅作用于 YouTube 视频链接（`/watch`）
- Shorts are not affected by default  
  默认不影响 Shorts（可在脚本中自行开启）
- YouTube UI changes may require script updates  
  YouTube 界面更新后，脚本可能需要同步更新

---

## 🛠 Development | 开发说明

This script works by intercepting YouTube click events and
forcing `window.open()` instead of SPA navigation.

该脚本通过拦截 YouTube 的点击事件，  
强制使用 `window.open()` 打开视频，从而避免单页路由跳转。

---

## 📜 License | 许可证

MIT License

You are free to use, modify, and distribute this script.  
你可以自由使用、修改和分发本脚本。

---

## 🙌 Acknowledgements | 致谢

Inspired by the browsing experience on Bilibili.  
灵感来源于 B 站的视频浏览体验。

