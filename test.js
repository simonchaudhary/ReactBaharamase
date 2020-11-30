const Session= require("./src/firebase_service/session")

const session= new Session()

session.createSession("test", "user1", "devicetoken")