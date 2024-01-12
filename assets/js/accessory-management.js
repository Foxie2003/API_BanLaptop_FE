const priceFormat = new Intl.NumberFormat({ maximumSignificantDigits: 3 });
// var accessoriesData = null;
function showSubItems(subPanelId) {
    var menu = document.getElementById("menu");
    var admin = document.querySelector(".admin-panel-right");
    menu.classList.replace("hide-menu", "show-menu");
    menu.style.width = "20%";
    admin.style.width = "80%";
    var panel = document.getElementById(subPanelId);
    if (!panel.classList.contains("show-sub-items")) {
        panel.style.display = "block";
        panel.classList.add("show-sub-items");
        panel.classList.remove("hide-sub-items");
    }
    else {
        panel.classList.replace("show-sub-items", "hide-sub-items");
        setTimeout(function () {
            panel.style.display = "none";
        }, 200);
    }
}

function showMenu() {
    var menu = document.getElementById("menu");
    var admin = document.querySelector(".admin-panel-right");
    if (menu.classList.contains("show-menu")) {
        menu.classList.replace("show-menu", "hide-menu");
        setTimeout(function () {
            // menu.style.display = "none";
            admin.style.width = "100%";
            menu.style.width = "45px";
        }, 300);
    }
    else {
        menu.classList.replace("hide-menu", "show-menu");
        menu.style.width = "20%";
        admin.style.width = "80%";
    }
}

function printDivContent(divId) {
    const content = document.getElementById(divId).outerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<html>
    <head>
    <title>Print</title>
    <link rel="stylesheet" href="assets/css/admin.css">
    <style>
        #admin-table {
            overflow: visible;
        }
        tr > th:last-child, tr > td:last-child {
            display: none;
        }
    </style>
    </head>
    <body>`);
    printWindow.document.write(`<h1 style="text-align: center;">Danh sách phụ kiện</h1>`);
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    setTimeout(() => {
        printWindow.print();
    }, 500);
}

var currentPage = 1;
var productPerPage = 15;
var totalPage = Math.ceil(getAccessoriesData().length / productPerPage);

var sortById = 1;
var sortByName = 0;
var sortByNewPrice = 0;
var sortByOldPrice = 0;
var sortByQuantity = 0;


function getAccessoriesData() {
    var storage = JSON.parse(localStorage.getItem("sanpham"));
    var accessories = [];
    var searchInput = document.querySelector("#search-product-name");
    var searchValue = searchInput != null ? searchInput.value.trim().toUpperCase() : "";
    for (const band in storage.phukien) {
        storage.phukien[band].forEach(product => {
            accessories.push(product);
        });
    }
    accessories.sort((a, b) => {
        var idA = parseInt(a.id.replace("SP", ""));
        var idB = parseInt(b.id.replace("SP", ""));

        return idA - idB;
    });
    if (sortById == -1) {
        accessories.sort((a, b) => {
            var idA = parseInt(a.id.replace("SP", ""));
            var idB = parseInt(b.id.replace("SP", ""));
    
            return idB - idA;
        });
    }

    else if (sortByName == 1) {
        accessories.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            // So sánh hai chuỗi "name"
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    }
    else if (sortByName == -1) {
        accessories.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            // So sánh hai chuỗi "name"
            if (nameA < nameB) {
                return 1;
            }
            if (nameA > nameB) {
                return -1;
            }
            return 0;
        });
    }
    else if (sortByNewPrice == 1) {
        accessories.sort((a, b) => {
            const priceA = a.price;
            const priceB = b.price;
            return priceA - priceB;
        });
    }
    else if (sortByNewPrice == -1) {
        accessories.sort((a, b) => {
            const priceA = a.price;
            const priceB = b.price;
            return priceB - priceA;
        });
    }
    else if (sortByOldPrice == 1) {
        accessories.sort((a, b) => {
            const priceA = a.old_price;
            const priceB = b.old_price;
            return priceA - priceB;
        });
    }
    else if (sortByOldPrice == -1) {
        accessories.sort((a, b) => {
            const priceA = a.old_price;
            const priceB = b.old_price;
            return priceB - priceA;
        });
    }
    else if (sortByQuantity == 1) {
        accessories.sort((a, b) => {
            const quantityA = a.quantity;
            const quantityB = b.quantity;
            return quantityA - quantityB;
        });
    }
    else if (sortByQuantity == -1) {
        accessories.sort((a, b) => {
            const quantityA = a.quantity;
            const quantityB = b.quantity;
            return quantityB - quantityA;
        });
    }

    if(searchValue != "") {
        const filteredAccessories = accessories.filter(accessorie =>
            accessorie.name.trim().toUpperCase().includes(searchValue)
        );
        return filteredAccessories;
    }
    return accessories;
}

function setCurrentPage(page) {
    if (page > 0 && page <= totalPage) {
        currentPage = page;
        showDataTableAccessory(getAccessoriesData());
    }
}

function getCurrentPage() {
    return currentPage;
}
function getTotalPage() {
    return totalPage;
}
function showDataTableAccessory(data) {
    data = data || [];
    document.getElementById("totalPage").textContent = "/ " + totalPage;
    document.getElementById("currentPage").value = currentPage;
    var tableData = document.getElementById("admin-table-data");
    tableData.innerHTML = "";
    var productToShow = data.splice((currentPage - 1) * productPerPage, productPerPage);
    productToShow.forEach(product => {
        tableData.innerHTML +=
            `
                <tr>
                    <td>
                        ${product.id}
                    </td>
                    <td style="max-width: 350px; overflow: hidden; text-overflow: ellipsis;">
                        ${product.name}
                    </td>
                    <td>
                        <img class="table-image" src="${product.images[0]}" alt="">
                    </td>
                    <td>
                        ${priceFormat.format(product.price)}₫
                    </td>
                    <td>
                        ${priceFormat.format(product.old_price)}₫
                    </td>
                    <td>
                        ${priceFormat.format(product.quantity)}
                    </td>
                    <td>
                        <div style="display: flex;">
                            <div class="table-button" onclick="showProductDetails('${product.id}');">
                                <i class="fa-solid fa-eye"></i>
                            </div>
                            <div class="table-button" onclick="showEditDetals('${product.id}');">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div class="table-button" onclick="showDeleteDetals('${product.id}')">
                                <i class="fa-solid fa-trash"></i>
                            </div>
                        </div>
                    </td>
                </tr>`
    });
}

function showProductDetails(id) {
    var panel = document.querySelector(".product-detail");
    panel.style.display = "flex";
    var iframe = document.getElementById("product-iframe");
    iframe.setAttribute("src", "product-details.html?id=" + id);
}

function showEditDetals(id) {
    var panel = document.querySelector(".edit-detail");
    panel.innerHTML = `<i class="fa-solid fa-rectangle-xmark" onclick='hideEditDetals()'></i>
    <div class="edit-detail-panel">
        <div class="edit-detail-header">
            Chỉnh sửa thông tin sản phẩm
        </div>
        <form class="edit-detail-form">
            <label for="product-id">ID:</label>
            <input type="text" id="product-id" placeholder="SP01" readonly>
            <label for="product-name">Tên:</label>
            <input type="text" id="product-name" placeholder="Chuột Không dây Rapoo B2">
            <label for="product-band">Loại:</label>
            <select id="product-band">
                <option value="mouse">Chuột</option>
                <option value="keyboard">Bàn phím</option>
                <option value="gamepad">Tay cầm chơi game</option>
            </select>
            <div class="detail-image">
                <!-- TODO: CUSTOM THIS TO SHOW IMAGE -->
                <!-- <label for="product-image" style="float: left;">Hình ảnh:</label>
                <div class="product-image-container">
                    <div class="product-image-hover">
                        <i class="fa-solid fa-circle-xmark" onclick="deleteProductImage(this)"></i>
                        <i class="fa-solid fa-plus"></i>
                    </div>
                    <img src="./assets/img/acer/acer-aspire-3-a315-58-589k-i5-nxam0sv008/vi-vn-acer-aspire-3-a315-58-589k-i5-nxam0sv008--(1).jpg" alt="">
                </div>
                <div class="product-image-container">
                    <div class="product-image-hover" style="display: flex; opacity: 0.4;">
                        <i class="fa-solid fa-circle-xmark" style="display: none"></i>
                        <i class="fa-solid fa-plus"></i>
                    </div>
                    <img style="opacity: 0;" src="./assets/img/acer/acer-aspire-3-a315-58-589k-i5-nxam0sv008/vi-vn-acer-aspire-3-a315-58-589k-i5-nxam0sv008--(1).jpg" alt="">
                </div>
                <input id="imageInput" type="file" onchange="previewImage()" class="product-image" accept="image/*"> -->
            </div>

            <label for="product-new-price">Giá mới:</label>
            <input type="text" oninput="formatInputNumber(this)" id="product-new-price" placeholder="100,000,000">
            <label for="product-old-price">Giá cũ:</label>
            <input type="text" oninput="formatInputNumber(this)" id="product-old-price" placeholder="150,000,000">
            <label for="product-quantity">Số lượng:</label>
            <input type="text" oninput="formatInputNumber(this)" id="product-quantity" placeholder="10,000">
            <div class="detail-nav">
                <button class="form-button" onclick="editDetals()">Lưu</button>
                <button class="form-button" onclick="hideEditDetals()">Hủy</button>
            </div>
        </form>
    `;
    var productID = document.getElementById("product-id");
    var productName = document.getElementById("product-name");
    var productImages = document.querySelector(".detail-image");
    var productNewPrice = document.getElementById("product-new-price");
    var productOldPrice = document.getElementById("product-old-price");
    var productQuantity = document.getElementById("product-quantity");
    var productData = "";
    var ImagesData = "";

    panel.style.display = "flex";
    getAccessoriesData().forEach(product => {
        if (product.id == id) {
            productData = product;
            return;
        }
    });
    productID.value = productData.id;
    productName.value = productData.name;
    for (var i = 0; i < productData.images.length; i++) {
        ImagesData +=
            `<div class="product-image-container">
            <div class="product-image-hover" onclick="addProductImage(this);">
                <i class="fa-solid fa-circle-xmark" onclick="deleteProductImage(this)"></i>
                <i class="fa-solid fa-plus"></i>
            </div>
            <img src="${productData.images[i]}" alt="">
            <input type="file" onchange="setImageLink(this)" class="product-image" accept="image/*">
        </div>`;
    }
    ImagesData +=
                `<div class="product-image-container">
            <div class="product-image-hover" style="display: flex; opacity: 0.4; width: 250px; height: 180px;" onclick="addProductImage(this);">
                <i class="fa-solid fa-circle-xmark" style="display: none" onclick="deleteProductImage(this)"></i>
                <i class="fa-solid fa-plus"></i>
            </div>
            <img src="" alt="">
            <input type="file" onchange="setImageLink(this)" class="product-image" accept="image/*">
        </div>`;
    productImages.innerHTML =
        `<label for="product-image" style="float: left;">Hình ảnh:</label>
    ${ImagesData}`;
    productNewPrice.value = priceFormat.format(productData.price);
    productOldPrice.value = priceFormat.format(productData.old_price);
    productQuantity.value = productData.quantity;
}

function addDetals() {
    event.preventDefault();
    var productID = document.getElementById("product-id");
    var productName = document.getElementById("product-name");
    var productImages = document.querySelector(".detail-image");
    var productBand = document.getElementById("product-band");
    var productNewPrice = document.getElementById("product-new-price");
    var productOldPrice = document.getElementById("product-old-price");
    var productQuantity = document.getElementById("product-quantity");

    var imagesData = [];
    var imageContainers = productImages.querySelectorAll(".product-image-container");
    imageContainers.forEach(imageContainer => {
        var imageURL = imageContainer.querySelector("img").getAttribute("src");
        if(imageURL != "") {
            imagesData.push(imageURL);
        }
    });

    addAccessoryObj(createAccessoryObj(productID.value, productName.value,
        imagesData, productNewPrice.value.replaceAll(",", ""), productOldPrice.value.replaceAll(",", ""),
        productQuantity.value.replaceAll(",", "")), productBand.value);
}

function editDetals() {
    event.preventDefault();
    var productID = document.getElementById("product-id");
    var productName = document.getElementById("product-name");
    var productImages = document.querySelector(".detail-image");
    var productNewPrice = document.getElementById("product-new-price");
    var productOldPrice = document.getElementById("product-old-price");
    var productQuantity = document.getElementById("product-quantity");
    var imagesData = [];
    var imageContainers = productImages.querySelectorAll(".product-image-container");
    imageContainers.forEach(imageContainer => {
        var imageURL = imageContainer.querySelector("img").getAttribute("src");
        if(imageURL != "") {
            imagesData.push(imageURL);
        }
    });

    editAccessoryObj(createAccessoryObj(productID.value, productName.value,
        imagesData, productNewPrice.value.replaceAll(",", ""), productOldPrice.value.replaceAll(",", ""),
        productQuantity.value.replaceAll(",", "")), productID.value);
}

function hideEditDetals() {
    event.preventDefault();
    var panel = document.querySelector(".edit-detail");
    panel.style.display = "none";
    panel.innerHTML = "";
}

function addProductImage(button) {
    var imageInput = button.parentElement.querySelector(".product-image");
    imageInput.click();
}

function setImageLink(button) {
    var imageInput = button.parentElement.querySelector(".product-image");
    var link = "";
    const selectedFiles = imageInput.files;
    if (selectedFiles.length > 0) {
        const selectedFile = selectedFiles[0];
        link = "./assets/img/" + selectedFile.name;
        showImageAddProduct(button, link);
    }
}

function showSearchProduct() {
    var panel = document.querySelector(".search-box");
    panel.innerHTML =
        `<i class="fa-solid fa-rectangle-xmark" onclick='hideSearchProduct()'></i>
        <div class="search-box-panel">
            <div class="add-product-header">
                Tìm kiếm sản phẩm
            </div>
            <form class="add-product-form">
                <label for="product-name">Tên:</label>
                <input type="text" id="search-product-name" placeholder="Chuột Không dây Rapoo B2">
                <div class="detail-nav">
                    <button class="form-button" onclick="searchProduct(event)">Tìm kiếm</button>
                    <button class="form-button" onclick="hideSearchProduct()">Hủy</button>
                </div>
            </form>
        </div>`;
    panel.style.display = "flex";
}

function hideSearchProduct() {
    var panel = document.querySelector(".search-box");
    panel.style.display = "none";
    panel.innerHTML = "";
}

function showAddProduct() {
    var panel = document.querySelector(".add-product");
    panel.innerHTML =
        `<i class="fa-solid fa-rectangle-xmark" onclick='hideAddProduct()'></i>
    <div class="add-product-panel">
        <div class="add-product-header">
            Thêm sản phẩm
        </div>
        <form class="add-product-form">
            <label for="product-id">ID:</label>
            <input type="text" id="product-id" placeholder="SP01" readonly>
            <label for="product-name">Tên:</label>
            <input type="text" id="product-name" placeholder="Chuột Không dây Rapoo B2">
            <label for="product-band">Loại:</label>
            <select id="product-band">
                <option value="mouse">Chuột</option>
                <option value="keyboard">Bàn phím</option>
                <option value="gamepad">Tay cầm chơi game</option>
            </select>
            <div class="detail-image">
                <!-- TODO: CUSTOM THIS TO SHOW IMAGE -->
                <!-- <label for="product-image" style="float: left;">Hình ảnh:</label>
                <div class="product-image-container">
                    <div class="product-image-hover" style="display: flex; opacity: 0.4; width: 250px; height: 180px;" onclick="addProductImage(this);">
                        <i class="fa-solid fa-circle-xmark" style="display: none"></i>
                        <i class="fa-solid fa-plus"></i>
                    </div>
                    <img src="" alt="">
                    <input type="file" onchange="setImageLink(this)" class="product-image" accept="image/*">
                </div> -->
            </div>

            <label for="product-new-price">Giá mới:</label>
            <input type="text" oninput="formatInputNumber(this)" id="product-new-price" placeholder="100,000,000">
            <label for="product-old-price">Giá cũ:</label>
            <input type="text" oninput="formatInputNumber(this)" id="product-old-price" placeholder="150,000,000">
            <label for="product-quantity">Số lượng:</label>
            <input type="text" oninput="formatInputNumber(this)" id="product-quantity" placeholder="10,000">
            <div class="detail-nav">
                <button class="form-button" onclick="addDetals()">Lưu</button>
                <button class="form-button" onclick="hideAddProduct()">Hủy</button>
            </div>
        </form>
    </div>`;
    var productImages = document.querySelectorAll(".detail-image");
    panel.style.display = "flex";
    productImages.forEach(item => {
        item.innerHTML =
            `<label for="product-image" style="float: left;">Hình ảnh:</label>
        <div class="product-image-container">
            <div class="product-image-hover" style="display: flex; opacity: 0.4; width: 250px; height: 180px;" onclick="addProductImage(this);">
                <i class="fa-solid fa-circle-xmark" style="display: none" onclick="deleteProductImage(this)"></i>
                <i class="fa-solid fa-plus"></i>
            </div>
            <img src="" alt="">
            <input type="file" onchange="setImageLink(this)" class="product-image" accept="image/*">
        </div>`;
    });
    document.getElementById("product-id").value = autoGenerateProductId();
}

function hideAddProduct() {
    var panel = document.querySelector(".add-product");
    panel.style.display = "none";
    panel.innerHTML = "";
}

function showImageAddProduct(button, imageURL) {
    var productImages = document.querySelector(".detail-image");
    var imageData = button.parentElement.querySelector("img");
    var imageDataSrc = imageData.getAttribute('src');
    var hoverPanel = button.parentElement.querySelector(".product-image-hover");
    var closeButton = hoverPanel.querySelector(".fa-solid");
    imageData.src = imageURL;
    button.parentElement.style = "";
    hoverPanel.style = "";
    closeButton.style = "";
    if (imageDataSrc == "") {
        productImages.innerHTML +=
            `<div class="product-image-container">
            <div class="product-image-hover" style="display: flex; opacity: 0.4; width: 250px; height: 180px;" onclick="addProductImage(this);">
                <i class="fa-solid fa-circle-xmark" style="display: none" onclick="deleteProductImage(this)"></i>
                <i class="fa-solid fa-plus"></i>
            </div>
            <img src="" alt="">
            <input type="file" onchange="setImageLink(this)" class="product-image" accept="image/*">
        </div>`;
    }
}

function deleteProductImage(button) {
    event.stopPropagation();
    var productImages = document.querySelector(".detail-image");
    productImages.removeChild(button.parentElement.parentElement);
}

function toggleFullScreen() {
    if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) {
        // Đã ở chế độ toàn màn hình, thoát khỏi chế độ này
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
    else {
        // Không ở chế độ toàn màn hình, bắt đầu chế độ toàn màn hình
        const element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    }
}

function formatInputNumber(input) {
    var value = input.value.replaceAll(",", "");
    value = priceFormat.format(value);
    if (value != "NaN") {
        input.value = value;
    }
    else {
        showMessage("Vui lòng chỉ nhập số", "fail-message", '<i class="fa-solid fa-triangle-exclamation"></i>');
        input.value = 0;
    }
}

function createAccessoryObj(id, name, images, price, oldPrice, quantity) {
    if (name.trim() === "") {
        showMessage("Tên sản phẩm không được để trống", "fail-message", '<i class="fa-solid fa-triangle-exclamation"></i>');
        return;
    }

    if (images.length == 0) {
        showMessage("Hình sản phẩm không được để trống", "fail-message", '<i class="fa-solid fa-triangle-exclamation"></i>');
        return;
    }

    if (price === "" || price < 0) {
        showMessage("Giá mới của sản phẩm không hợp lệ", "fail-message", '<i class="fa-solid fa-triangle-exclamation"></i>');
        return;
    }

    if (oldPrice === "" || oldPrice < 0 || oldPrice < price) {
        showMessage("Giá cũ của sản phẩm không hợp lệ", "fail-message", '<i class="fa-solid fa-triangle-exclamation"></i>');
        return;
    }

    if (quantity === "" || quantity < 0) {
        showMessage("Giá sản phẩm không hợp lệ", "fail-message", '<i class="fa-solid fa-triangle-exclamation"></i>');
        return;
    }
    var laptopObj = {
        id: `${id}`,
        name: `${name}`,
        images: images,
        price: price,
        old_price: oldPrice,
        quantity: quantity,
    };
    return laptopObj;
}

function getNewProductID() {
    var maxID = 0;
    getAccessoriesData().forEach(product => {
        var productID = product.id.substring(2);
        if (productID > maxID) {
            maxID = productID;
        }
    });
    return "SP" + ++maxID;
}

function addAccessoryObj(accessoryObj, accessoryType) {
    if(accessoryObj == null) {
        return;
    }
    debugger;
    var storage = JSON.parse(localStorage.getItem("sanpham"));
    var accessoryStorage = storage.phukien;
    for(const type in accessoryStorage) {
        if(type == accessoryType) {
            accessoryStorage[type].push(accessoryObj);
            localStorage.setItem("sanpham", JSON.stringify(storage));
            showMessage("Thêm sản phẩm thành công", "success-message", '<i class="fa-regular fa-face-smile"></i>');
            showDataTableAccessory(getAccessoriesData());
            break;
        }
    }
}

function editAccessoryObj(accessoryObj, accessoryID) {
    if(accessoryObj == null) {
        return;
    }
    var storage = JSON.parse(localStorage.getItem("sanpham"));
    var accessoryStorage = storage.phukien;
    for(const type in accessoryStorage) {
        for(var i = 0; i < accessoryStorage[type].length; i++) {
            if(accessoryStorage[type][i].id == accessoryID) {
                accessoryStorage[type][i] = accessoryObj;
                localStorage.setItem("sanpham", JSON.stringify(storage));
                showMessage("Sửa sản phẩm thành công", "success-message", '<i class="fa-regular fa-face-smile"></i>');
                showDataTableAccessory(getAccessoriesData());
                break;
            }
        }
    }
}

function showDeleteDetals(id) {
    var storage = JSON.parse(localStorage.getItem("sanpham"));
    var laptopStorage = storage.phukien;
    for(const band in laptopStorage) {
        for(var i = 0; i < laptopStorage[band].length; i++) {
            if(laptopStorage[band][i].id == id) {
                laptopStorage[band].splice(i, 1);
                localStorage.setItem("sanpham", JSON.stringify(storage));
                showMessage("Xóa sản phẩm thành công", "success-message", '<i class="fa-regular fa-face-smile"></i>');
                showDataTableAccessory(getAccessoriesData());
                break;
            }
        }
    }
}

function checkProductId(productID) {
    var products = JSON.parse(localStorage.getItem("sanpham"));
    var isDuplicate = false;
    for (const type in products) {
        for (const band in products[type]) {
            products[type][band].forEach(product => {
                if(productID == product.id) {
                    isDuplicate = true;
                }
            });
        }
    }
    return !isDuplicate;
}

function autoGenerateProductId() {
    var productId = 0;
    do {
        productId++;
        if(productId < 10) {
            productId = "0" + productId;
        }
    }while(!checkProductId("SP" + productId));
    return "SP" + productId;
}

function sortProductById() {
    resetDefaultSortValue();
    var icon = document.querySelector("#sort-by-id > i");
    if (icon.className == "fa-solid fa-sort" || icon.className == "fa-solid fa-sort-down") {
        sortById = 1;
        showDataTableAccessory(getAccessoriesData());
        resetDefaultIcon();
        document.querySelector("#sort-by-id > i").className ="fa-solid fa-sort-up";
    }
    else if (icon.className == "fa-solid fa-sort-up") {

        sortById = -1;
        showDataTableAccessory(getAccessoriesData());
        resetDefaultIcon();
        document.querySelector("#sort-by-id > i").className ="fa-solid fa-sort-down";
    }
}

function sortProductByName() {
    resetDefaultSortValue();
    var icon = document.querySelector("#sort-by-name > i");
    if (icon.className == "fa-solid fa-sort" || icon.className == "fa-solid fa-sort-down") {
        sortByName = 1;
        showDataTableAccessory(getAccessoriesData());
        resetDefaultIcon();
        document.querySelector("#sort-by-name > i").className ="fa-solid fa-sort-up";
    }
    else if (icon.className == "fa-solid fa-sort-up") {
        sortByName = -1;
        showDataTableAccessory(getAccessoriesData());
        resetDefaultIcon();
        document.querySelector("#sort-by-name > i").className ="fa-solid fa-sort-down";
    }
}

function sortProductByNewPrice() {
    resetDefaultSortValue();
    var icon = document.querySelector("#sort-by-newPrice > i");
    if (icon.className == "fa-solid fa-sort" || icon.className == "fa-solid fa-sort-down") {
        sortByNewPrice = 1;
        showDataTableAccessory(getAccessoriesData());
        resetDefaultIcon();
        document.querySelector("#sort-by-newPrice > i").className ="fa-solid fa-sort-up";
    }
    else if (icon.className == "fa-solid fa-sort-up") {
        sortByNewPrice = -1;
        showDataTableAccessory(getAccessoriesData());
        resetDefaultIcon();
        document.querySelector("#sort-by-newPrice > i").className ="fa-solid fa-sort-down";
    }
}

function sortProductByOldPrice() {
    resetDefaultSortValue();
    var icon = document.querySelector("#sort-by-oldPrice > i");
    if (icon.className == "fa-solid fa-sort" || icon.className == "fa-solid fa-sort-down") {
        sortByOldPrice = 1;
        showDataTableAccessory(getAccessoriesData());
        resetDefaultIcon();
        document.querySelector("#sort-by-oldPrice > i").className ="fa-solid fa-sort-up";
    }
    else if (icon.className == "fa-solid fa-sort-up") {
        sortByOldPrice = -1;
        showDataTableAccessory(getAccessoriesData());
        resetDefaultIcon();
        document.querySelector("#sort-by-oldPrice > i").className ="fa-solid fa-sort-down";
    }
}

function sortProductByQuantity() {
    resetDefaultSortValue();
    var icon = document.querySelector("#sort-by-quantity > i");
    if (icon.className == "fa-solid fa-sort" || icon.className == "fa-solid fa-sort-down") {
        sortByQuantity = 1;
        showDataTableAccessory(getAccessoriesData());
        resetDefaultIcon();
        document.querySelector("#sort-by-quantity > i").className ="fa-solid fa-sort-up";
    }
    else if (icon.className == "fa-solid fa-sort-up") {
        sortByQuantity = -1;
        showDataTableAccessory(getAccessoriesData());
        resetDefaultIcon();
        document.querySelector("#sort-by-quantity > i").className ="fa-solid fa-sort-down";
    }
}

// Reset other icon to default
function resetDefaultIcon() {
    var icons = document.querySelectorAll("#admin-table-header > th > i");
    icons.forEach(icon => {
        icon.className = "fa-solid fa-sort";
    });
}

// Reset sort value to default
function resetDefaultSortValue() {
    sortById = 0;
    sortByName = 0;
    sortByNewPrice = 0;
    sortByOldPrice = 0;
    sortByQuantity = 0;
}

function changeDisplayImageSize() {
    var sizeValue = document.querySelector("#display-select").value;
    var images = document.querySelectorAll(".table-image");
    images.forEach(image => {
        image.style.width = sizeValue + "px";
    });
}

function searchProduct(event) {
    event.preventDefault();
    showDataTableAccessory(getAccessoriesData());
}

function checkAdminLogin() {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData.userName != "ducphuongtk4@gmail.com") {
        window.location.href = "home-page.html";
    }
}

function changeproductPerPage() {
    var value = document.getElementById("productPerPage").value;
    if (value != "" && value > 0) {
        productPerPage = value;
    }
    else {
        productPerPage = 1000;
    }
    totalPage = Math.ceil(getAccessoriesData().length / productPerPage);
    showDataTableAccessory(getAccessoriesData());
}
