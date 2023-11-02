const priceFormat = new Intl.NumberFormat({ maximumSignificantDigits: 3 });
function showSubItems(subPanelId) {
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
    // var menu = document.getElementById("menu");
    // var admin = document.querySelector(".admin-panel-right");
    // if (menu.classList.contains("show-menu")) {
    //     menu.classList.replace("show-menu", "hide-menu");
    //     setTimeout(function() {
    //         // menu.style.display = "none";
    //         admin.style.width = "97%";
    //     }, 300);
    // }
    // else {
    //     menu.classList.replace("hide-menu", "show-menu");
    //     admin.style.width = "80%";
    //     // menu.style.display = "block";
    // }
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
function imageToBase64() {
    var storage = JSON.parse(localStorage.getItem("sanpham"));
    var laptops = storage.phanloai;
    for (const band in laptops) {
        laptops[band].forEach(product => {
            for (let i = 0; i < product.images.length; i++) {
                var imageUrl = product.images[i];

                // Tải hình ảnh từ đường dẫn
                fetch(imageUrl)
                .then(response => response.blob())
                .then(blob => {
                    // Chuyển đổi blob thành base64
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    });
                })
                .then(base64Image => {
                    // Ảnh đã được mã hóa thành base64
                    product.images[i] = base64Image;
                })
                .catch(error => {
                    console.error('Lỗi khi tải hình ảnh:', error);
                });
            }
        });
    }
    localStorage.setItem("sanpham", JSON.stringify(storage));
}
var currentPage = 1;
var productPerPage = 15;
var totalPage = Math.ceil(getLaptopsData().length / productPerPage);

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
                    <td style="max-width: 300px; overflow: hidden; text-overflow: ellipsis;">
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
                            <div class="table-button">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div class="table-button">
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