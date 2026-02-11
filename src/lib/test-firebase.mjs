
import { db } from './firebase.js';

async function testConnection() {
    try {
        console.log("Attempting to connect to Firebase...");

        // Allow a small delay for init
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!db) {
            throw new Error("Database instance is null. Check initialization.");
        }
        const testDoc = await db.collection('test_connection').add({
            timestamp: new Date(),
            status: 'Connected successfully via Node script'
        });
        console.log("✅ Connection Successful! Document ID:", testDoc.id);
        process.exit(0);
    } catch (error) {
        console.error("❌ Connection Failed:", error);
        process.exit(1);
    }
}

testConnection();
