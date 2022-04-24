export const getData = async (collection) => {
  try {
    const response = await axios.get(
      `https://asm-es6-9c736-default-rtdb.firebaseio.com/${collection}.json`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getOneDataByKey = async (collection, key) => {
  try {
    const response = await axios.get(
      `https://asm-es6-9c736-default-rtdb.firebaseio.com/${collection}/${key}.json`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createData = async (collection, data) => {
  try {
    await axios.post(
      `https://asm-es6-9c736-default-rtdb.firebaseio.com/${collection}.json`,
      data
    );
    alert('Thêm thành công!');
    location.href = './';
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const createAccount = async (data) => {
  try {
    await axios.post(
      `https://asm-es6-9c736-default-rtdb.firebaseio.com/account.json`,
      data
    );
    alert('Đăng nhập thành công');
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const updateData = async (collection, key, data) => {
  try {
    await axios.put(
      `https://asm-es6-9c736-default-rtdb.firebaseio.com/${collection}/${key}.json`,
      data
    );
    alert('Cập nhật thành công!');
    location.href = './';
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

const handleDeleted = async (key, collection) => {
  try {
    await axios.delete(
      `https://asm-es6-9c736-default-rtdb.firebaseio.com/${collection}/${key}.json`
    );
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const deleted = (key, collection) => {
  // function show modal confirm
  showModal('Sẽ xóa thật đó!');

  // if click cancel then key='' and return;
  $('.cancel-model').on('click', function (e) {
    $('#model1').removeClass('open');
    setTimeout(function () {
      $('.overlay').removeClass('open');
    }, 350);
    key = '';
  });

  // click delete cat
  $('.close-model').on('click', function (e) {
    $('#model1').removeClass('open');
    setTimeout(function () {
      $('.overlay').removeClass('open');
    }, 350);
    if (!key) return;
    handleDeleted(key, collection);
    document.querySelector(`.item-${key}`).remove();
  });
};

export function getCookie(cname) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

export function delCookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function checkCookie(loginUrl, dasUrl) {
  let email = getCookie('id');
  if (email == '') return (location.href = loginUrl);

  if (dasUrl) return (location.href = dasUrl);
}

export function goBackAndRefresh() {
  location.href = document.referrer;
}
