function goToSignIn(e) {
    event.preventDefault();
    var signUp = document.getElementById("sign-up");
    signUp.classList.add("hide");
    var signIn = document.getElementById("sign-in");
    signIn.classList.remove("hide");
}

function goToSignUp(e) {
    event.preventDefault();
    var signUp = document.getElementById("sign-up");
    signUp.classList.remove("hide");
    var signIn = document.getElementById("sign-in");
    signIn.classList.add("hide");
}

function checkLogin() {
    if (JSON.parse(localStorage.getItem("loginData")) != null) {
        window.location.href = "home-page.html";
    }
}