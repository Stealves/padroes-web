const currentPage = document.body.id;
const paramsUrl = new URLSearchParams(document.location.search);
const newsFormFieldsBtn = document.querySelector("#add-news-form button");
const newsSearchInput = document.getElementById("search");
const newsSearchBtn = document.getElementById("search-btn");
const allInputs = document.querySelectorAll(".news-input");
const today  = new Date();

let newsList;
if (localStorage.getItem("News") === null) {
  newsList = [];
} else {
  newsList = JSON.parse(localStorage.getItem("News"));
}

loadEventListeners();

function loadEventListeners() {
  switch (currentPage) {
    case "home":
      if (paramsUrl.get("search")) {
        document.addEventListener("DOMContentLoaded", function() {
          newsSearchInput.value = paramsUrl.get("search");
          filterNews();
        });
      }
      document.addEventListener("DOMContentLoaded", loadNewsList);
      document.addEventListener("DOMContentLoaded", loadTags);
      newsSearchInput.addEventListener("keyup", filterNews);
      break;
    case "news":
      document.addEventListener("DOMContentLoaded", loadNews);
      document.addEventListener("DOMContentLoaded", loadTags);
      newsSearchBtn.addEventListener("click", () => {
        window.location = `/exercicio-aula-7/index.html?search=${newsSearchInput.value}`;
      });
      break;
    case "add-news":
      newsFormFieldsBtn.addEventListener("click", saveNews);
      break;
  }
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
    newsList.forEach(news => {
      let newNews = document.createElement("div");

      newNews.classList.add("col");
      newNews.innerHTML = `
        <article id="${news.id}" class="card">
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

function loadNews() {
  const newsHeader = document.getElementById("news-header")
  const newsDate = document.querySelector("#news-date small");
  const newsTitle = document.getElementById("news-title");
  const newsContent = document.getElementById("news-content");

  const newsId = paramsUrl.get("id");
  const currentNews = newsList.find(news => news.id === newsId);

  newsHeader.textContent = currentNews.title;
  newsTitle.textContent = currentNews.title;
  newsDate.textContent = currentNews.date;
  newsContent.innerHTML = currentNews.content;
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

      li.classList.add("list-group-item", "list-group-item-action");
      li.textContent = iniqueTag;
      tagList.appendChild(li);
    });
  }
}

function filterNews() {
  const filterValue = newsSearchInput.value.toLowerCase();
  const allListedNews = document.querySelectorAll("#news-grid article");
  const filterAlert = document.querySelector("#news-grid .alert");

  if (filterValue.length > 1) {
    allListedNews.forEach(listedNews => {
      listedNews.parentElement.classList.add("hide");
    });

    const filterResults = newsList.filter(news => {
      let title = news.title.toLowerCase();
      let content = news.content.toLowerCase();
      
      if (title.indexOf(filterValue) > -1 || content.indexOf(filterValue) > -1) {
        allListedNews.forEach(listedNews => {
          if (news.id === listedNews.id) {
            listedNews.parentElement.classList.remove("hide");
          }
        });
        return news;
      };
    });

    if (filterResults.length === 0) {
      filterAlert.innerHTML = `Nenhum resultado para <span class="fw-bold">${filterValue}</span>`;
      filterAlert.classList.remove("hide");
      filterAlert.classList.add("show");
    } else {
      filterAlert.innerHTML = "";
      filterAlert.classList.add("hide");
      filterAlert.classList.remove("show");
    }
  } else {
    allListedNews.forEach(listedNews => {
      listedNews.parentElement.classList.remove("hide");
    });
  }
}

function isInputValid() {
  let inputValid = true;
  allInputs.forEach(input => {
    if (input.checkValidity() === false) {
      inputValid = false;
      return;
    }
  });

  return inputValid;
};