const firebase= require("../config/firebaseConfig")

const db= firebase.default.firestore();

class Session {
  
    createSession(sessionID, uid, ownerDeviceToken) {
        try {
            db.collection('reactApp').doc(sessionID).set({
                "owner": uid,
                "gameType": "3cp",
                "session": sessionID,
                "ownerDeviceToken": ownerDeviceToken,
                "users": [uid],
            })

        } catch (error) {
            console.log(`error while saving users to firestore =`, error)
        }
    }

    async getSession(sessionID) {
        try {
            const sessionData = (await db.collection('reactApp').doc(sessionID).get()).data()
            return sessionData

        } catch (error) {
            console.log(`error while getting user from firestore =`, error)
        }
    }
}


module.exports = Session