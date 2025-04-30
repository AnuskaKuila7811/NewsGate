
const API_KEY = "414884e42da145c8bc1df75d86d147b4";
const BASE_URL = "https://xy0fxfl1ka.execute-api.us-east-1.amazonaws.com/stage/backend";

window.addEventListener("load", () => fetchNews("technology"));

function reload() {
    window.location.reload();
}
async function fetchNews(query) {
    try {
        const url = `${BASE_URL}?q=${encodeURIComponent(query)}`;
        const data = await callnewsApi(url);
        if (data.articles && data.articles.length > 0) {
            bindData(data.articles);
        } else {
            console.error("No articles found");
        }
    } catch (err) {
        console.error("Fetch error:", err);
    }
}


async function callnewsApi(url) {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            "id_token": token
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

function bindData(articles) {
    const container = document.getElementById("cards-container");
    const template = document.getElementById("template-news-card");
    container.innerHTML = "";

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const clone = template.content.cloneNode(true);
        fillDataInCard(clone, article);
        container.appendChild(clone);
    });
}

function fillDataInCard(card, article) {
    card.querySelector("#news-img").src = article.urlToImage;
    card.querySelector("#news-title").innerHTML = article.title;
    card.querySelector("#news-desc").innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    card.querySelector("#news-source").innerText = `${article.source.name} • ${date}`;

    card.firstElementChild.style.cursor = "pointer";
    card.firstElementChild.addEventListener("click", () => {
        window.location.href = article.url; // Opens in the same tab
    });
  
    
}

document.getElementById("search-text").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevents form submission if inside a form
        const query = this.value.trim().toLowerCase();
        if (query) fetchNews(query);
    }
});
document.querySelector(".search-icon").addEventListener("click", () => {
    const query = document.getElementById("search-text").value.trim().toLowerCase();
    if (query) fetchNews(query);
});

function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
 }
 document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html"; // or wherever your login page is
});
