var loginData = JSON.parse(localStorage.getItem("loginData"));
var cartInfo = loginData.cart;

function showMessage(message, type, icon) {
    var messagePanel = document.getElementById("message-panel");
    messagePanel.innerHTML += `
    <div class="message-timeout">
                <div class="message-box ${type}">
                    <div class="message-icon">${icon}</i></div>
                    <div class="message">${message}</div>
                    <div class="message-button ${type}" onclick="hideMessage()"><i class="fa-regular fa-circle-xmark"></i></div>
                </div>
                <div class="timeout ${type}"></div>
            </div>`;
    var arrMessage = document.getElementsByClassName("message-timeout");
    var message = arrMessage[arrMessage.length - 1];
    message.style.display = "block";
    message.classList.add("show-message-animation");
    document.querySelector(".timeout").classList.add("timeout-animation");
    setTimeout(function () {
        message.style.display = "none";
    }, 3250);
}

function hideMessage() {
    var messagePanel = document.getElementById("message-panel");
    messagePanel.innerHTML = "";
}

function loadCartData() {
    if(cartInfo.length <= 0) {
        showMessage("Giỏ hàng trống \nHãy tiếp tục mua sắm nhé <3" + `<a href="home-page.html">[Đến trang chủ]</a>`, "success-message", '<i class="fa-solid fa-cart-plus">');
        document.getElementById("cart-info").innerHTML = 
        `<p style="font-size: 32px; font-weight: bold; color: #333; width: 100%; text-align: center; margin:200px 0;">Không có sản phẩm nào trong giỏ</p>`;
        document.querySelector('.user-info').style.display = "none";
    }
    else {
        document.querySelector('.user-info').style.display = "block";
        document.getElementById("cart-info").innerHTML = "";
        const format = new Intl.NumberFormat({ maximumSignificantDigits: 3 });
        var priceSum = 0;
        cartInfo.forEach(productInfo => {
            document.getElementById("cart-info").innerHTML +=
            `<div class="cart-info-item" onclick="window.location.href = '${"product-details.html?id=" + productInfo.product.id}'">
            <div class="img-panel">
                <img src="${productInfo.product.images[0]}" alt="">
                <button onclick="btnDelete('${productInfo.product.id}');"><i class="fa-regular fa-trash-can fa-sm"></i> Xóa</button>
            </div>
            <div class="info-panel">
                <div class="info-panel-product-name">${productInfo.product.name}</div>
                <div class="info-panel-product-offer">* Nhập mã <b>MMSALE100</b> giảm ngay 1% tối đa 100.000đ khi thanh toán qua MOMO</div>
                <div class="info-panel-product-color">Màu sắc: <b>Đen</b></div>
            </div>
            <div class="price-panel">
                <div>
                    <div class="price-panel-price">${format.format(productInfo.product.price) + "₫"}</div>
                    <div class="price-panel-old-price">${format.format(productInfo.product.price + productInfo.product.price / 10) + "₫"}</div>
                </div>
                <div class="price-panel-quantity">
                    <div class="price-panel-btn-minus" onclick="btnMinusOnClick('${productInfo.product.id}');"><i class="fa-solid fa-minus fa-lg"></i></div>
                    <input type="number" class="price-panel-input" value="${productInfo.quantity}" min="0" readonly>
                    <div class="price-panel-btn-plus" onclick="btnPlusOnClick('${productInfo.product.id}');"><i class="fa-solid fa-plus fa-lg"></i></div>
                </div>
            </div>
        </div>`;
        priceSum += productInfo.product.price * productInfo.quantity;
        document.getElementById("sum-price").textContent = format.format(priceSum) + "₫";
        });
        document.getElementById("cart-info").innerHTML += 
        `<div class="cart-info-bottom">
        <div class="cart-info-count">Tạm tính (${cartInfo.length} sản phẩm):</div>
        <div class="cart-info-sum">${format.format(priceSum)}₫</div>
        </div>`;
    }
}

function btnMinusOnClick(id) {
    event.stopPropagation()
    for (let index = 0; index < cartInfo.length; index++) {
        if(cartInfo[index].product.id == id) {
            cartInfo[index].quantity--;
            if(cartInfo[index].quantity == 0) {
                cartInfo.splice(index, 1);
            }
            loginData.cart = cartInfo;
            localStorage.setItem("loginData", JSON.stringify(loginData));
            loadCartData();
            return;
        }
    }
}

function btnPlusOnClick(id) {
    event.stopPropagation()
    for (let index = 0; index < cartInfo.length; index++) {
        if(cartInfo[index].product.id == id) {
            cartInfo[index].quantity++;
            loginData.cart = cartInfo;
            localStorage.setItem("loginData", JSON.stringify(loginData));
            loadCartData();
            return;
        }
    }
}

function btnDelete(id) {
    event.stopPropagation()
    for (let index = 0; index < cartInfo.length; index++) {
        if(cartInfo[index].product.id == id) {
            cartInfo.splice(index, 1);
            loginData.cart = cartInfo;
            localStorage.setItem("loginData", JSON.stringify(loginData));
            loadCartData();
            return;
        }
    }
}

function saveBillData() {
    // Lấy thông tin từ các trường form
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var city = document.getElementById('city').value;
    var district = document.getElementById('district').value;
    var ward = document.getElementById('ward').value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var shipOption = document.querySelector('input[name="ship"]:checked').value;
    var otherRequest = document.getElementById('other-request').value;
    var offer = document.getElementById('offer').value;

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    var cartData = JSON.parse(localStorage.getItem("loginData")).cart || [];
    var orderData = {
        name: name,
        phone: phone,
        city: city,
        district: district,
        ward: ward,
        gender: gender,
        shipOption: shipOption,
        otherRequest: otherRequest,
        offer: offer,
        cart : cartData,
        date : `${day}/${month}/${year}`
    };

    var ordersArray = JSON.parse(localStorage.getItem('bills')) || [];
    ordersArray.push(orderData);
    localStorage.setItem('bills', JSON.stringify(ordersArray));
    deleteCart();
    showMessage("Cảm ơn bạn đã mua hàng tại thegioilaptop.com", "success-message", '<i class="fa-solid fa-cart-plus">');
    loginData = JSON.parse(localStorage.getItem("loginData"));
    cartInfo = loginData.cart;
    loadCartData();
}

function deleteCart() {
    var loginData = JSON.parse(localStorage.getItem("loginData"));
    var userData = JSON.parse(localStorage.getItem(loginData.userName));

    loginData.cart = [];
    userData.cart = [];

    localStorage.setItem("loginData", JSON.stringify(loginData));
    localStorage.setItem(loginData.userName, JSON.stringify(userData));
}

function checkBillInfo() {
     var name = document.getElementById('name').value;
     var phone = document.getElementById('phone').value;
     var city = document.getElementById('city').value;
     var district = document.getElementById('district').value;
     var ward = document.getElementById('ward').value;

     if (name === '' || phone === '' || city === '' || district === '' || ward === '') {
         return false;
     }

     var genderMale = document.getElementById('gender-male').checked;
     var genderFemale = document.getElementById('gender-female').checked;
     if (!genderMale && !genderFemale) {
         alert('Vui lòng chọn giới tính.');
         return false;
     }

     var shipGiao = document.getElementById('ship-giao').checked;
     var shipNhan = document.getElementById('ship-nhan').checked;
     if (!shipGiao && !shipNhan) {
         alert('Vui lòng chọn cách thức nhận hàng.');
         return false;
     }

     return true;
}

function createBill() {
    event.preventDefault();
    if (!checkBillInfo()) {
        alert('Vui lòng điền đầy đủ thông tin và chọn các lựa chọn.');
        return;
    }
    saveBillData();
}
