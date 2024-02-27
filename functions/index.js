const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.lowercaseProductName = functions.firestore.document('/products/{documentId}')
    .onCreate((snap, context) => {
        const name = snap.data().name;

        functions.logger.log('Nome do produto em letras minúsculas', context.params.documentId, name);

        const lowercaseName = name.toLowerCase();

        return snap.ref.set({ name_lower: lowercaseName }, { merge: true });
    });

