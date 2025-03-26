const username = document.getElementById("username");
const password = document.getElementById("password");
const signup = document.getElementById("signup-btn");

console.log("📦 signup.js loaded");

signup.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("🚀 Signup button clicked");

    const user = username.value;
    const pass = password.value;
    console.log("📨 Sending:", user, pass);

    const response = await fetch("http://localhost:3000/signup", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: user, password: pass })
    });

    const res = await response.json();
    console.log("🧾 Server response:", res);

    if (res.status === "ok") {
        alert("✅ Signup successful! Redirecting to login...");
        window.location.href = "./login.html"; 
    } else {
        alert(res.error);
    }
});


function signUpWithGoogle() {
    alert("Google Sign-Up feature coming soon!");
}

function signUpWithInstagram() {
    alert("Instagram Sign-Up feature coming soon!");
}