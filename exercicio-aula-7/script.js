const currentPage = document.body.id;
const newsFormFieldsBtn = document.querySelector("#add-news-form button");
const newsSearchBtn = document.getElementById("search");
const allInputs = document.querySelectorAll(".news-input");
const today  = new Date();

loadEventListeners();

function loadEventListeners() {
  switch (currentPage) {
    case "home":
      document.addEventListener("DOMContentLoaded", loadNewsList);
      break;
    case "add-news":
      newsFormFieldsBtn.addEventListener("click", saveNews);
      break;
    case "news":
      document.addEventListener("DOMContentLoaded", loadNews);
      break;
  }

  document.addEventListener("DOMContentLoaded", loadTags);
  newsSearchBtn.addEventListener("mousedown", filterNews);
}

function filterNews(e) {
  e.preventDefault();

  const searchValue = e.target.value.toLowerCase().trim();
  const newsList = JSON.parse(localStorage.getItem("News"));


}

function loadTags() {
  const tagListGroup = document.getElementById("tag-list");
  const tagList = document.querySelector("#tag-list ul");

  if (localStorage.getItem("News") === null) {
    tagListGroup.innerHTML = `
      <div class="alert alert-secondary" role="alert">
        <h3 class="alert-heading">Nenhuma noticia foi salva ou nenhuma tag foi adicionada</h3>
        <hr>
        <a href="/exercicio-aula-7/add-news.html" class="alert-link">Adicione noticias com tags</a>
      </div>
    `;
  } else {
    const newsList = JSON.parse(localStorage.getItem("News"));

    const tags =[];
    newsList.forEach(news => {
      const newsTags = news.tags;

      tags.push(...newsTags);
    });

    const noDuplicateTags = tags.filter((tag, index) => {
      return tags.indexOf(tag) === index;
    });

    noDuplicateTags.forEach(iniqueTag => {
      const li = document.createElement("li");

      li.classList.add("list-group-item");
      li.classList.add("list-group-item-action");
      li.textContent = iniqueTag;
      tagList.appendChild(li);
    });
  }
}

function loadNews() {
  const newsHeader = document.getElementById("news-header")
  const newsDate = document.querySelector("#news-date small");
  const newsTitle = document.getElementById("news-title");
  const newsContent = document.getElementById("news-content");

  const params = new URLSearchParams(document.location.search);
  const newsId = params.get("id");

  const newsList = JSON.parse(localStorage.getItem("News"));
  const currentNews = newsList.find(news => news.id === newsId);

  newsHeader.textContent = currentNews.title;
  newsTitle.textContent = currentNews.title;
  newsDate.textContent = currentNews.date;
  newsContent.innerHTML = currentNews.content;
}

function loadNewsList() {
  const newsGrid = document.getElementById("news-grid");

  if (localStorage.getItem("News") === null) {
    document.querySelector("main").innerHTML =  `
      <div class="alert alert-secondary" role="alert">
        <h3 class="alert-heading">Nenhuma noticia foi salva</h3>
        <hr>
        <a href="/exercicio-aula-7/add-news.html" class="alert-link">Adicione noticias</a>
      </div>
      `;
  } else {
    const newsList = JSON.parse(localStorage.getItem("News"));

    newsList.forEach(news => {
      let newNews = document.createElement("div");

      newNews.classList.add("col");
      newNews.innerHTML = `
        <article class="card">
          <img src="https://via.placeholder.com/700x350" alt="" class="card-img-top">
          <div class="card-body">
            <p class="card-text"><small class="text-muted">${news.date}</small></p>
            <h3 class="card-title">${news.title.substring(0, 50)}</h3>
            <p class="card-text">${news.content.substring(0, 150)}...</p>
            <a href="/exercicio-aula-7/news.html?id=${news.id}" class="btn btn-primary">Ver mais</a>
          </div>
        </article>
      `;
      newsGrid.appendChild(newNews);
    });
  }
}

function saveNews(e) {
  e.preventDefault();

  const newsTitleInput = document.querySelector("#news-title");
  const newsContentInput = document.querySelector("#news-content");
  const newsTagsInput = document.querySelector("#news-tags");

  if (isInputValid() === false) {
    alert("Campos invalidos ou nao preenchidos");
    return;
  }

  let newsList;
  if (localStorage.getItem("News") === null) {
    newsList = [];
  } else {
    newsList = JSON.parse(localStorage.getItem("News"));
  }

  const newsId = `${Math.floor(Math.random() * 10000)}-${newsList.length}`;
  const newsTags = newsTagsInput.value.split(",").map(e => { return e.trim(); });
  const newsItem = {id: newsId, title: newsTitleInput.value, content: newsContentInput.value, date: today.toLocaleDateString("pt-br"), tags: newsTags};
  newsList.push(newsItem);

  localStorage.setItem("News", JSON.stringify(newsList));
  document.querySelector(".alert").classList.add("show");
  setTimeout(()=>{
    document.querySelector(".alert").classList.remove("show");
  }, 3000);

  allInputs.forEach(input => {
    input.value = "";
  });
}

function isInputValid() {
  let inputVal = true;
  allInputs.forEach(input => {
    if (input.checkValidity() === false) {
      inputVal = false;
      return;
    }
  });

  return inputVal;
};