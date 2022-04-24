import { getData, deleted } from '../../config/global.js';

const proList = document.querySelector('tbody.list');

const resProList = getData('products');

resProList.then((data) => {
  let str = '';
  let count = 1;
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const pro = data[key];

      let price = new Intl.NumberFormat().format(pro.price);
      let sale = pro.sale == 0 ? 'Không giảm giá' : `${pro.sale * 100}%`;
      let des = pro.detail.length > 100 ? pro.detail.slice(0, 100) : pro.detail;
      let img = pro.image.search('http')
        ? `../../assets/${pro.image}`
        : pro.image;
      str += `
              <tr class="item-${key}">
                <td class="budget">${count}</td>
                <th style="white-space: break-spaces; width: 200px;" class="budget">
                  <div class="media align-items-center">
                    <span class="name mb-0 text-sm"
                      >${pro.name}</span
                    >
                  </div>
                </th>
                <td class="budget">
                <img style="width: 150px;" src="${img}" alt="${pro.name}">
                </td>
                <td class="budget">${price} Vnđ</td>
                <td style="white-space: break-spaces;" class="budget">${des}</td>
                <td class="budget">${sale}</td>
                <td class="budget">
                  <a href="./edit.html?id=${key}" class="btn btn-sm btn-success">Chỉnh sữa</a>
                  <span data="${key}" class="btn btn-sm btn-danger del-btn">Xóa</span>
                </td>
              </tr>
      `;
      count++;
    }
  }

  proList.innerHTML = str;

  // delete category
  const delBtn = document.querySelectorAll('.del-btn');

  delBtn.forEach((e) => {
    e.addEventListener('click', () => {
      deleted(e.getAttribute('data'), 'products');
    });
  });
});
