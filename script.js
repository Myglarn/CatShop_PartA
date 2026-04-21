   //-----\\
  //       \\
 // CAT API \\
//___________\\

let allCats = [];
let currentPage = 1;
const catsPerPage = 10;

async function fetchCats(){
  const response = await fetch("https://api.thecatapi.com/v1/breeds?limit=30");
  allCats = await response.json();
  renderCats();
}

function renderCats(){
  const catList = document.getElementById("catList");
  if(!catList) return;

  catList.innerHTML = "";

  const start = (currentPage -1) * catsPerPage;
  const end = start + catsPerPage;
  const catsToShow = allCats.slice(start, end);
  const totalPages = Math.ceil(allCats.length / catsPerPage);

  for (const cat of catsToShow) {
    const imageUrl = cat.reference_image_id
      ? `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`
      : "";

    const card = document.createElement("div");
    card.className = "catCard";
   card.innerHTML = `
              <img src="${imageUrl}" alt="${cat.name}" />
              <h3>${cat.name}</h3>
              <p>Origin: ${cat.origin}</p>
              <button onclick="addToCart('${cat.id}')">Add to cart</button>
          `;
          catList.appendChild(card);
  }

  document.getElementById("pageInfo").textContent = `Page
  ${currentPage} of ${totalPages}`;
      document.getElementById("prevBtn").disabled = currentPage
   === 1;
      document.getElementById("nextBtn").disabled = currentPage
   === totalPages;
}

function nextPage(){
  currentPage++;
  renderCats();
}

function prevPage(){
  currentPage--;
  renderCats();
}

   //-----------\\
  //             \\
 // SHOPPING CART \\
//_________________\\

let purchasedCats = JSON.parse(localStorage.getItem("purchasedCats")) || [];

function addToCart(catId) {
  const catToPurchase = allCats.find((cat) => cat.id === catId);
  if (catToPurchase) {
    purchasedCats.push(catToPurchase);
    localStorage.setItem("purchasedCats", JSON.stringify(purchasedCats));
  }
}

function shoppingCart() {
    const cartDiv = document.getElementById("cartContent");
    if (!cartDiv) return;

    if (purchasedCats.length === 0) {
      cartDiv.textContent = "Cart is empty";
      return;
    }

    cartDiv.innerHTML = "";

    for (const cat of purchasedCats) {
      const imageUrl = cat.reference_image_id
        ? `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`
        : "";

      const item = document.createElement("article");
      item.className = "cartItem";
      item.innerHTML = `
        <img src="${imageUrl}" alt="${cat.name}" />
        <h3>${cat.name}</h3>
        <p>Origin: ${cat.origin}</p>
      `;
      cartDiv.appendChild(item);
    }
  }

document.addEventListener("DOMContentLoaded", function () {
    fetchCats();
    shoppingCart();  
});
