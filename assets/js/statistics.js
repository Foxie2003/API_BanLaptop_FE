var laptopData =  [0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0];
var accessoryData =  [0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0];
var totalSell = 0;
var totalLaptopSell = 0;
var totalAccessorySell = 0;
var revenue = 0;
function getData() {
    var bills = JSON.parse(localStorage.getItem("bills"));
    bills.forEach(bill => {
        bill.cart.forEach(sanpham => {
            if(getProductType(sanpham.product.id) == "phanloai") {
                if (bill.date.split("/")[2] == (new Date).getFullYear()) {
                    laptopData[bill.date.split("/")[1] - 1] += sanpham.quantity;
                    totalLaptopSell += sanpham.quantity;
                    revenue += sanpham.quantity * sanpham.product.price;
                }
            }
            else {
                if (bill.date.split("/")[2] == (new Date).getFullYear()) {
                    accessoryData[bill.date.split("/")[1] - 1] += sanpham.quantity;
                    totalAccessorySell += sanpham.quantity;
                    revenue += sanpham.quantity * sanpham.product.price;
                }
            }
        });
    });
    totalSell = totalLaptopSell + totalAccessorySell;
}

function getProductType(id) {
    var storage = JSON.parse(localStorage.getItem("sanpham"));
    var typeName = "";
    for (const type in storage) {
        for (const band in storage[type]) {
            storage[type][band].forEach(product => {
                if (product.id == id) {
                    typeName = type;
                    return;
                }
            });
            if (typeName != "") {
                break;
            }
        }
    }
    return typeName;
}

function showChart() {
    getData();
    const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    const canvas = document.getElementById("canvas");
    const data = {
        labels : labels,
        datasets : 
            [
                {
                    label : "Laptop",
                    backgroundColor : "#0a85ff",
                    borderColor : "#3399ff",
                    data : laptopData
                },
                {
                    label : "Phụ kiện",
                    backgroundColor : "#e21212",
                    borderColor : "#e55353",
                    data : accessoryData
                },
            ],
        }
    const options = {
        scales: {
        y: {
            beginAtZero: true
        }
        }
    };
    const config = {
        type : "line",
        data : data,
        options : options
    };
    const chart = new Chart(canvas, config)
}

function showData() {
    format = new Intl.NumberFormat({ maximumSignificantDigits: 3 });
    document.getElementById("totalSell").textContent = format.format(totalSell);
    document.getElementById("totalLaptopSell").textContent = format.format(totalLaptopSell);
    document.getElementById("totalAccessorySell").textContent = format.format(totalAccessorySell);
    document.getElementById("revenue").textContent = format.format(revenue) + "đ";
}