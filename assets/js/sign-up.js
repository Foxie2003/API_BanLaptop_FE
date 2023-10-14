function signUp(e) {
    event.preventDefault();
    var userName = document.getElementById("username-sign-up").value;
    var password = document.getElementById("password-sign-up").value;
    var confirmPassword = document.getElementById("confirm-password-sign-up").value;
    if(password != confirmPassword) {
        alert("Vui lòng xác nhận lại mật khẩu");
        return;
    }
    var user = {
        userName : userName,
        password : password,
    }
    if(userName.length > 8) {
        var json = JSON.stringify(user);
        localStorage.setItem(userName, json);
        alert("Đăng ký thành công");
        window.location.href = "load-json.html";
    }
}

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

function signIn(e) {
    event.preventDefault();
    var userName = document.getElementById("username-sign-in").value;
    var password = document.getElementById("password-sign-in").value;
    var user = localStorage.getItem(userName);
    console.log(user);
    var data = JSON.parse(user);
    if(data == null) {
        alert("Vui lòng nhập tài khoản và mật khẩu");
    }
    else if(userName == data.userName && password == data.password) {
        alert("Đăng nhập thành công");
        window.location.href = "load-json.html";
    }
    else {
        alert("Sai tài khoản mật khẩu");
    }
}