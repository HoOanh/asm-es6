import { getOneDataByKey, updateData } from '../../config/global.js';

let params = new URLSearchParams(location.search);
let id = params.get('id');

let addBtn = document.querySelector('#add-btn');

addBtn.addEventListener('click', (e) => {
  let name = document.querySelector('#name');
  let address = document.querySelector('#address');
  let pass = document.querySelector('#pass');
  let phone = document.querySelector('#phone');
  let email = document.querySelector('#email');
  let rank = document.querySelector('#set-rank');
  let status = document.querySelector('#set-status');

  let product = {
    name: name.value,
    address: address.value,
    password: pass.value,
    phone: parseInt(phone.value),
    email: email.value,
    rank: parseInt(rank.value),
    spam: parseInt(status.value),
  };

  updateData('account', id, product);
});

getOneDataByKey('account', id).then((acc) => {
  document.querySelector('#name').value = acc.name;
  document.querySelector('#address').value = acc.address;
  document.querySelector('#pass').value = acc.password;
  document.querySelector('#phone').value = acc.phone;
  document.querySelector('#email').value = acc.email;

  let rank = document.querySelectorAll('#set-rank option');
  let status = document.querySelectorAll('#set-status option');

  acc.rank == 1
    ? (rank[1].selected = 'selected')
    : (rank[0].selected = 'selected');

  acc.spam
    ? (status[1].selected = 'selected')
    : (status[0].selected = 'selected');
});
