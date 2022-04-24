import FireBaseService from '../config/firebaseService.js';

// Firebase init
const store = new FireBaseService();

// Element
const title = document.querySelector('.title-page');
const locaNav = document.querySelector('.loca-nav');
const productEl = document.querySelector('.s_product_inner');

// Get value to url
const href = location.href.split('?slug=');
const slugCat = href[1].split('/')[0];
const slugPro = href[1].split('/')[1];

const productDetails = async () => {
  const products = await store.getAllData('products');

  for (const key in products) {
    if (Object.hasOwnProperty.call(products, key)) {
      const sne = products[key];

      if (sne.slug == slugPro) {
        // Render location nav
        locaNav.innerHTML = `
        <a href="../">Trang chủ<span class="lnr lnr-arrow-right"></span></a>
        <a href="./shop.html?slug=${slugCat}" class="cat_name"
        >${slugCat}<span
            class="lnr lnr-arrow-right"
        ></span
        ></a>
        <a href="">${sne.name}</a>
        `;

        // render title page
        title.innerHTML = `${slugCat} | ${sne.name}`;

        console.log(`${slugCat} | ${sne.name}`);
        productEl.innerHTML = `
        <div class="col-lg-6">
            <!-- <div class="s_Product_carousel"> -->
            <div class="single-prd-item">
            <img class="img-fluid" src="${sne.image}" alt="" />
            </div>
            <!-- </div> -->
        </div>
        <div class="col-lg-5 offset-lg-1">
            <div class="s_product_text">
            <h3>${sne.name}</h3>
            <h2>${new Intl.NumberFormat().format(sne.price)} VNĐ </h2>
            <ul class="list">
                <li>
                <a class="active" href="#"
                    ><span>Thể loại</span> :
                    ${slugCat.split('-')[0]}</a
                >
                </li>
                <li>
                <a href="#"><span>Trạng thái</span> : Còn hàng</a>
                </li>
            </ul>
            <p>${sne.detail}</p>
            <div class="product_count">
                <label for="qty">Số lượng:</label>
                <input type="text" name="qty" id="sst" maxlength="12"
                value="1" title="Quantity:" class="input-text qty" />
                <button
                onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst )) result.value++;return false;"
                class="increase items-count" type="button" >
                <i class="lnr lnr-chevron-up"></i>
                </button>
                <button
                onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst ) && sst > 0 ) result.value--;return false;"
                class="reduced items-count"
                type="button"
                >
                <i class="lnr lnr-chevron-down"></i>
                </button>
            </div>
            <div class="card_area d-flex align-items-center">
                <a class="primary-btn" href="#">Thêm vào túi</a>
                <a class="icon_btn" href="#"><i class="lnr lnr lnr-diamond"></i></a>
                <a class="icon_btn" href="#"><i class="lnr lnr lnr-heart"></i></a>
            </div>
            </div>
        </div>
      `;
      }
    }
  }
  main();
};

productDetails();
