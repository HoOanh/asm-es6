import FireBaseService from '../config/firebaseService.js';
import { getCookie } from '../config/global.js';

// Firebase init
const store = new FireBaseService();

// Element
const user_id = getCookie('id');
const table = document.querySelector('.table');
const mainCart = document.querySelector('.cart-body');
let mainTotal = 0;

const cart = async () => {
  let userCart = [];

  const cartItem = await store.getAllData('cart_item');
  for (const key in cartItem) {
    if (Object.hasOwnProperty.call(cartItem, key)) {
      const item = cartItem[key];

      if (item.user_id == user_id) {
        userCart = [...userCart, { ...item, id: key }];
      }
    }
  }
  if (userCart.length == 0) {
    return (table.innerHTML =
      '<h3>Bạn chưa mua sản phẩm nào! Hãy bắt đầu mua sắm đi nào</h3>');
  }
  let count = 0;
  userCart.forEach(async (e) => {
    const pro = await store.getDataByKey('products', e.pro_id);

    renderCart(count, userCart, pro, e);
    count++;

    // when input qty change then update cart
    let inputQty = document.querySelector(`input#${e.id}`);

    inputQty.addEventListener('change', (btn) => {
      updateQty(btn.target.id, btn.target.value, e.pro_id);
    });
  });
};

const updateQty = async (id, value, pro_id) => {
  const data = {
    pro_id: pro_id,
    quantify: parseInt(value),
    user_id: user_id,
  };

  const res = await store.updateData('cart_item', id, data);

  if (res.status == 200) {
    let price = parseInt(
      document.querySelector(`#price-${id}`).getAttribute('data')
    );
    let sale = parseFloat(
      document.querySelector(`#sale-${id}`).innerHTML.split('%')[0]
    );
    let total = document.querySelector(`#total-${id}`);

    let priceUp = parseInt(value * (price - (price * sale) / 100));

    let mainPrice = document.querySelector('.main-price');

    mainPrice.innerHTML =
      new Intl.NumberFormat().format(
        mainPrice.innerHTML.replace(/ VNĐ|\./g, '') -
          parseFloat(total.innerHTML.replace(/ VNĐ|\./g, '')) +
          priceUp
      ) + ' VNĐ';

    total.innerHTML = new Intl.NumberFormat().format(priceUp) + ' VNĐ';
  }
};

function renderCart(index, data, item, e) {
  let total = (item.price - item.price * item.sale) * e.quantify;
  mainTotal += total;

  mainCart.innerHTML += `
      <tr>
          <td>
              <div class="media">
                  <div class="d-flex">
                  <img
                      width="150px"
                      src="${item.image}"
                      alt=""
                  />
                  </div>
                  <div class="media-body">
                  <p>${item.name}</p>
                  </div>
              </div>
              </td>
          <td>
              <h5 id="price-${e.id}" data="${item.price}">
                ${new Intl.NumberFormat().format(item.price)} VNĐ
                </h5>
          </td>
          <td>
              <div class="product_count">
                  <input
                  type="text"
                  name="qty"
                  id="${e.id}"
                  maxlength="12"
                  value="${e.quantify}"
                  title="Quantity:"
                  class="input-text qty"
                  />
                  <button onclick="var result = document.getElementById('${
                    e.id
                  }'); var sst = result.value; if( !isNaN( sst )) result.value++;return false;"
                    class="increase items-count" type="button">
                  <i class="lnr lnr-chevron-up"></i>
                  </button>
                  <button onclick="var result = document.getElementById('${
                    e.id
                  }'); var sst = result.value; if( !isNaN( sst ) && sst > 0 ) result.value--;return false;"
                  class="reduced items-count" type="button">
                  <i class="lnr lnr-chevron-down"></i>
                  </button>
              </div>
          </td>
          <td id="sale-${e.id}">${item.sale * 100}%</td>
          <td>
              <h5 id="total-${e.id}">
              ${new Intl.NumberFormat().format(total)} VNĐ
              </h5>
          </td>
          <td>
          <a href="" data="${e.id}" class="lnr lnr-trash del-btn"></a>
          </td>

      </tr>
  `;

  if (index == data.length - 1) {
    mainCart.innerHTML += `
          <tr class="bottom_button">
              <td>
              <a class="gray_btn" href="#">Cập nhật giỏ hàng</a>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
          </tr>
          <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
              <h5>Tổng tiền:</h5>
              </td>
              <td>
              <h5 class="main-price">${new Intl.NumberFormat().format(
                mainTotal
              )} VNĐ</h5>
              </td>
          </tr>
          <tr class="shipping_area">
              <td></td>
              <td></td>
              <td>
              <h5>Giao hàng:</h5>
              </td>
              <td></td>
              <td>
              <div class="shipping_box">
                  <ul class="list">
                  <li><a href="#">Miễn phí vận chuyển</a></li>
                  <li><a href="#">Giao hàng mặc định: 30.000 VNĐ</a></li>
                  <li class="active">
                      <a href="#">Giao hàng nhanh: 60.000 VNĐ</a>
                  </li>
                  </ul>

              </td>
          </tr>
          <tr class="out_button_area">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
              <div class="checkout_btn_inner d-flex align-items-center">
                  <a class="gray_btn" href="#">Tiếp tục mua sắm</a>
                  <a class="primary-btn ml-3" href="#">Thanh toán</a>
              </div>
              </td>
          </tr>
      `;
  }

  let btnCount = document.querySelectorAll('button.items-count');
  btnCount.forEach((btn) => {
    btn.addEventListener('click', (btn) => {
      let input = btn.target.parentElement.parentElement.querySelector('input');
      updateQty(input.id, input.value, e.pro_id);
    });
  });

  let btnDel = document.querySelectorAll('.del-btn');
  btnDel.forEach((item) => {
    item.addEventListener('click', async (e) => {
      e.preventDefault();

      let id = e.target.getAttribute('data');
      let total = document.querySelector(`#total-${id}`);

      const res = await store.deleteData('cart_item', id);

      if (res.status == 200) {
        e.target.parentElement.parentElement.remove();

        let mainPrice = document.querySelector('.main-price');

        mainPrice.innerHTML =
          new Intl.NumberFormat().format(
            mainPrice.innerHTML.replace(/ VNĐ|\./g, '') -
              parseFloat(total.innerHTML.replace(/ VNĐ|\./g, ''))
          ) + ' VNĐ';
      }
    });
  });
}

// Check login
if (!user_id) {
  alert('Vui lòng đăng nhập để xem giỏ hàng!');
  location.href = './login.html';
} else cart();

main();
