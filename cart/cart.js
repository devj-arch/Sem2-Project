function empty(){
    let div=document.createElement("div");
    div.classList.add("empty");
    div.innerHTML=`  <img src="../logos/big_cart.svg">
    <p>Your cart is empty. Add some items to view.</p>
    <div class="cart-actions">
      <button class="cart-btn" onclick="window.location.href='../index.html'">Continue Shopping</button>
    </div>`;
    document.querySelector(".cartempty").appendChild(div);                                            
}