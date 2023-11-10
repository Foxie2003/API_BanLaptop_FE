var slideIndexProduct = 0;
localStorage.setItem("current-product-id", window.location.href.split('?id=')[1]);
var productId = localStorage.getItem("current-product-id");
var productData;
var imgs = [];
var descs;
function loadData() {
    const products = JSON.parse(localStorage.getItem("sanpham"));
    var haveProduct = false;
    for (const productType in products) {
        for (const band in products[productType]) {
            for (var i = 0; i < products[productType][band].length; i++) {
                var id = products[productType][band][i].id;
                if(productId == id) {
                    haveProduct = true;
                    productData = products[productType][band][i];
                    if(products[productType][band][i].video != "linkVideo" && products[productType][band][i].video != null) {
                        imgs.push(`<iframe width="100%" height="340px" src="${products[productType][band][i].video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`)
                    }
                    for (let index = 1; index < products[productType][band][i].images.length; index++) {
                        imgs.push(
                            `<img
                            src="${products[productType][band][i].images[index]}" id="zoomImg">`
                            );
                    }
                    break;
                }
            }
        }
    }
    if (!haveProduct) {
        alert("Sản phẩm không tồn tại");
        return;
    }
    var names = document.getElementsByClassName("product-name");
    for (let index = 0; index < names.length; index++) {
        names[index].textContent = productData.name;
    }
    document.getElementById("title").textContent = productData.name;
}
function loadDesc() {
    descs = productData.desc;
    if(descs != null) {
        document.getElementById("product-desc-header").innerHTML = "";
        document.getElementById("product-desc-header").innerHTML = descs.header;
        descs.body.forEach(info => {
            document.getElementById("product-desc-body").innerHTML += "<li>" + info + "</li>";
        });
    }
    else {
        document.getElementById("btn-showMoreDesc").style.display = "none"
    }
}
function loadPrice() {
    const format = new Intl.NumberFormat({ maximumSignificantDigits: 3 });
    document.getElementById("price-panel").innerHTML = 
    `<div class="price-new">${format.format(productData.price)}₫ *</div>
    <div class="price-old">${format.format(productData.old_price)}₫</div>
    <div class="price-sale-percent">-${Math.round((productData.old_price - productData.price) / productData.old_price * 100)}%</div>
    <div class="price-installment">Trả góp 0%</div>`;
}
function loadSpec() {
    if(productData.specs != null) {
        document.getElementById("cpu").innerText = productData.specs.cpu;
        document.getElementById("ram").innerText = productData.specs.ram;
        document.getElementById("disk").innerText = productData.specs.disk;
        document.getElementById("screen").innerText = productData.specs.screen;
        document.getElementById("gpu").innerText = productData.specs.gpu;
        document.getElementById("port").innerText = productData.specs.port;
        document.getElementById("os").innerText = productData.specs.os;
        document.getElementById("size").innerText = productData.specs.size;
    }
    else {
        document.getElementById("desc-panel").style.display = "none";
    }
}
function showDescBody() {
    var descBody = document.getElementById("product-desc-body");
    if(descBody.offsetHeight > 200) {
        descBody.style.height = "200px";
        document.getElementById("btn-showMoreDesc").innerHTML = 
        `Xem thêm
        <i class="fa-solid fa-caret-down fa-sm"></i>`;
    }
    else {
        descBody.style.height = "auto";
        document.getElementById("btn-showMoreDesc").innerHTML = 
        `Thu gọn
        <i class="fa-solid fa-caret-up fa-sm"></i>`;
    }
}
function zoomSlideProduct() {
    $('#zoomImg').extm({
        position: 'right',
        rightPad: 5,
        squareOverlay: true,
        zoomSize: 2000,
    });
}

function showSlideProduct() {
    var slide = document.getElementById("product-details-slide");
    slide.innerHTML = imgs[slideIndexProduct];
    zoomSlideProduct();
    
}
function nextSlideProduct() {
    var slide = document.getElementById("product-details-slide");
    slideIndexProduct++;
    if(slideIndexProduct == imgs.length) {
        slideIndexProduct = 0;
    }
    slide.innerHTML = imgs[slideIndexProduct];
    zoomSlideProduct();
}
function backSlideProduct() {
    var slide = document.getElementById("product-details-slide");
    slideIndexProduct--;
    if(slideIndexProduct == -1) {
        slideIndexProduct = imgs.length - 1;
    }
    slide.innerHTML = imgs[slideIndexProduct];
    zoomSlideProduct();
}

// Add to cart
function addToCart() {
    var loginData = JSON.parse(localStorage.getItem("loginData"));
    if(loginData != null) {
        var userData = JSON.parse(localStorage.getItem(loginData.userName));
        var inCart = false;
        
        for (let index = 0; index < loginData.cart.length; index++) {
            if(loginData.cart[index].product.id == productData.id) {
                inCart = true;

                loginData.cart[index].quantity += 1;

                localStorage.setItem("loginData", JSON.stringify(loginData));
                localStorage.setItem(loginData.userName, JSON.stringify(loginData));
                
                // alert("Sản phẩm đã có trong giỏ hàng");
                showMessage("Sản phẩm đã có trong giỏ hàng" + `<a href="cart.html">[Đến giỏ hàng]</a>`, "success-message", '<i class="fa-solid fa-cart-plus">');
                break;
            }
        }
        if (!inCart) {
            var cartData = {
                product :  productData,
                quantity : 1
            };

            loginData.cart.push(cartData);
            userData.cart.push(cartData);

            localStorage.setItem("loginData", JSON.stringify(loginData));
            localStorage.setItem(loginData.userName, JSON.stringify(userData));
            // alert("Sản phẩm đã được thêm vào giỏ hàng");
            showMessage("Sản phẩm đã được thêm vào giỏ hàng" + `<a href="cart.html">[Đến giỏ hàng]</a>`, "success-message", '<i class="fa-solid fa-cart-plus">');
        }
        showProductInCart();
    }
    else {
        // alert("Vui lòng đăng nhập trước khi mua hàng");
        showQuestion(
            "Bạn chưa đăng nhập!", 
            "Bạn vẫn có muốn chuyển hướng đến trang đăng nhập không?", 
            '<i class="fa-regular fa-circle-question"></i>', 
            "window.location.href = 'sign-up-sign-in.html'", 
            "hideQuestion();");
    }
}

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
    }, 5250);
}

function hideMessage() {
    var messagePanel = document.getElementById("message-panel");
    messagePanel.innerHTML = "";
}

function showQuestion(title, question, icon, yesFunc, noFunc) {
    var questionPanel = document.getElementById("question-panel");
    questionPanel.style.display = "flex";
    questionPanel.innerHTML = `
    <div class="question-box">
        <div class="question-title">${title}<i class="fa-solid fa-xmark" onclick="hideQuestion();"></i></div>
        <div class="question-content">
            <div class="question-icon">${icon}</div>
            <div class="question">${question}</div>
        </div>
        <div class="question-button-panel">
            <div class="question-button" id="question-button-yes" onclick="${yesFunc}">Có</div>
            <div class="question-button" id="question-button-no" onclick="${noFunc}">Không</div>
        </div>
    </div>`;
}

function hideQuestion() {
    var questionPanel = document.getElementById("question-panel");
    questionPanel.style.display = "none";
}

function loadAcessoryProduct() {
    const products = JSON.parse(localStorage.getItem("sanpham"));
    var productArr = [];
    for (const property in products.phukien) {
        for (var i = 0; i < products.phukien[property].length; i++){
            const format = new Intl.NumberFormat({ maximumSignificantDigits: 3 });
            productArr.push(`<div class="product-item col-2-4 col-s-6" onclick="showDetails('${products.phukien[property][i].id.trim()}')">
            <div class="sale-percent">
            -${Math.round((products.phukien[property][i].old_price - products.phukien[property][i].price) / products.phukien[property][i].old_price * 100)}%
            <i class="fa-solid fa-tag fa-xl"></i></div>
            <img class="product-img" src="` + products.phukien[property][i].images[0] + `" alt="">
            <div class="title">` + products.phukien[property][i].name.split("/")[0] + `</div>
            <div class="price">` + format.format(products.phukien[property][i].price) + `₫</div>
            <div class="price-old">` + format.format(products.phukien[property][i].old_price) + `₫</div>
            </div>`);
        };
    }
    shuffleArray(productArr);
    productArr.forEach(content => {
        document.getElementById("accessory-products").innerHTML += content;
    });
}

// Knuth Shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Tạo một chỉ số ngẫu nhiên từ 0 đến i
        const j = Math.floor(Math.random() * (i + 1));

        // Hoán đổi giá trị của hai phần tử
        [array[i], array[j]] = [array[j], array[i]];
    }
}