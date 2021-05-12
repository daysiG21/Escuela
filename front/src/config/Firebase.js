import firebase from 'firebase'
const config ={
  apiKey: "AIzaSyDwFHtBalfHW6Iou2tbhyKJqxfcoWTHWYI",
    authDomain: "demoonline-4331e.firebaseapp.com",
    projectId: "demoonline-4331e",
    storageBucket: "demoonline-4331e.appspot.com",
    messagingSenderId: "1062807805802",
    appId: "1:1062807805802:web:6cf0fabe25e60acfd4cf13",
    measurementId: "G-LTFEGQ0Y6C"
};

const fire = firebase.initializeApp(config)

export{
  fire as default
}