const admin = require('firebase-admin');
const serviceAccount = require('./onecar1-adminsdk.json');

if (!process.argv[2]) {
    console.error('Please provide an email address: node promote-user.cjs your@email.com');
    process.exit(1);
}

const email = process.argv[2];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://onecar1-default-rtdb.firebaseio.com"
});

const db = admin.database();
const auth = admin.auth();

async function promote() {
    try {
        const userRecord = await auth.getUserByEmail(email);
        const uid = userRecord.uid;
        
        await db.ref(`users/${uid}`).update({
            email: email,
            role: 'admin',
            name: 'المسؤول الرئيسي'
        });
        
        console.log(`Successfully promoted ${email} (${uid}) to admin!`);
        process.exit(0);
    } catch (error) {
        console.error('Error promoting user:', error.message);
        process.exit(1);
    }
}

promote();
