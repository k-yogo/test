// const igImageLoad = async () => {
//   const response = await fetch('https://graph.facebook.com/v5.0/17841400489725240?fields=name%2Cmedia.limit(15)%7Bcaption%2Clike_count%2Cmedia_url%2Cpermalink%2Ctimestamp%2Cthumbnail_url%2Cmedia_type%2Cusername%7D&access_token=EAAPZAvMCkqOMBAE9fpUBwZAFz1ohFckpZBVbMx8hOtDNSpyiFJoR8ui5hvWeie9eMlYMq4VKYGlsBk3dZC2QncAZA2rr6UulnvPu5VGyZCfyAhggWosHEGIdkLa1hqKmCFgSebluRslgf6JIjCdfGbjVKbRtBsvNotfvqCvi4GrFmUFGJIVEp1qrXzNT8xlMZAjkBL9fN7s4QZDZD');
//   const json = await response.json();
//   console.log(json);
//   const jsonDataArray = json.media.data;
//   console.log(jsonDataArray);
//   const btn = document.getElementById('btn');
//   const main = document.getElementById('main');
//   let i = 6;
//   btn.addEventListener('click', () => {
//     const url = jsonDataArray[i].media_url;
//     console.log(url);
//     const img = document.createElement('img');
//     img.setAttribute('src', url);
//     console.log(img);
//     img.addEventListener('load', () => {
//       main.appendChild(img)
//     });
//   });

// }
// igImageLoad();

const hello = new Promise((resolve) => {
  setTimeout(() => {
    console.log('hello');
    resolve('good night');
  }, 1000);
});
// hello.then((value) => {
//   console.log(value);
// })
console.log(hello);
(async function() {
  const goodnight = await hello;
  console.log(goodnight);
})();