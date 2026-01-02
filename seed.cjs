const admin = require("firebase-admin");
const fs = require("fs");

// Load service account
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Load books.json
const data = JSON.parse(fs.readFileSync("./books.json", "utf8"));
const books = data.books;

async function seedBooks() {
  const batch = db.batch();

  books.forEach((book) => {
    const docRef = db.collection("books").doc();
    batch.set(docRef, book);
  });

  await batch.commit();
  console.log("✅ Firestore seeded successfully");
}

seedBooks().catch(console.error);
