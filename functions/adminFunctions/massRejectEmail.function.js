const admin = require("firebase-admin");
const functions = require("firebase-functions");

const db = admin.firestore();

module.exports.massRejectEmail = functions.https.onCall(async data => {
  // Format of UIDList = array of strings
  var UIDList = data.UIDList;
  UIDList.forEach(async uid => {
    const user = db.collection("users").doc(uid);
    const application = db.collection("applications").doc(uid);
    await user.update({
      applicationStatus: 2
    });
    await application.update({
      status: 2
    });
  });
});
