import { getOneDataByKey, updateData } from '../../config/global.js';
const catUrl = 'http://localhost:3000/categories';

let params = new URLSearchParams(location.search);
let id = params.get('id');

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

  updateData('categories', id, cate);
});

getOneDataByKey('categories', id).then((cat) => {
  document.querySelector('#cat-name').value = cat.name;

  let options = document.querySelectorAll('#show-hide option');

  if (cat.showHide) options[1].selected = 'selected';
  else options[0].selected = 'selected';
});
