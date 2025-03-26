function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id"); // Extract 'id' from query parameters
}

function toggleMenu() {
    let navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
}
let p=["./pics/p1.png","./pics/p2.png","./pics/p3.png","./pics/p4.png","./pics/p5.png","./pics/p6.png","./pics/p7.png"];
let i=0;
let swipei=setInterval(swipe,3000);
let timeoutId;
function swipe(){
    i=(i+1)%p.length;
    document.getElementById("pics").src=p[i];
};

function opentab(add){
    window.open(add, "_blank");
};
function op(add){
    clearInterval(swipei)
    document.getElementById("pics").src=add;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        clearInterval(swipei); // Clear any previous interval before restarting
        swipei = setInterval(swipe,3000); // Restart fresh interval
    }, 5000);
};
function changebg(n){
    let b=document.getElementsByClassName("s"); 

    for(let i=0;i<b.length;i++){
        if(i!=n-1){
        b[i].style.background="white";
        }
    }

    if(b[n-1].style.background==="red"){  
        b[n-1].style.background="white";
    }
    else{
        b[n-1].style.background="red";
    }
};
function page(pic1, title, price, description){
let div = document.createElement("div");
div.classList.add("container");

div.innerHTML = ` <div class="container">
      <div class="left">
        <img
          class="i"
          id="pics"
          src="${pic1}"
          onclick="opentab(src)"
          alt=""
        />
        <img class="small" src="${pic1}" onclick="op(src)" alt="" />
        <img class="small" src="./pics/p2.png" onclick="op(src)" alt="" />
        <img class="small" src="./pics/p3.png" onclick="op(src)" alt="" />
        <img class="small" src="./pics/p4.png" onclick="op(src)" alt="" />
        <img class="small" src="./pics/p5.png" onclick="op(src)" alt="" />
        <img class="small" src="./pics/p6.png" onclick="op(src)" alt="" />
        <img class="small" src="./pics/p7.png" onclick="op(src)" alt="" />
      </div>
      <div class="right">
        <h1 class="title">${title}</h1>
        <br /><br />
        <p class="description">
          <span> Some info about product</span>
        </p>
        <br />
        <div class="price">
          <s style="font-style: italic; font-size: 30px; color: red">$300</s>
          $${price}
        </div>
        <div class="size">
          <div class="s" onclick="changebg(1)">S</div>
          <div class="s" onclick="changebg(2)">M</div>
          <div class="s" onclick="changebg(3)">L</div>
          <div class="s" onclick="changebg(4)">XL</div>
          <div class="s" onclick="changebg(5)">XXL</div>
          <div class="s" onclick="changebg(6)">XXXL</div>
        </div>
        <div class="butt">
         <!-- <button class="save" onclick="alert('Product Saved Succesfully')">
            Save to Collection
          </button>
          <button class="buy" onclick="alert('Redirecting to payment gateway')">
            BUY NOW
          </button>
          <button
            class="cart"
            onclick="alert('Product added to Cart Succesfully')"
          >
            Add to Cart
          </button>-->
          <button type="button" class="btn btn-success">Save</button>
          <a href="../checkout.html"><button type="button" class="btn btn-warning">Buy Now</button></a>
          <button type="button" class="btn btn-primary">Add to Cart</button>
        </div>
        <br /><br />
        <div class="product-d">
          <h1>Product Description:-</h1>
          <br />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt
            odit omnis similique corporis beatae placeat pariatur deleniti
            sapiente tenetur assumenda aspernatur, quod blanditiis iusto
            obcaecati eligendi? Pariatur quos blanditiis porro voluptatibus
            neque ducimus deserunt quisquam doloremque esse reprehenderit natus
            nihil a eos eum non soluta, libero minima sunt quis ab? Porro odit
            quae deleniti libero dolorem. Minus consequuntur amet iusto
            voluptatibus quas, architecto, cupiditate unde, voluptate totam illo
            repellendus ipsam! Corporis eaque laboriosam reprehenderit a quia
            quasi impedit ipsum doloremque error, rem quod atque illo neque
            expedita mollitia tenetur minima, recusandae inventore. Dolorum
            eligendi explicabo ad sit at laboriosam beatae non cum est,
            asperiores similique dolores debitis perspiciatis error eum nisi
            alias impedit minima! Consectetur maxime eveniet vel. Facere vero
            animi at id, itaque, quae quasi cum culpa ea reprehenderit unde?
            Nisi atque tempore cupiditate perspiciatis, quae assumenda
            blanditiis debitis ipsum laborum, veritatis nostrum? Distinctio
            blanditiis id, repellat libero praesentium officia autem quibusdam
            nesciunt recusandae veritatis, atque dicta ipsa eveniet ipsam sequi
            nam est magnam animi. Accusamus expedita officia at, iusto odio
            placeat ipsum labore nulla alias maiores est velit fugiat corrupti
            ab illum, nihil, perferendis mollitia quaerat neque assumenda
            consequuntur delectus doloremque incidunt obcaecati. Dicta minus
            nesciunt quia quas!
          </p>
        </div>
      </div>
    </div>`;
    document.querySelector(".box").appendChild(div);

};

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
            page(product.image, product.name, product.price, product.description);
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

