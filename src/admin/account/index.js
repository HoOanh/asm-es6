import { getData, deleted } from '../../config/global.js';

const accList = document.querySelector('tbody.list');
const userList = getData('account');

userList.then((data) => {
  let str = '';
  let count = 1;
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const user = data[key];

      //render to UI
      let status = user.spam == 1 ? 'Hoạt động' : 'Đã chặn';
      let role = user.rank == 0 ? 'Khách hàng' : 'Admin';
      str += `
              <tr class="item-${key}">
                <td class="budget">${count}</td>
                <th scope="row">
                  <div class="media align-items-center">
                    <span class="name mb-0 text-sm"
                      >${user.name}</span
                    >
                  </div>
                </th>
                <td class="budget">${user.email}</td>
                <td class="budget">${status}</td>
                <td class="budget">${role}</td>
                <td class="budget">
                  <a href="./edit.html?id=${key}" class="btn btn-sm btn-success">Chỉnh sữa</a>
                  <span data="${key}" class="btn btn-sm btn-danger del-btn">Xóa user</span>
                </td>
              </tr>
      `;
      count++;
    }
  }

  accList.innerHTML = str;

  // delete account
  const delBtn = document.querySelectorAll('.del-btn');

  delBtn.forEach((e) => {
    e.addEventListener('click', () => {
      deleted(e.getAttribute('data'), 'account');
    });
  });
});
