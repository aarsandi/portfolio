import firebase from 'firebase'
import 'firebase/storage'

// set your Firebase app
// run in cmd : firebase apps:create
// then copy code to cmd enter
// finally you got your code  firebase app and copy paste in here
export const app = firebase.initializeApp({
    "projectId": "",
    "appId": "",
    "databaseURL": "",
    "storageBucket": "",
    "locationId": "",
    "apiKey": "",
    "authDomain": "",
    "messagingSenderId": "",
    "measurementId": ""
});