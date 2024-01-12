function login(loginInfo) {
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: current_url + "/api/TaiKhoan/login",
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(loginInfo)
    }).done(function (data) {
        if (data != null && data.message != null && data.message != 'undefined') {
            showMessage("Thông tin tài khoản không chính xác", "fail-message", '<i class="fa-solid fa-triangle-exclamation"></i>');
        }
        else {
            localStorage.setItem("user", JSON.stringify(data));
            if(data.loaiTaiKhoan == 1) {
                showMessage("Đăng nhập thành công\n[Đang chuyển hướng tới trang quản trị]", "success-message", '<i class="fa-regular fa-face-smile"></i>');
                setTimeout(function () {
                    window.location.href = "laptop-management.html";
                }, 3250);
            }
            else if(data.loaiTaiKhoan == 2 || data.loaiTaiKhoan == 3) {
                showMessage("Đăng nhập thành công\n[Đang chuyển hướng tới trang chủ]", "success-message", '<i class="fa-regular fa-face-smile"></i>');
                setTimeout(function () {
                    window.location.href = "home-page.html";
                }, 3250);
            }
        }
    }).fail(function() {
        showMessage("Thông tin tài khoản không chính xác", "fail-message", '<i class="fa-solid fa-triangle-exclamation"></i>');
    });
}

function register(regInfo) {
    event.preventDefault();
    if(regInfo.password == regInfo.confirmPassword) {
        regInfo = {
            username: regInfo.username,
            password: regInfo.password
        };
        $.ajax({
            type: "POST",
            url: current_url + "/api/TaiKhoan/register",
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify(regInfo)
        }).done(function(data) {
            if (data != null && data.message != null && data.message != 'undefined') {
                showMessage("Tên tài khoản đã tồn tại", "fail-message", '<i class="fa-solid fa-triangle-exclamation"></i>');
            }
            else {
                showMessage("Đăng ký tài khoản thành công\n[Đang chuyển hướng tới trang đăng nhập]", "success-message", '<i class="fa-regular fa-face-smile"></i>');
                setTimeout(function () {
                    window.location.href = "sign-up-sign-in.html";
                }, 3250);
            }
        }).fail(function() {
            showMessage("Tên tài khoản đã tồn tại", "fail-message", '<i class="fa-solid fa-triangle-exclamation"></i>');
        });
    }
    else {
        showMessage("Vui lòng xác nhận lại mật khẩu", "fail-message", '<i class="fa-solid fa-triangle-exclamation"></i>');
    }
}
