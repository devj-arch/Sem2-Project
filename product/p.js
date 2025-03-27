function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function toggleMenu() {
  let navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}

let p = [];
let i = 0;
let swipei;
let timeoutId;

function swipe() {
  i = (i + 1) % p.length;
  document.getElementById("pics").src = p[i];
}
setInterval(swipe, 3000);

function opentab(add) {
  window.open(add, "_blank");
}

function op(add) {
  clearInterval(swipei);
  document.getElementById("pics").src = add;
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
      swipei = setInterval(swipe, 3000);
  }, 5000);
}

function changebg(n) {
  let b = document.getElementsByClassName("s");
  for (let i = 0; i < b.length; i++) {
      b[i].style.background = i === n - 1 ? (b[i].style.background === "red" ? "white" : "red") : "white";
  }
}

function page(pic1, pic2, pic3, pic4, pic5, pic6, pic7, title, price, description) {
  let div = document.createElement("div");
  div.classList.add("container");

  div.innerHTML = `
    <div class="container">
      <div class="left">
        <img class="i" id="pics" src="${pic1}" onclick="opentab(this.src)" alt=""/>
        <img id="p1" class="small" src="${pic1}" onclick="op(this.src)" alt="" />
        <img id="p2" class="small" src="${pic2}" onclick="op(this.src)" alt="" />
        <img id="p3" class="small" src="${pic3}" onclick="op(this.src)" alt="" />
        <img id="p4" class="small" src="${pic4}" onclick="op(this.src)" alt="" />
        <img id="p5" class="small" src="${pic5}" onclick="op(this.src)" alt="" />
        <img id="p6" class="small" src="${pic6}" onclick="op(this.src)" alt="" />
        <img id="p7" class="small" src="${pic7}" onclick="op(this.src)" alt="" />
      </div>
      <div class="right">
        <h1 class="title">${title}</h1>
        <p class="description"><span> Some info about product</span></p>
        <div class="price"><s style="font-style: italic; font-size: 30px; color: red">₹300</s> ₹${price}</div>
        <div class="size">
          <div class="s" onclick="changebg(1)">S</div>
          <div class="s" onclick="changebg(2)">M</div>
          <div class="s" onclick="changebg(3)">L</div>
          <div class="s" onclick="changebg(4)">XL</div>
          <div class="s" onclick="changebg(5)">XXL</div>
          <div class="s" onclick="changebg(6)">XXXL</div>
        </div>
        <div class="butt">
          <button type="button" class="btn btn-success">Save</button>
          <a href="../checkout.html"><button type="button" class="btn btn-warning">Buy Now</button></a>
          <button type="button" class="btn btn-primary">Add to Cart</button>
        </div>
        <div class="product-d">
          <h1>Product Description:-</h1>
          <p>${description}</p>
        </div>
      </div>
    </div>`;
  
  document.querySelector(".box").appendChild(div);

  // Populate p array after images are created
  p = [pic1, pic2, pic3, pic4, pic5, pic6, pic7];

  // Start image swipe only if multiple images exist
  if (p.length > 1) {
      swipei = setInterval(swipe, 3000);
  }
}

async function fetchProductDetails() {
  console.log("Fetching product details...");

  const productId = getProductIdFromURL();
  console.log("Extracted Product ID:", productId);

  if (!productId) {
      document.querySelector(".container").innerHTML = "<h2>Product not found!</h2>";
      return;
  }

  try {
      const response = await fetch("https://edge-clothing.onrender.com/products");
      const products = await response.json();
      console.log("Fetched Products:", products);

      const product = products.find(p => p._id === productId);

      if (product) {
          console.log("Found Product:", product);
          page(product.image1, product.image2, product.image3, product.image4, product.image5, product.image6, product.image7, product.name, product.price, product.description);
      } else {
          console.error("Product not found!");
          document.querySelector(".container").innerHTML = "<h2>Product not found.</h2>";
      }
  } catch (error) {
      console.error("Error fetching product details:", error);
      document.querySelector(".container").innerHTML = "<h2>Error loading product.</h2>";
  }
}

// Fetch the product after the page loads
fetchProductDetails();
