import { getData, setCookie, goBackAndRefresh } from '../config/global.js';

const submitBtn = document.querySelector('.sub-btn');
let mess = document.querySelector('.mess');
let err = document.querySelector('.err');

submitBtn.addEventListener('click', () => {
  handingLogin();
});

let inputFil = document.querySelectorAll('input');

inputFil.forEach((input) => {
  input.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
      handingLogin();
    }
  });
});

function handingLogin(e) {
  mess.innerHTML = '';
  err.innerHTML = '';

  let inputEmail = document.querySelector('input[name=email]');
  let inputPass = document.querySelector('input[name=password]');

  if (!inputEmail.value || !inputPass.value)
    return (err.innerHTML = 'Vui lòng nhập đủ thông tin');

  getData('account').then((data) => {
    let check = false;

    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const acc = data[key];

        if (acc.email == inputEmail.value && acc.password == inputPass.value) {
          check = true;
          if (acc.rank != 1)
            return (mess.innerHTML = 'Bạn không phải là admin');
          setCookie('id', key);
          setCookie('name', acc.name);
          setCookie('role', acc.rank);

          goBackAndRefresh();
          return;
        }
      }
    }

    if (!check)
      return (err.innerHTML = 'Tên tài khoản hoặc mật khẩu không dúng!');
  });
}

main();
