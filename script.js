let purchasedCats = [];

function shoppingCart() {
  const cartDiv = document.getElementById("cartContent");
  if (purchasedCats.length === 0) {
    cartDiv.textContent = "Cart is empty";
    return;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  shoppingCart();
});