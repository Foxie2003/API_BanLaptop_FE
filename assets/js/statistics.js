var laptopData =  [0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0];
var accessoryData =  [0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0];
function getData() {
    var bills = JSON.parse(localStorage.getItem("bills"));
    bills.forEach(bill => {
        bill.cart.forEach(sanpham => {
            if(getProductType(sanpham.product.id) == "phanloai") {
                laptopData[bill.date.split("/")[1] - 1] += sanpham.quantity;
            }
            else {
                accessoryData[bill.date.split("/")[1] - 1] += sanpham.quantity;
            }
        });
    });
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