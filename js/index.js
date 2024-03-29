const url = "https://www.bjednanigans.no/wp-json/wc/store/products";
const corsEnabledUrl = "https://noroffcors.onrender.com/" + url;

const indexProdContainer = document.querySelector(".gamelist");

indexProdContainer.innerHTML = `<div class="loading-indicator">`

async function fetchIndexProducts() {

    try {
    const response = await fetch(url);
    const results = await response.json();

    console.log(results);
    
    indexProdContainer.innerHTML = "";

    const games = results;

    games.forEach(function(game) {
        indexProdContainer.innerHTML += `<div class="blackbg">
                                            <a href="products/forge.html?id=${game.id}"> <h2 class="title">${game.name}</h2>
                                            <img src=${game.images[0].src} alt="${game.name} class="game-cover"></a>
                                        <div class="price blackbg">
                                            <h2 class="tag">NOK ${game.prices.price}</h2>
                                            <a class="item index-button" href="products/forge.html?id=${game.id}">View game</a>
                                        </div>`;
        });
    }
    catch(error) {
    console.log(error);
    indexProdContainer.innerHTML = message("error", error);
    }
}

fetchIndexProducts();

