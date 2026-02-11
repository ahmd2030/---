
const { db } = require('./firebase');

async function testConnection() {
    try {
        console.log("Attempting to connect to Firebase...");
        if (!db) {
            throw new Error("Database instance is null. Check initialization.");
        }
        const testDoc = await db.collection('test_connection').add({
            timestamp: new Date(),
            status: 'Connected successfully via Node script'
        });
        console.log("✅ Connection Successful! Document ID:", testDoc.id);
    } catch (error) {
        console.error("❌ Connection Failed:", error);
    }
}

testConnection();
