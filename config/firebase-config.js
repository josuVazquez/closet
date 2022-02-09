const admin = require('firebase-admin');

const serviceAccount = require('../env/closet-8d3b6-firebase-adminsdk-3yt7v-a5976bc6c2.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
