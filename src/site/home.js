import FireBaseService from '../config/firebaseService.js';
import { getCookie } from '../config/global.js';

// Firebase init
const store = new FireBaseService();

// Element
const bannerEl = document.querySelector('.active-banner-slider');
const bannerAreaEl = document.querySelector('.banner__area');
const productHighlightEl = document.querySelector('.product__highlight');
const productNewEl = document.querySelector('.product__new');
const exclusiveProductEl = document.querySelector('.exclusive__product');

// ============== banner ================
const renderBanner = async () => {
  const banner = await store.getAllData('banner');

  banner.forEach((ban) => {
    if (ban.cat_banner == 'head') {
      bannerEl.innerHTML += `
        <div class="row single-slide align-items-center d-flex">
          <div class="col-lg-5 col-md-6">
            <div class="banner-content">
              <h1> ${ban.name} </h1>
              <h4>${ban.description} </h4>
            </div>
          </div>
          <div class="col-lg-7">
            <div class="banner-img">
              <img class="img-fluid" src="${ban.image} " alt="" />
            </div>
          </div>
        </div>
    `;
    }

    if (ban.cat_banner == 'area') {
      bannerAreaEl.innerHTML += `
      <div class="${ban.description}">
        <div class="single-deal">
          <div class="overlay"></div>
          <img class="img-fluid w-100" src="${ban.image}" alt="" />
          <a href="${ban.image}" class="img-pop-up" target="_blank">
            <div class="deal-details">
              <h6 class="deal-title">${ban.name}</h6>
            </div>
          </a>
        </div>
      </div>
  `;
    }
  });
};

const renderProduct = async () => {
  const products = await store.getAllData('products');

  // =========== product new ============

  const productsSize = Object.keys(products).length;
  let limitProNew = 0;
  let limitProHl = 0;
  let limitProHot = 0;

  for (const key in products) {
    if (Object.hasOwnProperty.call(products, key)) {
      const sne = products[key];

      // product highlight
      if (limitProHl < 8 && sne.highlight === 1) {
        let sale =
          sne.sale != 0
            ? `
              <h6 class="l-through">
                  ${new Intl.NumberFormat().format(
                    sne.price + sne.price * sne.sale
                  )} VNĐ
                </h6>`
            : '';

        productHighlightEl.innerHTML += `
          <div class="col-lg-3 col-md-6">
            <div class="single-product">
              <a href="./product-details.html?slug=${sne.cate_slug}/${
          sne.slug
        }">
                <img class="img-fluid" src="${sne.image}" alt=""/>
              </a>
              <div class="product-details">
                <h6>${sne.name}</h6>
                <div class="price">
                  <h6>${new Intl.NumberFormat().format(sne.price)} VNĐ</h6>
                  ${sale}
                </div>
                <div class="prd-bottom">
                  <a data="${key}" href="" class="social-info add-cart">
                    <span class="ti-bag"></span>
                    <p class="hover-text">Thêm vào túi</p>
                  </a>
                  <a href="" class="social-info">
                    <span class="lnr lnr-heart"></span>
                    <p class="hover-text">Yêu thích</p>
                  </a>
                  <a
                    href="./product-details.html?slug=${sne.cate_slug}/${
          sne.slug
        }"
                    class="social-info"
                  >
                    <span class="lnr lnr-move"></span>
                    <p class="hover-text">Xem chi tiết</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
      `;
        limitProHl;
      }

      // product new
      if (limitProNew > productsSize - 9) {
        let sale =
          sne.sale != 0
            ? `
            <h6 class="l-through">
                ${new Intl.NumberFormat().format(
                  sne.price + sne.price * sne.sale
                )} VNĐ
              </h6>`
            : '';

        productNewEl.innerHTML += `
            <div class="col-lg-3 col-md-6">
              <div class="single-product">
                <a href="./product-details.html?slug=${sne.cate_slug}/${
          sne.slug
        }">
                  <img class="img-fluid" src="${sne.image}" alt=""
                /></a>
                <div class="product-details">
                  <h6>${sne.name}</h6>
                  <div class="price">
                    <h6>${new Intl.NumberFormat().format(sne.price)} VNĐ</h6>
                    ${sale}
                  </div>
                  <div class="prd-bottom">
                    <a data="${key}" href="" class="social-info add-cart">
                      <span class="ti-bag"></span>
                      <p class="hover-text">Thêm vào túi</p>
                    </a>
                    <a href="" class="social-info">
                      <span class="lnr lnr-heart"></span>
                      <p class="hover-text">Yêu thích</p>
                    </a>
                    <a
                      href="./product-details.html?slug=${sne.cate_slug}/${
          sne.slug
        }"
                      class="social-info"
                    >
                      <span class="lnr lnr-move"></span>
                      <p class="hover-text">Xem chi tiết</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `;
      }
      limitProNew++;

      // product hot
      if (limitProHot < 8 && sne.highlight === 1 && sne.sale != 0) {
        exclusiveProductEl.innerHTML += `
            <div class="single-exclusive-slider">
              <img class="img-fluid" src="${sne.image}" alt="" />
              <div class="product-details">
                <div class="price">
                  <h6>${new Intl.NumberFormat().format(sne.price)} VNĐ</h6>
                  <h6 class="l-through">
                    ${new Intl.NumberFormat().format(
                      sne.price + sne.price * sne.sale
                    )} VNĐ
                  </h6>
                </div>
                <h4>${sne.name}</h4>
                <div
                  class="add-bag d-flex align-items-center justify-content-center"
                >
                  <a data="${key}" class="add-btn add-cart" href=""
                    ><span class="ti-bag"></span
                  ></a>
                  <span class="add-text text-uppercase ">Thêm vào túi</span>
                </div>
              </div>
            </div>`;
      }
    }
  }

  // call main js
  await main();
  // call countdown js
  countdown();
  // call add to cart
  addCart();
};

const search = async (value) => {
  const products = await store.getAllData('products');
  let searchBox = document.querySelector('#box-search');

  let str = '';
  let matches = [];
  if (value == '') return (searchBox.innerHTML = '');

  for (const key in products) {
    if (Object.hasOwnProperty.call(products, key)) {
      const pro = products[key];
      const regex = new RegExp(`^${value}`, 'gi');

      if (pro.name.match(regex)) {
        matches = [...matches, pro];
      }
    }
  }

  if (matches.length == 0)
    return (searchBox.innerHTML = `Không tìm thấy sản phẩm nào`);

  matches.forEach((item) => {
    let sale =
      item.sale != 0
        ? `
              <h6 class="l-through">
                  ${new Intl.NumberFormat().format(
                    item.price + item.price * item.sale
                  )} VNĐ
              </h6>`
        : '';
    str += `
          <div class="col-lg-6 mb-20 bg-light">
            <div class="single-related-product d-flex">
              <a href="">
                <img width="70px" src="${item.image}" />
              </a>
              <div class="desc">
                <a href="./product-details.html?slug=${item.cate_slug}/${
      item.slug
    }"
                class="title">${item.name}</a>
                <div class="price" style="text-align: start;">
                  ${new Intl.NumberFormat().format(item.price)} VNĐ  ${sale}
                </div>
              </div>
            </div>
          </div>
      `;
  });
  searchBox.innerHTML = str;

  let close = document.querySelector('#close_search');
  close.addEventListener('click', () => {
    searchBox.innerHTML = '';
    input.value = '';
  });
};

const addCart = async () => {
  const btnAddCart = document.querySelectorAll('.add-cart');
  btnAddCart.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const userId = getCookie('id');
      if (!userId) return (location.href = './login.html');

      const cart = await store.getAllData('cart_item');
      const proId = e.target.parentElement.getAttribute('data');
      const value = {
        user_id: userId,
        pro_id: proId,
        quantify: 1,
      };

      let checkCart = '';
      for (const key in cart) {
        if (Object.hasOwnProperty.call(cart, key)) {
          const pro = cart[key];
          if (pro.user_id == userId && pro.pro_id == proId) {
            checkCart = key;
            const res = await store.updateData('cart_item', key, {
              user_id: userId,
              pro_id: proId,
              quantify: pro.quantify + 1,
            });
            if (res.status == 200) alert('Thêm thành công!');

            break;
          }
        }
      }

      if (checkCart == '') {
        const res = await store.createData('cart_item', value);
        if (res.status == 200) alert('Thêm thành công!');
      }
    });
  });
};

let searchBtn = document.querySelector('.btn-search');
let input = document.querySelector('#search_input');

input.addEventListener('keyup', (e) => {
  e.preventDefault();
  search(e.target.value);
});

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  search(input.value);
});

renderBanner();
renderProduct();
