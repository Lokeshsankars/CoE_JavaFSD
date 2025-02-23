// Type Definitions
interface NewsArticle {
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
}

type Category = "general" | "business" | "sports" | "entertainment" | "technology";

// Variables
const generalBtn = document.getElementById("general") as HTMLButtonElement;
const businessBtn = document.getElementById("business") as HTMLButtonElement;
const sportsBtn = document.getElementById("sports") as HTMLButtonElement;
const entertainmentBtn = document.getElementById("entertainment") as HTMLButtonElement;
const technologyBtn = document.getElementById("technology") as HTMLButtonElement;
const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;

const newsQuery = document.getElementById("newsQuery") as HTMLInputElement;
const newsType = document.getElementById("newsType") as HTMLElement;
const newsdetails = document.getElementById("newsdetails") as HTMLElement;

// API Configuration
const API_KEY = "12ec8d63579b433db9925627296199c1";
const BASE_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
const SEARCH_NEWS = `https://newsapi.org/v2/everything?apiKey=${API_KEY}&q=`;

const categories: Record<Category, string> = {
    general: `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${API_KEY}`,
    business: `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`,
    sports: `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${API_KEY}`,
    entertainment: `https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=${API_KEY}`,
    technology: `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${API_KEY}`,
};

window.onload = () => {
    fetchNews(BASE_URL);
};

// Event Listeners
generalBtn.addEventListener("click", () => loadNews("general", "General News"));
businessBtn.addEventListener("click", () => loadNews("business", "Business"));
sportsBtn.addEventListener("click", () => loadNews("sports", "Sports"));
entertainmentBtn.addEventListener("click", () => loadNews("entertainment", "Entertainment"));
technologyBtn.addEventListener("click", () => loadNews("technology", "Technology"));

searchBtn.addEventListener("click", () => {
    const query: string = newsQuery.value.trim();
    if (!query) return;
    newsType.innerHTML = `<h4>Search Results for: ${query}</h4>`;
    fetchNews(SEARCH_NEWS + encodeURIComponent(query));
});

const loadNews = (category: Category, title: string): void => {
    newsType.innerHTML = `<h4>${title}</h4>`;
    fetchNews(categories[category]);
};

const fetchNews = async (url: string): Promise<void> => {
    try {
        newsdetails.innerHTML = "<h5>Loading...</h5>";
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();

        if (!data.articles || data.articles.length === 0) {
            newsdetails.innerHTML = "<h5>No data found.</h5>";
            return;
        }
        displayNews(data.articles);
    } catch (error) {
        console.error("Error fetching data:", error);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
    }
};



const displayNews = (newsDataArr: NewsArticle[]): void => {
    newsdetails.innerHTML = "";

    if (!newsDataArr.length) {
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    newsDataArr.forEach((news: NewsArticle) => {
        const date: string = new Date(news.publishedAt).toDateString();

        const col = document.createElement("div");
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

        const card = document.createElement("div");
        card.className = "p-2";

        const image = document.createElement("img");
        image.src = news.urlToImage || "default-image.png";
        image.className = "news-image";
        
        const cardBody = document.createElement("div");

        const newsHeading = document.createElement("h5");
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        const dateHeading = document.createElement("h6");
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date;

        const description = document.createElement("p");
        description.className = "text-muted";
        description.innerHTML = news.description || "No description available.";

        const link = document.createElement("a");
        link.className = "read-more";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML = "Read more";

        //  Comment Section (Inside the Loop)
        const commentSection = document.createElement('div');
        commentSection.className = "comment-section";

        const commentInput = document.createElement('input');
        commentInput.type = "text";
        commentInput.placeholder = "Write a comment...";
        commentInput.className = "comment-input";

        const commentBtn = document.createElement('button');
        commentBtn.innerHTML = "Post";
        commentBtn.className = "comment-btn";

        const commentsList = document.createElement('ul');
        commentsList.className = "comments-list";

        commentBtn.addEventListener("click", () => {
            const commentText: string = commentInput.value.trim();
            if (commentText) {
                const commentItem: HTMLLIElement = document.createElement('li');
                commentItem.innerText = commentText;
                commentsList.appendChild(commentItem);
                commentInput.value = "";
            }
        });

        commentSection.appendChild(commentInput);
        commentSection.appendChild(commentBtn);
        commentSection.appendChild(commentsList);

        //  Social Media Share Buttons (Inside the Loop)
        const socialDiv = document.createElement('div');
        socialDiv.className = "social-share";

        const instagramBtn = document.createElement('a');
        instagramBtn.href = "https://www.instagram.com/";
        instagramBtn.target = "_blank";
        instagramBtn.innerHTML = `<img src="images/instagram-icon.png" alt="Instagram" width="24">`;

        const xBtn = document.createElement('a');
        xBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(news.title + " " + news.url)}`;
        xBtn.target = "_blank";
        xBtn.innerHTML = `<img src="images/x-icon.png" alt="Share on X" width="20">`;

        const linkedinBtn = document.createElement('a');
        linkedinBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(news.url)}`;
        linkedinBtn.target = "_blank";
        linkedinBtn.innerHTML = `<img src="images/linkedin-icon.png" alt="LinkedIn" width="24">`;

        const whatsappBtn = document.createElement('a');
        whatsappBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(news.title + " " + news.url)}`;
        whatsappBtn.target = "_blank";
        whatsappBtn.innerHTML = `<img src="images/whatsapp-icon.png" alt="Share on WhatsApp" width="20">`;

        socialDiv.appendChild(instagramBtn);
        socialDiv.appendChild(linkedinBtn);
        socialDiv.appendChild(whatsappBtn);
        socialDiv.appendChild(xBtn);

        //  Append Everything
        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);
        cardBody.appendChild(commentSection);
        cardBody.appendChild(socialDiv);

        card.appendChild(image);
        card.appendChild(cardBody);
        col.appendChild(card);
        newsdetails.appendChild(col);
    });
};


document.addEventListener('DOMContentLoaded', () => {
    const hamburger: HTMLElement | null = document.getElementById('hamburger');
    const navLinks: HTMLElement | null = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});
