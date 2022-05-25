var memesRequest = new XMLHttpRequest();

document.addEventListener("DOMContentLoaded", prepareMemes);
memesRequest.open("GET", "https://api.imgflip.com/get_memes", true);
memesRequest.send();

function prepareMemes() {
  const memeList = document.getElementById("memes-list");

  memesRequest.addEventListener("readystatechange", getMemes);

  function getMemes() {
    if (memesRequest.readyState == 4 && memesRequest.status == 200) {
      getMemesData(JSON.parse(memesRequest.response));
    }
  }

  function getMemesData(memes) {
    const memesData = memes.data.memes;

    const randomMemesData = shuffle(memesData);

    randomMemesData.forEach(meme => {
      createMemesList(meme.name, meme.url, meme.width, meme.height);
    });

    function createMemesList(memeName, memeUrl, memeWidth, memeHeight) {
      let tr = document.createElement("tr");
      tr.classList.add("meme-list__item");

      let newMeme =`
        <td><img src="${memeUrl}" alt="${memeName}"></td>
        <td><span>${memeName}</span></td>
        <td><a href="${memeUrl}" target="_blank">${memeUrl}</a></td>
        <td><span>${memeWidth}</span></td>
        <td><span>${memeHeight}</span></td>
      `;

      tr.innerHTML = newMeme;
      memeList.appendChild(tr);
    }
  }
}

// With great help of the article:https://www.kirupa.com/html5/shuffling_array_js.htm
// Shuffle as an array prototype
// Array.prototype.shuffle = function () {
//   let input = this;

//   for (let i = input.length - 1; i >= 0; i--) {

//     let randomIndex = Math.floor(Math.random() * (i + 1));
//     let itemAtIndex = input[randomIndex];

//     input[randomIndex] = input[i];
//     input[i] = itemAtIndex;
//   }
//   return input;
// }

// Shuffle function declaration
function shuffle(array) {
  for (let i = array.length - 1; i >= 0; i--) {

    let randomIndex = Math.floor(Math.random() * (i + 1));
    let itemAtIndex = array[randomIndex];

    array[randomIndex] = array[i];
    array[i] = itemAtIndex;
  }
  return array;
}