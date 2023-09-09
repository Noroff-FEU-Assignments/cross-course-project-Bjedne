const productInfo = document.querySelector(".prodinf");
const productImg = document.querySelector(".prodimg");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

console.log(id);

async function forgeLegendInfo() {
    const urlFL = "https://api.noroff.dev/api/v1/gamehub/" + id;
    const corsEnabledUrl = "https://noroffcors.onrender.com/" + urlFL;

    const response = await fetch(corsEnabledUrl);
    const results = await response.json();
    return results;
}

productInfo.innerHTML = `<div class="loading-indicator"></div>`;

async function productDetails() {
    try {
        const specProd = await forgeLegendInfo();
        productImg.innerHTML = `<img src="${specProd.image}" alt="${specProd.title}" class="prodimg">`;
        productInfo.innerHTML = `<h1 class="fl-title">${specProd.title}</h1>
                                    <p class="description">${specProd.description}</p>
                                    <div class="product-info">
                                        <p>Genre: ${specProd.genre} </p>
                                        <p>Release date: ${specProd.released} </p>
                                        <p>Rating: ${specProd.ageRating} </p>
                                    </div>
                                <div>
                                     <p class="euro">€${specProd.price}</p>
                                </div>
                                <div>
                                    <button class="forge-button">Add to cart</button>
                                </div>`;
        
    }catch(error) {
        console.log("Something is wrong here!");
}
} 

productDetails();
