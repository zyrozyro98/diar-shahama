const admin = require('firebase-admin');
const serviceAccount = require('./onecar1-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://onecar1-default-rtdb.firebaseio.com"
});

const db = admin.database();

const defaultSettings = {
  companyNameAr: "ون كار للسيارات",
  companyNameEn: "One Car For Cars",
  maintenanceMode: false,
  whatsappNumber: "966500000000",
  primaryColor: "#E31E24",
  secondaryColor: "#1A1A1A",
  currencyAr: "ريال",
  currencyEn: "SAR"
};

async function seed() {
    try {
        await db.ref('settings').set(defaultSettings);
        console.log("Successfully initialized settings!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding settings:", error);
        process.exit(1);
    }
}

seed();
