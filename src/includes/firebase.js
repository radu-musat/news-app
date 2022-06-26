// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAkD5_fQRIHfmOg9X11Gsu-tCmAVuTzt7c',
	authDomain: 'webpilgrim-2d3eb.firebaseapp.com',
	projectId: 'webpilgrim-2d3eb',
	storageBucket: 'webpilgrim-2d3eb.appspot.com',
	// messagingSenderId: '227800699167',
	appId: '1:227800699167:web:aa8bd59503eb330826a02a',
};

// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// export default firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const	db = firebase.firestore();
const usersCollection = db.collection('users');

export {
	auth,
	db,
	usersCollection,
};
