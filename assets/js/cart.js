var loginData = JSON.parse(localStorage.getItem("loginData"));
var cartInfo = loginData.cart;
function loadCartData() {
    if(cartInfo.length <= 0) {
        alert("Giỏ hàng trống \nHãy tiếp tục mua sắm nhé <3")
        document.getElementById("cart-info").innerHTML = 
        `<p style="font-size: 32px; font-weight: bold; color: #333; width: 100%; text-align: center; margin:200px 0;">Không có sản phẩm nào trong giỏ</p>`;
        // window.location.href = "home-page.html";
    }
    else {
        document.getElementById("cart-info").innerHTML = "";
        const format = new Intl.NumberFormat({ maximumSignificantDigits: 3 });
        var priceSum = 0;
        cartInfo.forEach(productInfo => {
            document.getElementById("cart-info").innerHTML +=
            `<div class="cart-info-item">
            <div class="img-panel">
                <img src="${productInfo.product.images[0]}" alt="">
                <button><i class="fa-regular fa-trash-can fa-sm"></i> Xóa</button>
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

