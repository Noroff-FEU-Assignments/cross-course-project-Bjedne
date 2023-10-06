const productInfo = document.querySelector(".prodinf");
const productImg = document.querySelector(".prodimg");


const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

async function forgeLegendInfo() {
    const urlFL = "https://api.noroff.dev/api/v1/gamehub/" + id;
    const corsEnabledUrl = "https://noroffcors.onrender.com/" + urlFL;

    const response = await fetch(urlFL);
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
                                    <button class="forge-button add-cart">Add to cart</button>
                                </div>`;   
    let carts = productInfo.querySelector(".add-cart");

    carts.addEventListener("click", () => {
        cartNumbers(specProd);
        alert("Item added to cart");
    })

    function onLoadCartNumbers() {
        let productNumbers = localStorage.getItem("cartNumbers");

        if(productNumbers) {
            document.querySelector(".shopping-cart span").textContent = productNumbers;
        }
    }

    function cartNumbers(specProd) {
        let productNumbers = localStorage.getItem("cartNumbers");
        
        productNumbers = parseInt(productNumbers);

        if ( productNumbers ) {
            localStorage.setItem("cartNumbers", productNumbers + 1);
            document.querySelector(".shopping-cart span").textContent = productNumbers + 1;
        } else {
            localStorage.setItem("cartNumbers", 1);
            document.querySelector(".shopping-cart span").textContent = 1;
        }

        setItems(specProd);
    }

    function setItems(specProd) {
        let cartItems = localStorage.getItem("productsInCart");
        cartItems = JSON.parse(cartItems);

        if (cartItems != null) {
            if (cartItems[specProd.title] == undefined) {
                cartItems = {
                    ...cartItems,
                    [specProd.title]: specProd
                }
            }
            cartItems[specProd.title].inCart += 1;
        } else {
            specProd.inCart = 1;
            cartItems = {
                [specProd.title]: specProd
            }
        }
        cartItems != null ? cartItems = {
            ...cartItems,
            [specProd.title]: specProd
        } : {
            [specProd.title]: specProd
        }

        localStorage.setItem("productsInCart", JSON.stringify(specProd));
    }
    onLoadCartNumbers();


    }catch(error) {
        console.log("Something is wrong here!");
        productInfo.innerHTML = message("There was an error loading your product");
}
} 


if (!id) {
    productImg.innerHTML = `<div class="error">No image was found</div>`;
    productInfo.innerHTML = `<div class="error">No product was found</div>`;
}else {
productDetails();
}

