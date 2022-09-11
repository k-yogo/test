// Declare Global Variable, Constant
const txt = document.getElementById('txt');
const searchs = document.querySelectorAll('.search')
const nexts = document.querySelectorAll('.next')
const backs = document.querySelectorAll('.back')
const main = document.getElementById('main');
const maxResults = 10;
let pageNumber = 0;
const regex = /\d+/;
let searched = false;
const inputBlockBottom = document.getElementById('input-block-bottom');
let txtValue;

// Display Result Function
const dispResult = function() {
  let startIndex = pageNumber * 10;
  if(txtValue !== null && txtValue !== '') {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.add('active');
    const response = fetch(`https://www.googleapis.com/books/v1/volumes?q=${txtValue}&maxResults=${maxResults}&startIndex=${startIndex}`);
    function scrollUp(){
      currentY = window.pageYOffset;
      if(currentY === 0) {
          clearInterval(intervalId); // ページ最上部に来たら終了
      } else {
          scrollBy( 0, -step ); // step分上へスクロール
      }
    }
    const duration = 300;
    let currentY = window.pageYOffset; // 現在のスクロール位置を取得
    let step = duration/currentY > 1 ? 10 : 100; // 三項演算子
    let timeStep = duration/currentY * step; // スクロール時間
    let intervalId = setInterval(scrollUp, timeStep);
    response
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if (!json.items) {
        throw new Error("No Next Page");
      } else {
        return json;
      }
    }).then(function(json){
      if(main.getElementsByTagName('ul')[0]) {
        main.getElementsByTagName('ul')[0].remove();
      }
      let ul = document.createElement('ul');
      let i = 1;
      i += pageNumber * 10;
      ul.className = 'result-list';
      console.log(json.items);
      console.log(startIndex);
      for (let iterator of json.items) {
        let li = document.createElement('li');
        li.className = 'result-item';
        li.insertAdjacentHTML('beforeend', `<p class="result-item_ttl"><a href="${iterator.volumeInfo.infoLink}" target="_blank" class="result-item_link">${i} - ${iterator.volumeInfo.title}</a></p>`);
        if(iterator.volumeInfo.imageLinks !== undefined && iterator.volumeInfo.imageLinks.thumbnail !== undefined && iterator.volumeInfo.imageLinks.thumbnail !== '') {
          li.insertAdjacentHTML('beforeend', `<a href="${iterator.volumeInfo.infoLink}" target="_blank" class="result-item_img-link"><div class="loader8"></div><img src="${iterator.volumeInfo.imageLinks.thumbnail}" class="result-item_img" width="64" height="91"></a>`);
        } else {
          li.insertAdjacentHTML('beforeend', `<a href="${iterator.volumeInfo.infoLink}" target="_blank" class="result-item_img-link"><span class="result-item_img result-item_no-image"></span></a>`);
        }
        ul.appendChild(li);
        i++;
      }
      main.appendChild(ul);
      loadingOverlay.classList.remove('active');
      return json;
    }).then(function(){
      inputBlockBottom.classList.add('active');
    }).catch(function(e){
      console.log(e);
      loadingOverlay.classList.remove('active');
      pageNumber--;
    })

  }
}

// Search Button Click
searchs.forEach(search => {
  search.addEventListener('click', function() {
    txtValue = txt.value;
    pageNumber = 0;
    i = 1;
    searched = true;
    dispResult();
  })
});

// Press Enter Key
txt.addEventListener('keypress', function(e) {
  const key = e.keyCode || e.charCode || 0;
  if(key === 13) {
    txtValue = txt.value;
    pageNumber = 0;
    i = 1;
    searched = true;
    dispResult();
  }
})

// Next Button Click
nexts.forEach(next => {
  next.addEventListener('click', function() {
    if(searched) {
      pageNumber++;
      dispResult();
    }
  })
});

// Back Button Click
backs.forEach(back => {
  back.addEventListener('click', function() {
    if (pageNumber > 0 && searched) {
      pageNumber--;
      dispResult();
    }
  })
});

// Clear Icon Click
const clearSvg = document.getElementById('clearSvg');
clearSvg.addEventListener('click', function() {
  txt.value = '';
  txt.focus();
  if(main.getElementsByTagName('ul')[0]) {
    inputBlockBottom.classList.remove('active');
  }
});

// Set TextArea's Placeholder
(async () => {
  const response = await fetch('./tags.json')
  tags = await response.json();
  const tagsLength = Object.keys(tags).length;
  const tagNumber = Math.floor( Math.random() * (tagsLength + 1 - 1) ) + 1 ;
  txt.value = tags[tagNumber];
})();

window.addEventListener('scroll', () => {
  console.log(window.pageYOffset);
})



