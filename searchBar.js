function searchProducts() {
    let query = document.getElementById("search").value;
    if (query.trim() !== "") {
      alert("Searching for: " + query);
    }
  }