var carts = JSON.parse(localStorage.getItem("carts")) || [];
function loadCart() {
    let rows = "";
    for (let ca of carts) {
        rows += `<div class="product-item">
                    <div class="product-img">
                        <img src="./${ca.images}" alt="" />
                    </div>
                    <div class="col-8 product-info">
                        <div class="col-lg-3 product-name">${ca.name}</div>
                        <div class="col-lg-2 produc-number">
                            <input type="number" min = 1 value="${ca.quantity}" onchange = changeQua(event,'${ca.productId}') class ="${ca.productId}"/>
                        </div>
                        <div class="col-lg-2 product-price">${ca.price} đ</div>
                        <div class="col-lg-1 delete " onclick = "delCart(event, '${ca.productId}')">
                            <i class="fas fa-trash-alt"></i>
                        </div>
                    </div>
                </div>`;
    }
    $(".product-list").html(rows);
}
loadCart();

function changeQua(event, id) {
    let change = carts.find((c) => c.productId == id);
    if (change) {
        change.quantity = $("." + id).val();
    }
    localStorage.setItem("carts", JSON.stringify(carts));
    showCarts();
}

function showCarts() {
    // tính tổng tiền
    let total = 0;
    for (let c of carts) {
        total += c.quantity * c.price;
    }
    $(".pay-price").html(total + " VND");
}
showCarts();

function delCart(evt, id) {
    let index = carts.findIndex((c) => c.productId == id);
    if (index >= 0) {
        carts.splice(index, 1);
        loadCart();
        localStorage.setItem("carts", JSON.stringify(carts));
        showCarts();
    }
}
