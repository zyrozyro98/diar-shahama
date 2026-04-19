const admin = require('firebase-admin');
const serviceAccount = require('./onecar1-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://onecar1-default-rtdb.firebaseio.com"
});

const auth = admin.auth();

async function listUsers() {
    try {
        const listUsersResult = await auth.listUsers(100);
        listUsersResult.users.forEach((userRecord) => {
            console.log(userRecord.email, '(', userRecord.uid, ')');
        });
        process.exit(0);
    } catch (error) {
        console.error('Error listing users:', error);
        process.exit(1);
    }
}

listUsers();
