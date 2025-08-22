import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging.js";

// Firebase 配置
const firebaseConfig = {
    apiKey: "AIzaSyA29AgqdTUe1XWd0zGhkd7HDtT3yM1FTTE",
    authDomain: "kobe-8a3eb.firebaseapp.com",
    projectId: "kobe-8a3eb",
    storageBucket: "kobe-8a3eb.firebasestorage.app",
    messagingSenderId: "849528387227",
    appId: "1:849528387227:web:7a4cd043c1cc9921d4f83e",
    measurementId: "G-HBXX0P71DE"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 注册 Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('Service Worker 注册成功', reg))
        .catch(err => console.error('Service Worker 注册失败', err));
}

// 请求通知权限并获取 FCM token
document.getElementById('request-permission').addEventListener('click', async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const token = await getToken(messaging, { vapidKey: "BBltC3GkfvNkDNVCeZ_PDuQtlJEiSFAAk2t8gDjF2-orAL080sCfS5xqFromS3VGKrJ__GOfvNbKVZv1Nseddug" });
            console.log('FCM Token:', token);
            alert('通知权限已允许，token 已打印到控制台');
        } else {
            alert('用户拒绝通知权限');
        }
    } catch (err) {
        console.error('FCM 初始化失败', err);
    }
});

// 前台消息监听
onMessage(messaging, (payload) => {
    console.log('前台消息:', payload);
    alert(`消息: ${payload.notification?.title} - ${payload.notification?.body}`);
});
