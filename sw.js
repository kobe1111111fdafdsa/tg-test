importScripts('https://www.gstatic.com/firebasejs/12.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging-compat.js');


firebase.initializeApp({
    apiKey: "AIzaSyA29AgqdTUe1XWd0zGhkd7HDtT3yM1FTTE",
    authDomain: "kobe-8a3eb.firebaseapp.com",
    projectId: "kobe-8a3eb",
    storageBucket: "kobe-8a3eb.firebasestorage.app",
    messagingSenderId: "849528387227",
    appId: "1:849528387227:web:7a4cd043c1cc9921d4f83e",
    measurementId: "G-HBXX0P71DE"
});

const messaging = firebase.messaging();

// 后台消息监听
messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] 收到后台消息:', payload);

    const notificationTitle = payload.notification?.title || '新消息';
    const notificationOptions = {
        body: payload.notification?.body || '',
        icon: '/icon.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
