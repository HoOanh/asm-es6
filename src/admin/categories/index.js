import { getData, deleted } from '../../config/global.js';

const catList = document.querySelector('tbody.list');

const resCatList = getData('categories');

resCatList.then((data) => {
  let str = '';
  let count = 1;
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const cat = data[key];

      let showHide = cat.showHide == 1 ? 'Đang hiện' : 'Đang ẩn';
      str += `
              <tr class="item-${key}">
                <td class="budget">${count}</td>
                <th scope="row">
                  <div class="media align-items-center">
                    <span class="name mb-0 text-sm"
                      >${cat.name}</span
                    >
                  </div>
                </th>
                <td class="budget">${showHide}</td>
                <td class="budget">
                  <a href="./edit.html?id=${key}" class="btn btn-sm btn-success">Chỉnh sữa</a>
                  <span data="${key}" class="btn btn-sm btn-danger del-btn">Xóa loại</span>
                </td>
              </tr>
      `;
      count++;
    }
  }

  catList.innerHTML = str;

  // delete category
  const delBtn = document.querySelectorAll('.del-btn');

  delBtn.forEach((e) => {
    e.addEventListener('click', () => {
      deleted(e.getAttribute('data'), 'categories');
    });
  });
});
