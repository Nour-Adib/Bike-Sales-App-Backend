const { initializeApp } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');
const admin = require("firebase-admin");

var serviceAccount = JSON.parse(process.env.FIREBASE_PRIV_KEY);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'bike-sale-6c2d2.appspot.com'
});

const bucket = getStorage().bucket();

module.exports = { bucket };