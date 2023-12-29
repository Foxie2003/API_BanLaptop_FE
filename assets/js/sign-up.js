function signUp(e) {
    event.preventDefault();
    var userName = document.getElementById("username-sign-up").value;
    var password = document.getElementById("password-sign-up").value;
    var confirmPassword = document.getElementById("confirm-password-sign-up").value;
    if(password != confirmPassword) {
        // alert("Vui lòng xác nhận lại mật khẩu");
        showMessage("Vui lòng xác nhận lại mật khẩu", "fail-message", '<i class="fa-solid fa-triangle-exclamation"></i>');
        return;
    }
    if(localStorage.getItem(userName) != null) {
        // alert("Tài khoản đã tồn tại");
        showMessage("Tài khoản đã tồn tại", "fail-message", '<i class="fa-solid fa-triangle-exclamation"></i>');
        return;
    }
    var user = {
        userName : userName,
        password : password,
        cart : []
    }
    if(password.length >= 8) {
        var json = JSON.stringify(user);
        localStorage.setItem(userName, json);
        // alert("Đăng ký thành công");
        showMessage("Đăng ký thành công\n[Đang chuyển hướng tới trang chủ]", "success-message", '<i class="fa-regular fa-face-smile"></i>');
        setTimeout(function () {
            window.location.href = "home-page.html";
        }, 5250);
    }
    else {
        // alert("Mật khẩu phải chứa tổi thiểu 8 ký tự");
        showMessage("Mật khẩu phải chứa tổi thiểu 8 ký tự", "fail-message", '<i class="fa-solid fa-triangle-exclamation"></i>');
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
    var data = JSON.parse(user);
    if(data == null) {
        // alert("Vui lòng nhập tài khoản và mật khẩu");
        showMessage("Vui lòng nhập tài khoản và mật khẩu", "fail-message", '<i class="fa-solid fa-triangle-exclamation"></i>');

    }
    else if(userName == data.userName && password == data.password) {
        // alert("Đăng nhập thành công");
        showMessage("Đăng nhập thành công\n[Đang chuyển hướng tới trang chủ]", "success-message", '<i class="fa-regular fa-face-smile"></i>');
        localStorage.setItem("loginData", user);
        setTimeout(function () {
            window.location.href = "home-page.html";
        }, 5250);
    }
    else {
        // alert("Sai tài khoản mật khẩu");
        showMessage("Mật khẩu hoặc tài khoản sai", "fail-message", '<i class="fa-solid fa-triangle-exclamation"></i>');
    }
}

function checkLogin() {
    if (localStorage.getItem("loginData") != null) {
        window.location.href = "home-page.html";
    }
}