import { createData } from '../../config/global.js';

let addBtn = document.querySelector('#add-btn');
let mess = document.querySelector('.text-warning');

addBtn.addEventListener('click', (e) => {
  let catName = document.querySelector('#cat-name');
  let showHide = document.querySelector('#show-hide');

  if (catName.value == '')
    return (mess.innerHTML = 'Vui lòng nhập đủ thông tin');

  let cate = {
    name: catName.value.trim(),
    slug: slugVietnamese(catName.value.trim()),
    showHide: parseInt(showHide.value),
    highlight: 0,
  };

  createData('categories', cate);
});
