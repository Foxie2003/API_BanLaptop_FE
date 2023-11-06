const priceFormat = new Intl.NumberFormat({ maximumSignificantDigits: 3 });
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
    const content = document.getElementById(divId).innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

// var arr = ['a', 's', 'e', 'a', 'g', 'd', 'l'];
// console.log(arr.sort().reverse())
function getLaptopsData() {
    var storage = JSON.parse(localStorage.getItem("sanpham"));
    var laptops = [];
    for (const band in storage.phanloai) {
        storage.phanloai[band].forEach(product => {
            laptops.push(product);
        });
    }
    return laptops;
}

function getLaptopBand(id) {
    var storage = JSON.parse(localStorage.getItem("sanpham"));
    var bandName = "";
    for (const band in storage.phanloai) {
        storage.phanloai[band].forEach(product => {
            if (product.id == id) {
                bandName = band;
                return;
            }
        });
        if (bandName != "") {
            break;
        }
    }
    return bandName;
}

var currentPage = 1;
var productPerPage = 15;
var totalPage = Math.ceil(getLaptopsData().length / productPerPage);

function setCurrentPage(page) {
    if (page > 0 && page <= totalPage) {
        currentPage = page;
        showDataTableLaptop();
    }
}

function getCurrentPage() {
    return currentPage;
}
function getTotalPage() {
    return totalPage;
}
function showDataTableLaptop() {
    document.getElementById("totalPage").textContent = "/ " + totalPage;
    document.getElementById("currentPage").value = currentPage;
    var tableData = document.getElementById("admin-table");
    tableData.innerHTML =
        `<tr>
        <th>
            ID sản phẩm
        </th>
        <th>
            Tên
        </th>
        <th>
            Ảnh thumbnail
        </th>
        <th>
            Giá mới
        </th>
        <th>
            Giá cũ
        </th>
        <th>
            Số lượng
        </th>
        <th>
            Chức năng
        </th>
    </tr>`;
    var productToShow = getLaptopsData().splice((currentPage - 1) * productPerPage, productPerPage);
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
                            <div class="table-button" onclick="">
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
            <input type="text" id="product-name" placeholder="Laptop Asus TUF Gaming F15 FX506HE i7 11800H/16GB/512GB/4GB RTX3050Ti/144Hz/Win11 (HN378W)">
            <label for="product-band">Hãng:</label>
            <select id="product-band">
                <option value="hp">HP</option>
                <option value="asus">Asus</option>
                <option value="lenovo">Lenovo</option>
                <option value="acer">Acer</option>
                <option value="dell">Dell</option>
                <option value="msi">Msi</option>
                <option value="macbook">Macbook</option>
                <option value="itel">Itel</option>
                <option value="gigabyte">Gigabyte</option>
                <option value="surface">Surface</option>
                <option value="masstel">Masstel</option>
                <option value="lg">LG</option>
                <option value="singpc">Singpc</option>
            </select>
            <label for="product-video">Video review:</label>
            <input type="text" id="product-video" placeholder="https://www.youtube.com/watch?v=vPz8ftK_4bk">

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
            <div class="detail-specs">
                <h3>Thông tin cấu hình</h3>
                <label for="product-cpu">CPU:</label>
                <input type="text" id="product-cpu" placeholder="i7, 11800H, 2.30 GHz">
                <label for="product-ram">Ram:</label>
                <input type="text" id="product-ram" placeholder="16 GB, DDR4 2 khe (1 khe 8 GB + 1 khe 8 GB), 3200 MHz">
                <label for="product-disk">Ổ cứng:</label>
                <textarea id="product-disk" rows="3" placeholder="Hỗ trợ thêm 1 khe cắm SSD M.2 PCIe mở rộng (nâng cấp tối đa 1 TB), 512 GB SSD NVMe PCIe (Có thể tháo ra, lắp thanh khác tối đa 1 TB)"></textarea>
                <label for="product-screen">Màn hình:</label>
                <input type="text" id="product-screen" placeholder='15.6", Full HD (1920 x 1080), 144Hz'>
                <label for="product-gpu">Card màn hình:</label>
                <input type="text" id="product-gpu" placeholder="Card rời, RTX 3050Ti 4GB">
                <label for="product-port">Cổng kết nối:</label>
                <input type="text" id="product-port" placeholder="1 x Thunderbolt 4 (hỗ trợ DisplayPort), HDMI, LAN (RJ45), 3 x USB 3.2, Jack tai nghe 3.5 mm">
                <label for="product-os">Hệ điều hành:</label>
                <input type="text" id="product-os" placeholder="Windows 11 Home SL">
                <label for="product-size">Kích thước:</label>
                <input type="text" id="product-size" placeholder="Dài 359 mm - Rộng 256 mm - Dày 22.8 ~ 24.5 mm - Nặng 2.3 kg">
            </div>
            <div class="detail-desc">
                <label for="product-header">Tiêu đề:</label>
                <textarea id="product-header" rows="3" placeholder="Laptop Asus TUF Gaming F15 FX506HE i7 11800H (HN378W) mang vẻ đẹp ấn tượng, cuốn hút đậm chất gaming, đi cùng cấu hình mạnh mẽ, đa dạng tính năng, chiếc laptop gaming từ nhà Asus này sẽ trở thành người bạn đồng hành lý tưởng trên những chiến trường ảo cho các anh em game thủ."></textarea>
                <label for="product-body">Nội dung mô tả:</label>
                <textarea id="product-body" rows="6" placeholder="Laptop Asus TUF Gaming được trang bị bộ vi xử lý Intel Core i7 11800H và card rời NVIDIA GeForce RTX 3050Ti với 4 GB VRAM mang đến hiệu năng xử lý mạnh mẽ, vừa giúp người dùng thoải mái thực hiện các công việc thiết kế, đồ hoạ, render video,... trên nền tảng Adobe, vừa cho phép chiến mượt mà các tựa game."></textarea>
            </div>
            <div class="detail-nav">
                <button class="form-button" onclick="editDetals()">Lưu</button>
                <button class="form-button" onclick="hideEditDetals()">Hủy</button>
            </div>
        </form>
    `;
    var productID = document.getElementById("product-id");
    var productName = document.getElementById("product-name");
    var productBand = document.getElementById("product-band");
    var productVideo = document.getElementById("product-video");
    var productImages = document.querySelector(".detail-image");
    var productNewPrice = document.getElementById("product-new-price");
    var productOldPrice = document.getElementById("product-old-price");
    var productQuantity = document.getElementById("product-quantity");
    var productCpu = document.getElementById("product-cpu");
    var productRam = document.getElementById("product-ram");
    var productDisk = document.getElementById("product-disk");
    var productScreen = document.getElementById("product-screen");
    var productGpu = document.getElementById("product-gpu");
    var productPort = document.getElementById("product-port");
    var productOS = document.getElementById("product-os");
    var productSize = document.getElementById("product-size");
    var productHeader = document.getElementById("product-header");
    var productBody = document.getElementById("product-body");
    var productData = "";
    var ImagesData = "";

    panel.style.display = "flex";
    getLaptopsData().forEach(product => {
        if (product.id == id) {
            productData = product;
            return;
        }
    });
    productID.value = productData.id;
    productName.value = productData.name;
    for (var i = 0; i < productBand.options.length; i++) {
        if (productBand.options[i].value == getLaptopBand(id)) {
            productBand.selectedIndex = i;
            break;
        }
    }
    productVideo.value = productData.video;
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
        if (i == productData.images.length - 1) {
            ImagesData +=
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
    productImages.innerHTML =
        `<label for="product-image" style="float: left;">Hình ảnh:</label>
    ${ImagesData}`;
    productNewPrice.value = priceFormat.format(productData.price);
    productOldPrice.value = priceFormat.format(productData.old_price);
    productQuantity.value = productData.quantity;
    productCpu.value = productData.specs.cpu;
    productRam.value = productData.specs.ram;
    productDisk.value = productData.specs.disk;
    productScreen.value = productData.specs.screen;
    productGpu.value = productData.specs.gpu;
    productPort.value = productData.specs.port;
    productOS.value = productData.specs.os;
    productSize.value = productData.specs.size;
    productHeader.value = productData.desc.header;
    productData.desc.body.forEach(paragraph => {
        productBody.value += paragraph + "\n";
    });
}

function addDetals() {
    event.preventDefault();
    var productID = document.getElementById("product-id");
    var productName = document.getElementById("product-name");
    var productBand = document.getElementById("product-band");
    var productVideo = document.getElementById("product-video");
    var productImages = document.querySelector(".detail-image");
    var productNewPrice = document.getElementById("product-new-price");
    var productOldPrice = document.getElementById("product-old-price");
    var productQuantity = document.getElementById("product-quantity");
    var productCpu = document.getElementById("product-cpu");
    var productRam = document.getElementById("product-ram");
    var productDisk = document.getElementById("product-disk");
    var productScreen = document.getElementById("product-screen");
    var productGpu = document.getElementById("product-gpu");
    var productPort = document.getElementById("product-port");
    var productOS = document.getElementById("product-os");
    var productSize = document.getElementById("product-size");
    var productHeader = document.getElementById("product-header");
    var productBody = document.getElementById("product-body");

    var imagesData = [];
    var imageContainers = productImages.querySelectorAll(".product-image-container");
    imageContainers.forEach(imageContainer => {
        imagesData.push(imageContainer.querySelector("img").getAttribute("src"));
    });

    addLaptopObj(createLaptopObj(productID.value, productName.value, productVideo.value,
        imagesData, productNewPrice.value.replaceAll(",", ""), productOldPrice.value.replaceAll(",", ""),
        productQuantity.value,
        createLaptopSpecsObj(productCpu.value, productRam.value, productDisk.value, productScreen.value,
            productGpu.value, productPort.value, productOS.value, productSize.value),
            createLaptopDescsObj(productHeader.value, productBody.value)), productBand.value);
}

function editDetals() {
    event.preventDefault();
    var productID = document.getElementById("product-id");
    var productName = document.getElementById("product-name");
    var productBand = document.getElementById("product-band");
    var productVideo = document.getElementById("product-video");
    var productImages = document.querySelector(".detail-image");
    var productNewPrice = document.getElementById("product-new-price");
    var productOldPrice = document.getElementById("product-old-price");
    var productQuantity = document.getElementById("product-quantity");
    var productCpu = document.getElementById("product-cpu");
    var productRam = document.getElementById("product-ram");
    var productDisk = document.getElementById("product-disk");
    var productScreen = document.getElementById("product-screen");
    var productGpu = document.getElementById("product-gpu");
    var productPort = document.getElementById("product-port");
    var productOS = document.getElementById("product-os");
    var productSize = document.getElementById("product-size");
    var productHeader = document.getElementById("product-header");
    var productBody = document.getElementById("product-body");

    // test create product json
    createLaptopObj(productID.value, productName.value, productVideo.value,
        productImages.value, productNewPrice.value, productOldPrice.value,
        productQuantity.value,
        createLaptopSpecsObj(productCpu.value, productRam.value, productDisk.value, productScreen.value,
            productGpu.value, productPort.value, productOS.value, productSize.value),
            createLaptopDescsObj(productHeader.value, productBody.value));
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
            <input type="text" id="product-id" placeholder="SP01">
            <label for="product-name">Tên:</label>
            <input type="text" id="product-name" placeholder="Laptop Asus TUF Gaming F15 FX506HE i7 11800H/16GB/512GB/4GB RTX3050Ti/144Hz/Win11 (HN378W)">
            <label for="product-band">Hãng:</label>
            <select id="product-band">
                <option value="hp">HP</option>
                <option value="asus">Asus</option>
                <option value="lenovo">Lenovo</option>
                <option value="acer">Acer</option>
                <option value="dell">Dell</option>
                <option value="msi">Msi</option>
                <option value="macbook">Macbook</option>
                <option value="itel">Itel</option>
                <option value="gigabyte">Gigabyte</option>
                <option value="surface">Surface</option>
                <option value="masstel">Masstel</option>
                <option value="lg">LG</option>
                <option value="singpc">Singpc</option>
            </select>
            <label for="product-video">Video review:</label>
            <input type="text" id="product-video" placeholder="https://www.youtube.com/watch?v=vPz8ftK_4bk">

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
            <div class="detail-specs">
                <h3>Thông tin cấu hình</h3>
                <label for="product-cpu">CPU:</label>
                <input type="text" id="product-cpu" placeholder="i7, 11800H, 2.30 GHz">
                <label for="product-ram">Ram:</label>
                <input type="text" id="product-ram" placeholder="16 GB, DDR4 2 khe (1 khe 8 GB + 1 khe 8 GB), 3200 MHz">
                <label for="product-disk">Ổ cứng:</label>
                <textarea id="product-disk" rows="3" placeholder="Hỗ trợ thêm 1 khe cắm SSD M.2 PCIe mở rộng (nâng cấp tối đa 1 TB), 512 GB SSD NVMe PCIe (Có thể tháo ra, lắp thanh khác tối đa 1 TB)"></textarea>
                <label for="product-screen">Màn hình:</label>
                <input type="text" id="product-screen" placeholder='15.6", Full HD (1920 x 1080), 144Hz'>
                <label for="product-gpu">Card màn hình:</label>
                <input type="text" id="product-gpu" placeholder="Card rời, RTX 3050Ti 4GB">
                <label for="product-port">Cổng kết nối:</label>
                <input type="text" id="product-port" placeholder="1 x Thunderbolt 4 (hỗ trợ DisplayPort), HDMI, LAN (RJ45), 3 x USB 3.2, Jack tai nghe 3.5 mm">
                <label for="product-os">Hệ điều hành:</label>
                <input type="text" id="product-os" placeholder="Windows 11 Home SL">
                <label for="product-size">Kích thước:</label>
                <input type="text" id="product-size" placeholder="Dài 359 mm - Rộng 256 mm - Dày 22.8 ~ 24.5 mm - Nặng 2.3 kg">
            </div>
            <div class="detail-desc">
                <label for="product-header">Tiêu đề:</label>
                <textarea id="product-header" rows="3" placeholder="Laptop Asus TUF Gaming F15 FX506HE i7 11800H (HN378W) mang vẻ đẹp ấn tượng, cuốn hút đậm chất gaming, đi cùng cấu hình mạnh mẽ, đa dạng tính năng, chiếc laptop gaming từ nhà Asus này sẽ trở thành người bạn đồng hành lý tưởng trên những chiến trường ảo cho các anh em game thủ."></textarea>
                <label for="product-body">Nội dung mô tả:</label>
                <textarea id="product-body" rows="6" placeholder="Laptop Asus TUF Gaming được trang bị bộ vi xử lý Intel Core i7 11800H và card rời NVIDIA GeForce RTX 3050Ti với 4 GB VRAM mang đến hiệu năng xử lý mạnh mẽ, vừa giúp người dùng thoải mái thực hiện các công việc thiết kế, đồ hoạ, render video,... trên nền tảng Adobe, vừa cho phép chiến mượt mà các tựa game."></textarea>
            </div>
            <div class="detail-nav">
                <button class="form-button" onclick="addDetals()">Lưu</button>
                <button class="form-button" onclick="hideEditDetals()">Hủy</button>
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

function createLaptopObj(id, name, video, images, price, oldPrice, quantity, specs, desc) {
    if (id == "") {
        id = getNewProductID();
    }
    var laptopObj = {
        id: `${id}`,
        name: `${name}`,
        video: `${video}`,
        images: images,
        price: price,
        old_price: oldPrice,
        quantity: quantity,
        specs: specs,
        desc: desc
    };
    alert(JSON.stringify(laptopObj));
    return laptopObj;
}

function createLaptopSpecsObj(cpu, ram, disk, screen, gpu, port, os, size) {
    return specs = {
        cpu: `${cpu}`,
        ram: `${ram}`,
        disk: `${disk}`,
        screen: `${screen}`,
        gpu: `${gpu}`,
        port: `${port}`,
        os: `${os}`,
        size: `${size}`
    }
}

function createLaptopDescsObj(header, body) {
    return descs = {
        header: `${header}`,
        body: `${body}`
    };
}

function getNewProductID() {
    var maxID = 0;
    getLaptopsData().forEach(product => {
        var productID = product.id.substring(2);
        if (productID > maxID) {
            maxID = productID;
        }
    });
    return "SP" + ++maxID;
}

function addLaptopObj(laptopObj, bandName) {
    var storage = JSON.parse(localStorage.getItem("sanpham"));
    var laptopStorage = storage.phanloai;
    for(const band in laptopStorage) {
        if(band == bandName) {
            laptopStorage[band].push(laptopObj);
            localStorage.setItem("sanpham", JSON.stringify(storage));
            alert("added");
            break;
        }
    }
}