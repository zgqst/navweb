let simplifyUrl = function (url)
{
  if (/(http|https):\/\/((\w+\.)+(\w+))/.test(url)) {
    return /(http|https):\/\/((\w+\.)+(\w+))/.exec(url)[2];
  } else {
    return url;
  }
};
let complexUrl = function (url)
{
  if (/((\w+\.)+(\w+))/.test(url)) {
    return "https://" + /((\w+\.)+(\w+))/.exec(url)[1];
  } else {
    return url;
  }
};
let addElement = function (place)
{
  $(place + " .add").click(() =>
  {
    let url = prompt("请输入网址");
    if (url) {
      let urlObj = { url: url };
      hashMap.push(urlObj); //将数据以对象形式压入数组
      let node = $(`<div class="newsite">
        <div class="img-wrapper">
          <img src="https://${simplifyUrl(url)}/favicon.ico"/>
        </div>
        <span>${simplifyUrl(url)}</span>
      </div>`).insertBefore($(place + " .add")); //增加

      node.click(() =>
      {
        //添加元素的点击事件
        window.open(complexUrl(url));
      });
      $(place).width($(place).children().length * 125);
      if ($(place).children().length === 7) {
        let $add = $(".add").remove();
        $(place).width($(place).children().length * 125);

        if (place === ".cle-top") {
          $add.appendTo($(".cle-bottom"));
          addElement(".cle-bottom");
        }
      }
    }
  });
};
addElement(".cle-top");
let temp = localStorage.getItem("x");
let hashMap = JSON.parse(temp) || [{ url: "bilibili.com" }];
for (let i = 0; i < hashMap.length; i++) {
  if ($(".cle-top").children().length <= 6 && $(".cle-bottom").children().length === 0) {
    $(`<div class="newsite">
    <div class="img-wrapper">
      <img src="https://${simplifyUrl(hashMap[i].url)}/favicon.ico"/>
    </div>
    <span>${simplifyUrl(hashMap[i].url)}</span>
  </div>`)
      .insertBefore($(".cle-top .add"))
      .click(() =>
      {
        //添加元素的点击事件
        window.open(complexUrl(hashMap[i].url));
      });
  }
  if ($(".cle-top").children().length === 7) {
    let $add = $(".add").remove();
    $add.appendTo($(".cle-bottom"));
    $(`<div class="newsite">
    <div class="img-wrapper">
      <img src="https://${simplifyUrl(hashMap[i].url)}/favicon.ico"/>
    </div>
    <span>${simplifyUrl(hashMap[i].url)}</span>
  </div>`)
      .insertBefore($(".cle-bottom .add"))
      .click(() =>
      {
        //添加元素的点击事件
        window.open(complexUrl(hashMap[i].url));
      });
    if ($(".cle-top").children().length === 6 && $(".cle-bottom").children().length >= 1) {
      $(`<div class="newsite">
        <div class="img-wrapper">
          <img src="https://${simplifyUrl(hashMap[i].url)}/favicon.ico"/>
        </div>
        <span>${simplifyUrl(hashMap[i].url)}</span>
      </div>`)
        .insertBefore($(".cle-bottom .add"))
        .click(() =>
        {
          //添加元素的点击事件
          window.open(complexUrl(hashMap[i].url));
        });
    }
  }
}
window.onbeforeunload = () =>
{
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string); //将数据转化成字符串并存入本地数据
};