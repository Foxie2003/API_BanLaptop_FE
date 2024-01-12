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

function showRatingCount() {
    var ratingCount = document.getElementsByClassName("rating-count");
    for (let index = 0; index < ratingCount.length; index++) {
        ratingCount[index].textContent = productData.rating.length + " đánh giá";
    }
}

function showRating() {
    showRatingCount();
    document.getElementById("btn-showMoreRating").textContent = "Xem " + productData.rating.length + " đánh giá"
    var ratingPanel = document.querySelector(".rating-list");
    ratingPanel.innerHTML = "";
    for (let index = productData.rating.length - 1; index >= 0; index--) {
        if(index > productData.rating.length - 4) {
            ratingPanel.innerHTML +=
            `<div class="rating-item">
                <div class="rating-item-name">${productData.rating[index].userName}</div>
                <div class="rating-item-rate">
                    <i class="fa-solid fa-star fa-xs" style="color: #fb6e2e;"></i>
                    <i class="fa-solid fa-star fa-xs" style="color: #fb6e2e;"></i>
                    <i class="fa-solid fa-star fa-xs" style="color: #fb6e2e;"></i>
                    <i class="fa-solid fa-star fa-xs" style="color: #fb6e2e;"></i>
                    <i class="fa-solid fa-star fa-xs" style="color: #e0e0e0;"></i>
                </div>
                <div class="rating-item-comment">
                    ${productData.rating[index].comment}
                </div>
                <div class="rating-item-bottom">
                    <i class="fa-regular fa-thumbs-up fa-sm" style="margin-right: 4px; cursor: pointer;"></i>
                    <span>Hữu ích</span>
                    <div>${productData.rating[index].dateTime}</div>
                </div>
            </div>`;
        }
        else break;
    }
}

function showAllRating() {
    var btnShowRating = document.getElementById("btn-showMoreRating");
    var ratingPanel = document.querySelector(".rating-list");
    if(btnShowRating.textContent != "Thu gọn") {
        ratingPanel.innerHTML = "";
        for (let index = productData.rating.length - 1; index >= 0; index--) {
            ratingPanel.innerHTML +=
            `<div class="rating-item">
                <div class="rating-item-name">${productData.rating[index].userName}</div>
                <div class="rating-item-rate">
                    <i class="fa-solid fa-star fa-xs" style="color: #fb6e2e;"></i>
                    <i class="fa-solid fa-star fa-xs" style="color: #fb6e2e;"></i>
                    <i class="fa-solid fa-star fa-xs" style="color: #fb6e2e;"></i>
                    <i class="fa-solid fa-star fa-xs" style="color: #fb6e2e;"></i>
                    <i class="fa-solid fa-star fa-xs" style="color: #e0e0e0;"></i>
                </div>
                <div class="rating-item-comment">
                    ${productData.rating[index].comment}
                </div>
                <div class="rating-item-bottom">
                    <i class="fa-regular fa-thumbs-up fa-sm" style="margin-right: 4px; cursor: pointer;"></i>
                    <span>Hữu ích</span>
                    <div>${productData.rating[index].dateTime}</div>
                </div>
            </div>`;
        }
        btnShowRating.textContent = "Thu gọn";
    }
    else {
        showRating();
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
    // var cart = JSON.parse(localStorage.getItem("cart")) || [];
    // var inCart = false;
    
    // for (let index = 0; index < cart.length; index++) {
    //     if(cart[index].product.id == productData.id) {
    //         inCart = true;

    //         cart[index].quantity += 1;

    //         localStorage.setItem("cart", JSON.stringify(cart));
            
    //         // alert("Sản phẩm đã có trong giỏ hàng");
    //         showMessage("Sản phẩm đã có trong giỏ hàng" + `<a href="cart.html">[Đến giỏ hàng]</a>`, "success-message", '<i class="fa-solid fa-cart-plus">');
    //         break;
    //     }
    // }
    // if (!inCart) {
    //     var cartData = {
    //         product :  productData,
    //         quantity : 1
    //     };

    //     cart.push(cartData);

    //     localStorage.setItem("cart", JSON.stringify(cart));
    //     // alert("Sản phẩm đã được thêm vào giỏ hàng");
    //     showMessage("Sản phẩm đã được thêm vào giỏ hàng" + `<a href="cart.html">[Đến giỏ hàng]</a>`, "success-message", '<i class="fa-solid fa-cart-plus">');
    // }
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
    }, 3250);
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

// Mouse over on rating stars
function starMouseOver(score) {
    var panel = document.querySelector(".rating-box-rate-panel");
    var stars = panel.querySelectorAll(".fa-star");
    var rating = panel.querySelectorAll("p");
    for (var i = 0; i < stars.length; i++) {
        if (i < score) {
            stars[i].classList.replace("fa-regular", "fa-solid")
        }
        else {
            stars[i].classList.replace("fa-solid", "fa-regular")
        }
        rating[i].style.fontWeight = "normal"
    }
    rating[score - 1].style.fontWeight = "bold"
}

function checkBoxRating() {
    var checkBox = document.getElementById("chk-rating");
    var button = document.getElementById("btn-rating");
    if(checkBox.checked) {
        button.style.opacity = "1";
        button.style.cursor = "pointer";
    }
    else {
        button.style.opacity = "0.5";
        button.style.cursor = "not-allowed";
    }
}

function showRatingBox() {
    var box = document.querySelector(".rating-box");
    box.style.display = "flex"
    box.innerHTML =
    `<div class="rating-box-content">
        <i class="fa-solid fa-xmark" style="height: 0; align-self: flex-end; font-size: 24px;" onclick="hideRatingBox();"></i>
        <div class="rating-box-header">Đánh giá sản phẩm</div>
        <img class="rating-box-product-img" src="./assets/img/asus-tuf-gaming-f15-fx506he-i7-hn378w-thumb-600x600.jpg"></img>
        <div class="rating-box-product-name">Laptop HP 15s fq5229TU i3 1215U/8GB/512GB/Win11 (8U237PA)</div>
        <div class="rating-box-rate-panel">
            <div class="rate-panel-item" onmouseover="starMouseOver(1)">
                <i class="fa-regular fa-star"></i>
                <p>Rất tệ</p>
            </div>
            <div class="rate-panel-item" onmouseover="starMouseOver(2)">
                <i class="fa-regular fa-star"></i>
                <p>Tệ</p>
            </div>
            <div class="rate-panel-item" onmouseover="starMouseOver(3)">
                <i class="fa-regular fa-star"></i>
                <p>Tạm ổn</p>
            </div>
            <div class="rate-panel-item" onmouseover="starMouseOver(4)">
                <i class="fa-regular fa-star"></i>
                <p>Tốt</p>
            </div>
            <div class="rate-panel-item" onmouseover="starMouseOver(5)">
                <i class="fa-regular fa-star"></i>
                <p>Rất tốt</p>
            </div>
        </div>
        <label> Nội dung: </label>
        <textarea rows="8" placeholder="Mời bạn chia sẻ thêm cảm nhận" class="rating-comment"></textarea>
        <label style="font-size: 16px;"><input type="checkbox" id="chk-rating" onchange="checkBoxRating()"> Tôi đồng ý với <a href="#">Quy định đánh giá</a> & <a href="#">Chính sách bảo mật thông tin</a>: </label>
        <button id="btn-rating" onclick="sendRating();">Gửi đánh giá</button>
    </div>`;
}

function hideRatingBox() {
    var box = document.querySelector(".rating-box");
    box.style.display = "none"
    box.innerHTML = "";
}

function sendRating() {
    // Check if any infomation is missing
    var checkBox = document.getElementById("chk-rating");
    if(checkBox.checked) {
        var panel = document.querySelector(".rating-box-rate-panel");
        var stars = panel.querySelectorAll(".fa-solid.fa-star");
        var score = stars.length;
        if(score > 0 && score < 6) {
            var loginData = JSON.parse(localStorage.getItem("loginData"));
            if(loginData != null) {
                var ratingComment = document.querySelector(".rating-comment");
                var currentTime = new Date();
                var ratingData = {
                    userName: loginData.userName.split("@")[0],
                    score: score,
                    comment: ratingComment.value,
                    dateTime: `${(currentTime.getHours() < 10 ? "0" : "") +currentTime.getHours()}:${(currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes()} ${currentTime.getDate()}/${currentTime.getMonth()}/${currentTime.getFullYear()}`
                };
                productData.rating.push(ratingData);
                const products = JSON.parse(localStorage.getItem("sanpham"));
                for (const productType in products) {
                    for (const band in products[productType]) {
                        for (var i = 0; i < products[productType][band].length; i++) {
                            var id = products[productType][band][i].id;
                            if(productId == id) {
                                products[productType][band][i] = productData;
                                localStorage.setItem("sanpham", JSON.stringify(products));
                                break;
                            }
                        }
                    }
                }
                showMessage("Cảm ơn bạn đã đánh giá sản phẩm", "success-message", '<i class="fa-regular fa-face-smile-wink"></i>');
                showRating();
                hideRatingBox();
            }
            else {
                showMessage("Vui lòng đăng nhập để đánh giá sản phẩm", "fail-message", '<i class="fa-solid fa-circle-exclamation"></i>');
            }
        }
        else {
            showMessage("Vui lòng chọn số sao muốn đánh giá", "fail-message", '<i class="fa-solid fa-circle-exclamation"></i>');
        }
    }
}