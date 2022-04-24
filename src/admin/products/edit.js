import { getData, getOneDataByKey, updateData } from '../../config/global.js';

let params = new URLSearchParams(location.search);
let id = params.get('id');
let catId = '';
// ===================== Load product
getOneDataByKey('products', id).then((pro) => {
  document.querySelector('#pro-name').value = pro.name;
  document.querySelector('#pro-price').value = pro.price;
  document.querySelector('#pro-image').src = pro.image;
  document.querySelector('#pro-sale').value = pro.sale;
  document.querySelector('#pro-details').value = pro.detail;

  let highlight = document.querySelectorAll('#highlight option');

  const catOp = document.querySelector('#pro-cat');
  getData('categories').then((data) => {
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const cat = data[key];
        catOp.innerHTML +=
          key == pro.cat_id
            ? `<option selected data="${key}" value="${cat.slug}">${cat.name}</option>`
            : `<option data="${key}" value="${cat.slug}">${cat.name}</option>`;
        if (key == pro.cat_id) catId = key;
      }
    }
  });

  const select = document.querySelector('#pro-cat');
  select.addEventListener('change', (e) => {
    let op = e.target.querySelector(`option[value='${e.target.value}']`);
    catId = op.getAttribute('data');
  });

  pro.highlight
    ? (highlight[1].selected = 'selected')
    : (highlight[0].selected = 'selected');
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
    sale.value == ''
  ) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return (mess.innerHTML = 'Vui lòng nhập đủ thông tin');
  }

  const product = {
    name: name.value.trim(),
    detail: details.value.trim(),
    sale: parseFloat(sale.value),
    price: parseInt(price.value),
    highlight: parseInt(highlight.value),
    cat_id: catId,
    cate_slug: cat.value,
    slug: slugVietnamese(name.value.trim()),
  };

  if (imgName == '') {
    const proNew = { ...product, image: proImg.getAttribute('src') };
    updateData('products', id, proNew);
  } else {
    uploadImg(product);
  }
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
      alert('Co loi ', error);
    },
    function () {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        const productNew = { ...product, image: url };

        updateData('products', id, productNew);
      });
    }
  );
};
