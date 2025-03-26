

document.querySelector('.continue-shopping').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

Cart
document.addEventListener("DOMContentLoaded", function () {
  const cartList = document.querySelector(".list-group");
  const totalPriceElement = cartList.querySelector("li:last-child strong");
  let totalPrice = 20; // Default total from checkout.html

  function addToCart(productName, price, description) {
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "lh-sm");
      
      listItem.innerHTML = `
          <div>
              <h6 class="my-0">${productName}</h6>
              <small class="text-body-secondary">${description}</small>
          </div>
          <span class="text-body-secondary">$${price}</span>
      `;
      
      cartList.insertBefore(listItem, cartList.lastElementChild);
      totalPrice += price;
      totalPriceElement.textContent = `$${totalPrice}`;
  }

  // Example function call (You can replace this with real product buttons later)
  document.querySelector("#addProductBtn").addEventListener("click", function() {
      addToCart("New Product", 15, "Awesome clothing item");
  });
});
//
function men() {
    console.log("Redirecting to men");
    window.location.href = `../men/men.html`;  // Correct path
}

let menIndex = 0;
let womenIndex = 0;
let shoeIndex = 0;

function swipe(section, direction) {
    const carousel = document.getElementById(`${section}-carousel`);
    const items = carousel.querySelectorAll('.carousel-item');
    const itemWidth = items[0].offsetWidth;

    if (section === 'men') {
        menIndex += direction;
        if (menIndex < 0) menIndex = items.length - 1;
        if (menIndex >= items.length) menIndex = 0;
        carousel.style.transform = `translateX(-${menIndex * itemWidth}px)`;
    } else if (section === 'women') {
        womenIndex += direction;
        if (womenIndex < 0) womenIndex = items.length - 1;
        if (womenIndex >= items.length) womenIndex = 0;
        carousel.style.transform = `translateX(-${womenIndex * itemWidth}px)`;
    } else if (section === 'shoe') {
      shoeIndex += direction;
      if (shoeIndex < 0) shoeIndex = items.length - 1;
      if (shoeIndex >= items.length) shoeIndex = 0;
      carousel.style.transform = `translateX(-${shoeIndex * itemWidth}px)`;
  }
}
function women() {
    console.log("Redirecting to women");
    window.location.href = `../women/women.html`;  // Correct path
}