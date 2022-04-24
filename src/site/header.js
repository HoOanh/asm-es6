import FireBaseService from '../config/firebaseService.js';
import { delCookie, getCookie } from '../config/global.js';

// Firebase init
const store = new FireBaseService();

// Element
const nav_cat = document.querySelector('.nav__cat');
const accNav = document.querySelector('.account');

// render menu categories
const header = async () => {
  const categories = await store.getAllData('categories');

  for (const key in categories) {
    if (Object.hasOwnProperty.call(categories, key)) {
      const cat = categories[key];
      nav_cat.innerHTML += `
      <li class="nav-item">
        <a class="nav-link" href="./shop.html?slug=${cat.slug}"> ${cat.name} </a>
      </li>`;
    }
  }

  if (getCookie('id') == '')
    accNav.innerHTML = `<a class="nav-link" href="./login.html">Đăng nhập/Đăng ký</a>`;
  else {
    let name = getCookie('name').split(' ');
    accNav.classList.add('submenu');
    accNav.innerHTML = `
          <a
              href="#"
              class="nav-link dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              >${name[name.length - 1]}</a
            >
            <ul class="dropdown-menu nav__cat">
              <li class="nav-item">
                <a class="nav-link logout" href="">Đăng xuất</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Thông tin</a>
              </li>
            </ul>
  `;

    if (getCookie('role') == 1) {
      document.querySelector('.account .nav__cat').innerHTML += `
      <li class="nav-item">
        <a class="nav-link" href="../admin">Admin</a>
      </li>
  `;
    }
  }

  let logout = document.querySelector('.logout');
  if (logout) {
    logout.addEventListener('click', () => {
      delCookie('id');
      delCookie('name');
    });
  }
};

header();
