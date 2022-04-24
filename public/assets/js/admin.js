//================ modal ======================
$(".model").each(function () {
  $(this).wrap('<div class="overlay"></div>');
});

$(document).on("click", function (e) {
  var target = $(e.target);

  if ($(target).hasClass("overlay")) {
    $(target)
      .find(".model")
      .each(function () {
        $(this).removeClass("open");
      });
    setTimeout(function () {
      $(target).removeClass("open");
    }, 350);
  }
});

function showModal(content) {
  $(".overlay").addClass("open");
  setTimeout(function () {
    $("#model1").addClass("open");
  }, 350);

  $(".txt-content").text(content);
}

//============= handing slug =============
function slugVietnamese(str) {
  str = str.replace(/^\s+|\s+$/g, "");
  str = str.toLowerCase();

  var from =
    "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ·/_,:;";
  var to =
    "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd------";
  for (var i = 0; i < from.length; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return str;
}

function delete_cookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  location.href = "";
}
