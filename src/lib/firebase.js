
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

if (!admin.apps.length) {
    try {
        const serviceAccount = {
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
        };

        if (serviceAccount.privateKey) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
            console.log("Firebase Admin Initialized (Env Vars)");
        } else {
            try {
                const serviceAccountFile = require('../../serviceAccountKey.json');
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccountFile)
                });
                console.log("Firebase Admin Initialized (File)");
            } catch (fileError) {
                console.warn("Firebase Admin Initialization Failed: Missing credentials (Env or File).", fileError.message);
            }
        }
    } catch (error) {
        console.error("Firebase Admin Init Error:", error);
    }
}

const db = admin.apps.length ? getFirestore() : null;
export { db };
