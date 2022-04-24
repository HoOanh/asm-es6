import { getData, createData } from '../../config/global.js';

const catOp = document.querySelector('#pro-cat');
let catId = '';

getData('categories').then((data) => {
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const cat = data[key];
      catOp.innerHTML += `<option data="${key}" value="${cat.slug}">${cat.name}</option>`;
      if (catId == '') catId = key;
    }
  }

  const select = document.querySelector('#pro-cat');
  select.addEventListener('change', (e) => {
    let op = e.target.querySelector(`option[value='${e.target.value}']`);
    catId = op.getAttribute('data');
  });
});

// set img

let proImg = document.querySelector('#pro-image');
let imgName = '';
let files = [];
let reader;

proImg.addEventListener('click', () => {
  let input = document.createElement('input');
  input.type = 'file';

  input.onchange = (e) => {
    files = e.target.files;
    imgName = files[0].name;
    reader = new FileReader();
    reader.onload = () => {
      document.querySelector('#pro-image').src = reader.result;
    };
    reader.readAsDataURL(files[0]);
  };

  input.click();
});

// handle submit

let addBtn = document.querySelector('#add-btn');
let mess = document.querySelector('.text-warning');

addBtn.addEventListener('click', () => {
  let name = document.querySelector('#pro-name');
  let price = document.querySelector('#pro-price');
  let cat = document.querySelector('#pro-cat');
  let sale = document.querySelector('#pro-sale');
  let details = document.querySelector('#pro-details');
  let highlight = document.querySelector('#highlight');

  if (
    name.value == '' ||
    price.value == '' ||
    details.value == '' ||
    sale.value == '' ||
    imgName == ''
  ) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return (mess.innerHTML = 'Vui lòng nhập đủ thông tin');
  }

  let product = {
    name: name.value.trim(),
    detail: details.value.trim(),
    sale: parseFloat(sale.value),
    price: parseInt(price.value),
    highlight: parseInt(highlight.value),
    cate_slug: cat.value,
    cate_id: catId,
    slug: slugVietnamese(name.value.trim()),
  };

  uploadImg(product);
});

//==================== use firebase app
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js';

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
const storage = getStorage();

// ----------------upload process--------------
const uploadImg = (product) => {
  const metadata = {
    contentType: `image/${imgName.slice(imgName.lastIndexOf('.') + 1)}`,
  };

  let storageRef = ref(storage, `images/product/${imgName}`);
  const uploadTask = uploadBytesResumable(storageRef, files[0], metadata);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      document.querySelector('.progess').innerHTML = `
      Đang xử lý: ${parseInt(progress)}%
      `;
    },
    function (error) {
      alert('Co loi ');
    },
    function () {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        const productNew = { ...product, image: url };

        createData('products', productNew);
      });
    }
  );
};
