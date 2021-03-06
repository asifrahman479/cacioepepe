const admin = require("firebase-admin");
const functions = require("firebase-functions");

const db = admin.firestore();

module.exports.changeRegistrationSchedule = functions.https.onCall(
  async data => {
    // Should have validators to confirmation that format of date is maintained.
    var startDate = data.startDate;
    var closeDate = data.closeDate;
    const application = db.collection("admin").doc("registrationSchedule");
    await application.update({
      open: startDate,
      close: closeDate
    });
    return;
  }
);
