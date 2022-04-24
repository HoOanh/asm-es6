import FireBaseService from '../config/firebaseService.js';

// Firebase init
const store = new FireBaseService();

// get slug to url
const slugCat = location.href.split('?slug=')[1];

// Element
const title = document.querySelector('.title-page');
const locaNav = document.querySelector('.loca-nav');
const mainCate = document.querySelector('.main-categories');
const mainProduct = document.querySelector('.main-product');
const saleWeek = document.querySelector('.sale-week');

const productCategories = async () => {
  const products = await store.getAllData('products');
  const categories = await store.getAllData(`categories`);

  // Get info categories to slug
  // and render main category
  let catInf = {};
  for (const key in categories) {
    if (Object.hasOwnProperty.call(categories, key)) {
      const cat = categories[key];
      let active =
        cat.slug == slugCat
          ? `href="./shop.html?slug=${cat.slug}" style="color:#ffba00"`
          : `href="./shop.html?slug=${cat.slug}"`;
      mainCate.innerHTML += `
          <li class="main-nav-list">
            <a ${active}>
              <span class="lnr lnr-arrow-right"></span>
              ${cat.name}
              <span class="number">(${cat.cat_product})</span>
            </a>
          </li>
      `;

      if (cat.slug == slugCat) {
        catInf = { ...cat, id: key };
      }
    }
  }

  // Render title page
  title.innerHTML = `Shop | ${catInf.name}`;

  // Render location nav
  locaNav.innerHTML = `
          <a href="../">Trang chủ<span class="lnr lnr-arrow-right"></span></a>
          <a href="">Shop<span class="lnr lnr-arrow-right"></span></a>
          <a href="../${catInf.slug}" class="cat_name">
            ${catInf.name}
          </a>
  `;

  // Main products
  let limitSaleWeek = 0;
  for (const key in products) {
    if (Object.hasOwnProperty.call(products, key)) {
      const sne = products[key];

      // render product of category
      if (sne.cat_id == catInf.id) {
        let sale =
          sne.sale != 0
            ? `
            <h6 class="l-through">
              ${new Intl.NumberFormat().format(
                sne.price + sne.price * sne.sale
              )} VNĐ
            </h6>`
            : '';
        mainProduct.innerHTML += `
        <!-- single product -->
        <div class="col-lg-4 col-md-6">
          <div class="single-product">
            <a href="./product-details.html?slug=${sne.cate_slug}/${sne.slug}"
              ><img class="img-fluid" src="${sne.image}" alt=""
            /></a>
            <div class="product-details">
              <h6>${sne.name}</h6>
              <div class="price">
                <h6>${new Intl.NumberFormat().format(sne.price)} VNĐ</h6>
              ${sale}
              </div>
              <div class="prd-bottom">
                <a href="" data="${sne.image}" class="social-info">
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

      // Product sale week
      if (sne.sale != 0 && limitSaleWeek < 9) {
        saleWeek.innerHTML += `
        <div class="col-lg-4 col-md-4 col-sm-6 mb-20">
          <div class="single-related-product d-flex">
            <a href="#">
              <img width='70px' src="${sne.image}"/>
            </a>
            <div class="desc">
              <a href="#" class="title">${sne.name}</a>
              <div class="price">
                <h6>${new Intl.NumberFormat().format(sne.price)} VNĐ</h6>
                <h6 class="l-through">
                  ${new Intl.NumberFormat().format(
                    sne.price + sne.price * sne.sale
                  )} VNĐ
                </h6>
              </div>
            </div>
          </div>
        </div>
        `;
      }
    }
  }

  main();
};

productCategories();
