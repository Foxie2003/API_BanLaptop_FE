var app = angular.module('appBanLaptop', []);
app.controller("admin", function ($scope, $http) {
    $scope.host = current_img;
    $scope.pageIndex = 1;
    $scope.pageSize = 5;
    $scope.totalPage = 0;

    $scope.maLoaiSanPham = 0;

    // Load Laptop Bands
    $scope.listDanhMuc;
    $scope.LoadDanhMuc = function () {
        $http({
            method: 'GET',
            url: current_url2 + "/api/LoaiSanPham/get-all",
        }).then(function (response) {
            $scope.listDanhMuc = response.data;
        });
    };
    $scope.LoadDanhMuc();

    // Load Laptops
    $scope.listLaptop;
    $scope.LoadLaptops = function(searchInfo) {
        $.ajax({
            method: 'POST',
            url: current_url2 + "/api/SanPham/search",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(searchInfo)
        }).done(function(response) {
            $scope.$apply(function() {
                $scope.totalPage = Math.ceil(response.totalItems / $scope.pageSize);
                $scope.listLaptop = response.data;
                if(response.totalItems == 0) {
                    alert("Không tìm thấy sản phẩm nào")
                }
                console.log(response);
            });
        }).fail(function() {
            console.log("Load laptops fail");
        });
    };
    $scope.LoadLaptops({
        pageIndex: $scope.pageIndex,
        pageSize: $scope.pageSize
    });

    $scope.priceFormat = new Intl.NumberFormat({ maximumSignificantDigits: 3 });

    $scope.nextPageLaptops = function() {
        if($scope.pageIndex < $scope.totalPage) {
            $scope.pageIndex = $scope.pageIndex + 1;
            $scope.LoadLaptops({
                pageIndex: $scope.pageIndex,
                pageSize: $scope.pageSize
            });
        }
    };

    $scope.backPageLaptops = function() {
        if($scope.pageIndex > 1) {
            $scope.pageIndex = $scope.pageIndex - 1;
            $scope.LoadLaptops({
                pageIndex: $scope.pageIndex,
                pageSize: $scope.pageSize
            });
        }
    };

    $scope.firstPageLaptops = function() {
        $scope.pageIndex = 1;
        $scope.LoadLaptops({
            pageIndex: $scope.pageIndex,
            pageSize: $scope.pageSize
        });
    };

    $scope.lastPageLaptops = function() {
        $scope.pageIndex = $scope.totalPage;
        $scope.LoadLaptops({
            pageIndex: $scope.pageIndex,
            pageSize: $scope.pageSize
        });
    };

    $scope.totalPageChange = function() {
        $scope.LoadLaptops({
            pageIndex: $scope.pageIndex,
            pageSize: $scope.pageSize
        });
    };

    $scope.addLaptop = function() {
        var productImages = document.querySelector(".detail-image");
        var imagesData = [];
        var imageContainers = productImages.querySelectorAll(".product-image-container");
        imageContainers.forEach(imageContainer => {
            var imageURL = imageContainer.querySelector("img").getAttribute("src").split('/')[3];
            var image = {
                    maHinhAnh: 0,
                    maSanPham: 0,
                    hinhAnh: imageURL,
                    status: 1
                };
            if(image.hinhAnh != null) {
                imagesData.push(image);
            };
        });

        var productSpecNames = document.querySelectorAll(".spec-name");
        var productSpecDescs = document.querySelectorAll(".spec-desc");
        var descsData = [];
        
        productSpecNames.forEach(productSpecName => {
            if(productSpecName.value != "") {
                var spec = {
                    maThongSo: 0,
                    maSanPham: 0,
                    tenThongSo: productSpecName.value,
                    moTa: "",
                    status: 1
                  };
                  descsData.push(spec);
            }
        });

        for (let index = 0; index < productSpecDescs.length; index++) {
            descsData[index].moTa = productSpecDescs[index].value;
        }

        var laptopData = {
            maSanPham: 0,
            tenSanPham: $scope.product_name,
            maLoaiSanPham: document.getElementById("product-band").value,
            donGia: $scope.product_price.replaceAll(",", ""),
            soLuong: $scope.product_quantity.replaceAll(",", ""),
            hinhAnhDaiDien: imagesData[0].hinhAnh,
            listHinhAnhSanPham: imagesData.slice(1),
            listThongSoKyThuat: descsData
        }
        alert(JSON.stringify(laptopData));
        console.log(JSON.stringify(laptopData));
        $.ajax({
            method: 'POST',
            url: current_url2 + "/api/SanPham/create",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(laptopData)
        });
        alert("Thêm sản phẩm thành công");
    };

    $scope.showEditLaptop = function(id) {
        $http({
            method: 'GET',
            url: current_url2 + "/api/SanPham/get-by-id/" + id,
        }).then(function (response) {
            var laptopData = response.data;
            $scope.product_id = laptopData.maSanPham;
            $scope.product_name = laptopData.tenSanPham;

            var panel = document.querySelector(".add-product");
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
        });
    };

    $scope.themLoaiSanPham = function (){
        if(document.querySelector(".add-product-header").textContent.includes("Thêm")) {
            var item = {
                maLoai: 0,
                tenLoai: $scope.typeName,
                moTa: $scope.typeDesc
            };
            $http({
              method: 'POST',
              data: item,
              url: current_url2 + "/api/LoaiSanPham/create",
            }).then(function () {
                $scope.LoadDanhMuc();
                alert('Thêm loại sản phẩm thành công!');
            });
        }
        else {
            var item = {
                maLoai: $scope.typeId,
                tenLoai: $scope.typeName,
                moTa: $scope.typeDesc
            };
            $http({
              method: 'PUT',
              data: item,
              url: current_url2 + "/api/LoaiSanPham/update",
            }).then(function () {
                $scope.LoadDanhMuc();
                alert('Sửa loại sản phẩm thành công!');
            });
        }
    };

    $scope.showThemLoaiSanPham = function (){
        var panel = document.querySelector(".add-product");
        panel.style.display = "flex";
        document.querySelector(".add-product-header").textContent = "Thêm loại sản phẩm";
    };

    $scope.showEditLoaiSanPham = function (id, name, desc){
        var panel = document.querySelector(".add-product");
        panel.style.display = "flex";
        document.querySelector(".add-product-header").textContent = "Cập nhật loại sản phẩm";
        $scope.typeId = id;
        $scope.typeName = name;
        $scope.typeDesc = desc;
    };

    $scope.deleteLoaiSanPham = function (id) {
        $http({
            method: 'DELETE',
            url: current_url2 + "/api/LoaiSanPham/delete/" + id,
        }).then(function () {
            $scope.LoadDanhMuc();
            alert("Xóa sản phẩm thành công")
        });
    };

    // Load Bill Sell
    $scope.listBillSell;
    $scope.loadBillSell = function () {
        $http({
            method: 'GET',
            url: current_url2 + "/api/HoaDonBan/get-all",
        }).then(function (response) {
            $scope.listBillSell = response.data;
        });
    };
    $scope.loadBillSell();

    $scope.xacNhanDonHang = function (id) {
        $http({
            method: 'POST',
            url: current_url2 + "/api/HoaDonBan/confirm/" + id,
        }).then(function () {
            $scope.loadBillSell();
            alert("Xác nhận đơn hàng thành công")
        });
    };

    $scope.xoaDonHang = function (id) {
        $http({
            method: 'POST',
            url: current_url2 + "/api/HoaDonBan/confirm/" + id,
        }).then(function () {
            $scope.loadBillSell();
            alert("Xác nhận đơn hàng thành công")
        });
    };
});