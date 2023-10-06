let carts = productInfo.getElementsByClassName("add-cart");
console.log(carts);

for(let i = 0; i < carts.length; i++) {
    console.log("my loop is working");
}

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName("remove-button")
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener("click", removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName("cart-quantity")
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener("change", quantityChanged)
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
            input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("my-cart")[0]
    var cartRows = cartItemContainer.getElementsByClassName("cart-items")
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName("my-cart-price")[0]
            var quantityElement = cartRow.getElementsByClassName("cart-quantity")[0]
            var price = parseFloat(priceElement.innerText.replace("$", ""))
            var quantity = quantityElement.value
            total =total + (price * quantity)
    }
    document.getElementsByClassName("cart-total-price")[0].innerText = "$" + total
}






