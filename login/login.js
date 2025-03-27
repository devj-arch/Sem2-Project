document.getElementById("login-btn").addEventListener("click", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("https://sem2-project-muz1.onrender.com/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }) 
    });

    const data = await response.json(); // ✅ Parse as JSON

    if (data.status === "ok") {
        alert(data.message); // ✅ Show success message
        window.location.href = "../men/men.html";
    } else {
        alert(data.error || "❌ Invalid username or password!");
    }
});


function signInWithGoogle() {
    alert("Google Sign-In feature coming soon!");
}

function signInWithInstagram() {
    alert("Instagram Sign-In feature coming soon!");
}