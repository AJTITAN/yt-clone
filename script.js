const containerDiv = document.querySelector(".container");
const loadingScreen = document.querySelector(".loading-screen");
const searchButton = document.querySelector(".btn-search");
const inputText = document.querySelector(".inputText");

let url = "https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=157"
const options = {method: 'GET', headers: {accept: 'application/json'}};
async function fetchurl(){
try {
  containerDiv.classList.add("display");
  const response = await fetch(url, options);
  const data = await response.json();
  setTimeout(() => {
    //   loadingScreen.classList.add("display");
      containerDiv.classList.remove("display");
  }, 1000);
  console.log(data);
  const arr = data.data.data;
  function timeAgo(dateString) {
    const publishedDate = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - publishedDate) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400
    };

    for (const [unit, seconds] of Object.entries(intervals)) {
        const interval = Math.floor(diffInSeconds / seconds);
        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
        }
    }
    return "Just now";
}

function formatViews(viewCount) {
    if (viewCount >= 1000000) {
        return (viewCount / 1000000).toFixed(1) + "M";
    } else if (viewCount >= 1000) {
        return (viewCount / 1000).toFixed(1) + "K";
    }
    return viewCount.toString();
}

arr.forEach(element => {
    const div = document.createElement("div");
    div.classList.add("card");

    const videoId = element.items.id;
    const thumbnail = element.items.snippet.thumbnails.high.url;
    const title = element.items.snippet.title;
    const channelTitle = element.items.snippet.channelTitle;
    const publishedAt = timeAgo(element.items.snippet.publishedAt);
    const viewCount = formatViews(element.items.statistics.viewCount || 0);

    div.innerHTML = `
        <div loading="lazy" class="image-section">
            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                <img src="${thumbnail}" alt="">
            </a>
        </div>
        <div class="text-area">
            <a class="thumbnail-yt" href="https://www.youtube.com/@HiteshCodeLab" target="_blank">
                <img src="https://yt3.googleusercontent.com/arHIKjc6JTqF_b4QJKPHhQC_Jr8q0XfI7LEpJ0-VuiI0ZRz9xFNz94TWl4CLOcozLx-iAhV_=s160-c-k-c0x00ffffff-no-rj" alt="">
            </a>
            <div class="video-details">
                <div class="description-yt">${title}</div>
                <div class="channel-title">${channelTitle}</div>
                <div class="publish-date">${publishedAt}</div>
                <div class="view-count"> ${viewCount}</div>
            </div>
        </div>`;

    containerDiv.appendChild(div);
});


  console.log(arr);
  searchButton.addEventListener("click",()=>{
    if(inputText.value.trim()===""){
        alert("please enter the search value")
    }
    else{
        const videoCards = document.querySelectorAll(".card");
        videoCards.forEach(card => {
            const description = card.querySelector(".description-yt").textContent.toLowerCase();
            
            if (description.includes(inputText.value)) {
                card.style.display = "block"; 
            } else {
                card.style.display = "none"; 
            }
        });
    }
  })
} catch (error) {
  console.error(error);
}
}

fetchurl();