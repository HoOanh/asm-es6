// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

import {
  getData,
  setCookie,
  createAccount,
  goBackAndRefresh,
} from '../config/global.js';

const firebaseConfig = {
  apiKey: 'AIzaSyArW5KQ2ulzJSVXRkqcmHDM34WXpNICeCw',
  authDomain: 'asm-es6-9c736.firebaseapp.com',
  databaseURL: 'https://asm-es6-9c736-default-rtdb.firebaseio.com',
  projectId: 'asm-es6-9c736',
  storageBucket: 'asm-es6-9c736.appspot.com',
  messagingSenderId: '297152601336',
  appId: '1:297152601336:web:76501d54d3ec1c7ea46f0d',
  measurementId: 'G-79T50QMYML',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);

const btnLogin = document.querySelector('#login-google');

btnLogin.addEventListener('click', (e) => {
  // signInWithRedirect(auth, provider);

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      const userInfo = {
        email: user.email,
        name: user.displayName,
        rank: 0,
        spam: 1,
        uid: user.uid,
      };

      getData('account').then((data) => {
        let check = false;
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const acc = data[key];

            if (acc.email == user.email && acc.uid == user.uid) {
              setCookie('id', key);
              setCookie('name', acc.name);
              setCookie('role', acc.rank);

              goBackAndRefresh();
              return (check = true);
            }
          }
        }

        if (!check) {
          createAccount(userInfo);
          setCookie('id', user.uid);
          setCookie('name', user.displayName);
          setCookie('role', 0);

          goBackAndRefresh();
        }
      });
    })
    .catch((error) => {
      throw new Error(error);
    });
});
