var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Variables
var generalBtn = document.getElementById("general");
var businessBtn = document.getElementById("business");
var sportsBtn = document.getElementById("sports");
var entertainmentBtn = document.getElementById("entertainment");
var technologyBtn = document.getElementById("technology");
var searchBtn = document.getElementById("searchBtn");
var newsQuery = document.getElementById("newsQuery");
var newsType = document.getElementById("newsType");
var newsdetails = document.getElementById("newsdetails");
// API Configuration
var API_KEY = "12ec8d63579b433db9925627296199c1";
var BASE_URL = "https://newsapi.org/v2/top-headlines?country=us&apiKey=".concat(API_KEY);
var SEARCH_NEWS = "https://newsapi.org/v2/everything?apiKey=".concat(API_KEY, "&q=");
var categories = {
    general: "https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=".concat(API_KEY),
    business: "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=".concat(API_KEY),
    sports: "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=".concat(API_KEY),
    entertainment: "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=".concat(API_KEY),
    technology: "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=".concat(API_KEY),
};
window.onload = function () {
    fetchNews(BASE_URL);
};
// Event Listeners
generalBtn.addEventListener("click", function () { return loadNews("general", "General News"); });
businessBtn.addEventListener("click", function () { return loadNews("business", "Business"); });
sportsBtn.addEventListener("click", function () { return loadNews("sports", "Sports"); });
entertainmentBtn.addEventListener("click", function () { return loadNews("entertainment", "Entertainment"); });
technologyBtn.addEventListener("click", function () { return loadNews("technology", "Technology"); });
searchBtn.addEventListener("click", function () {
    var query = newsQuery.value.trim();
    if (!query)
        return;
    newsType.innerHTML = "<h4>Search Results for: ".concat(query, "</h4>");
    fetchNews(SEARCH_NEWS + encodeURIComponent(query));
});
var loadNews = function (category, title) {
    newsType.innerHTML = "<h4>".concat(title, "</h4>");
    fetchNews(categories[category]);
};
var fetchNews = function (url) { return __awaiter(_this, void 0, void 0, function () {
    var response, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                newsdetails.innerHTML = "<h5>Loading...</h5>";
                return [4 /*yield*/, fetch(url)];
            case 1:
                response = _a.sent();
                if (!response.ok)
                    throw new Error(response.statusText);
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                if (!data.articles || data.articles.length === 0) {
                    newsdetails.innerHTML = "<h5>No data found.</h5>";
                    return [2 /*return*/];
                }
                displayNews(data.articles);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error("Error fetching data:", error_1);
                newsdetails.innerHTML = "<h5>No data found.</h5>";
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var displayNews = function (newsDataArr) {
    newsdetails.innerHTML = "";
    if (!newsDataArr.length) {
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }
    newsDataArr.forEach(function (news) {
        var date = new Date(news.publishedAt).toDateString();
        var col = document.createElement("div");
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";
        var card = document.createElement("div");
        card.className = "p-2";
        var image = document.createElement("img");
        image.src = news.urlToImage || "default-image.png";
        image.className = "news-image";
        var cardBody = document.createElement("div");
        var newsHeading = document.createElement("h5");
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;
        var dateHeading = document.createElement("h6");
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date;
        var description = document.createElement("p");
        description.className = "text-muted";
        description.innerHTML = news.description || "No description available.";
        var link = document.createElement("a");
        link.className = "read-more";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML = "Read more";
        //  Comment Section (Inside the Loop)
        var commentSection = document.createElement('div');
        commentSection.className = "comment-section";
        var commentInput = document.createElement('input');
        commentInput.type = "text";
        commentInput.placeholder = "Write a comment...";
        commentInput.className = "comment-input";
        var commentBtn = document.createElement('button');
        commentBtn.innerHTML = "Post";
        commentBtn.className = "comment-btn";
        var commentsList = document.createElement('ul');
        commentsList.className = "comments-list";
        commentBtn.addEventListener("click", function () {
            var commentText = commentInput.value.trim();
            if (commentText) {
                var commentItem = document.createElement('li');
                commentItem.innerText = commentText;
                commentsList.appendChild(commentItem);
                commentInput.value = "";
            }
        });
        commentSection.appendChild(commentInput);
        commentSection.appendChild(commentBtn);
        commentSection.appendChild(commentsList);
        //  Social Media Share Buttons (Inside the Loop)
        var socialDiv = document.createElement('div');
        socialDiv.className = "social-share";
        var instagramBtn = document.createElement('a');
        instagramBtn.href = "https://www.instagram.com/";
        instagramBtn.target = "_blank";
        instagramBtn.innerHTML = "<img src=\"images/instagram-icon.png\" alt=\"Instagram\" width=\"24\">";
        var xBtn = document.createElement('a');
        xBtn.href = "https://twitter.com/intent/tweet?text=".concat(encodeURIComponent(news.title + " " + news.url));
        xBtn.target = "_blank";
        xBtn.innerHTML = "<img src=\"images/x-icon.png\" alt=\"Share on X\" width=\"20\">";
        var linkedinBtn = document.createElement('a');
        linkedinBtn.href = "https://www.linkedin.com/sharing/share-offsite/?url=".concat(encodeURIComponent(news.url));
        linkedinBtn.target = "_blank";
        linkedinBtn.innerHTML = "<img src=\"images/linkedin-icon.png\" alt=\"LinkedIn\" width=\"24\">";
        var whatsappBtn = document.createElement('a');
        whatsappBtn.href = "https://api.whatsapp.com/send?text=".concat(encodeURIComponent(news.title + " " + news.url));
        whatsappBtn.target = "_blank";
        whatsappBtn.innerHTML = "<img src=\"images/whatsapp-icon.png\" alt=\"Share on WhatsApp\" width=\"20\">";
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
document.addEventListener('DOMContentLoaded', function () {
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }
});
