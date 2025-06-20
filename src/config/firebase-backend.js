import admin from 'firebase-admin';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(
    readFileSync('./src/config/firebaseCredentials.json', 'utf8')
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore();

console.log("Conectando a Firestore...");

if (db) {
    console.log("🚀🔥🚀🔥Firestore conectado correctamente!🚀🔥🚀🔥");
} else {
    console.error("❌❌❌❌❌Error al conectar con Firestore!❌❌❌❌❌");
}
