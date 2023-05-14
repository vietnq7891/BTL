var products = JSON.parse(localStorage.getItem("products")) || [];
var cate = JSON.parse(localStorage.getItem("categories")) || [];
var categories = cate.filter((c) => c.status);

function loadCategories() {
    let opts = `<option value="">Danh mục sản phẩm</option>`;
    for (let c of categories) {
        opts += ` <option value="${c.id}">${c.name}</option>`;
    }
    $("#proCat").html(opts);
}
loadCategories();

function loadProducts() {
    let rows = "";
    for (let p of products) {
        rows += `<tr ">
                    <td>${p.id}</td>
                    <td class="d-flex flex-column">
                        ${p.name}
                        <img width="150" src="../${p.images}" alt=""/>
                    </td>
                    <td>${p.price} VNĐ</td>
                    <td>${categories.find((c) => c.id == p.categoriesId)?.name}</td>
                    <td>${p.status ? "Còn hàng" : "Hết hàng"}</td>
                    <td>
                        <button class="btn btn-warning" onclick="editProduct(event, '${p.id}')">Sửa</button> 
                        <button class="btn btn-danger" onclick="delProduct(event, '${p.id}')">Xóa</button>
                    </td>
                </tr>`;
    }
    $(".tbl_products").html(rows);
}

function editProduct(evt, id) {
    let pro = products.find((p) => p.id == id);
    if (pro) {
        $("#proId").val(pro.id);
        $("#proId").attr("readonly", true);
        $("#proName").val(pro.name);
        $("#price").val(pro.price);
        $("#proCat").val(pro.categoriesId);
        $("#proStt").attr("checked", pro.status);
    }
}

function delProduct(evt, id) {
    if (confirm("Bạn có muốn xoá không")) {
        let index = products.findIndex((p) => p.id == id);
        if (index >= 0) {
            products.splice(index, 1);
            loadProducts();
            localStorage.setItem("products", JSON.stringify(products));
        }
    }
}

loadProducts();

// validation
const proId = document.querySelector("#proId");
const proName = document.querySelector("#proName");
const proCat = document.querySelector("#proCat");
const proPrice = document.querySelector("#price");
const proImage = document.querySelector("#proImage");
const proStatus = document.querySelector("#proStt");
const proSubmit = document.querySelector(".btn-submit");

const form = document.querySelector("form");

function showError(input, message) {
    let parent = input.parentElement;
    let messageError = parent.querySelector(".form-message");
    messageError.innerText = message;
    input.parentElement.classList.add("invalid");
}

function showSuccess(input) {
    let parent = input.parentElement;
    let messageError = parent.querySelector(".form-message");
    messageError.innerText = "";
    input.parentElement.classList.remove("invalid");
}

function checkEmptyError(listInput) {
    let isEmptyError = false;
    listInput.forEach((input) => {
        let value = input.value.trim();
        if (value === "" || null) {
            isEmptyError = true;
            showError(input, "Vui lòng nhập vào trường này");
        } else {
            showSuccess(input);
        }
    });
    return isEmptyError;
}

function checkDuplicate(input) {
    let isDuplicate = false;
    let value = input.value.trim();
    if (products.find((e) => e.id === value)) {
        showError(input, "Giá trị nhập vào đã tồn tại");
        isDuplicate = true;
    }
    return isDuplicate;
}

function resetForm() {
    proId.value = "";
    proId.readOnly = false;
    proName.value = "";
    proCat.value = "";
    proPrice.value = "";
    proImage.value = "";
    proStatus.checked = false;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let emptyError = checkEmptyError([proId, proName, proCat, proPrice, proImage]);
    let prodId = $("#proId").val();
    let fileName = document.getElementById("proImage").files[0].name;
    if (prodId) {
        let product = products.find((p) => p.id == prodId);
        if (product && proId.readOnly && !emptyError) {
            product.name = proName.value;
            product.price = proPrice.value;
            product.categoriesId = proCat.value;
            product.images = "assets/img/product/" + fileName;
            product.status = proStatus.checked;
            resetForm();
        } else {
            let duplicate = checkDuplicate(proId);
            if (!(emptyError || duplicate)) {
                products.push({
                    id: proId.value,
                    name: proName.value,
                    price: proPrice.value,
                    categoriesId: proCat.value,
                    images: "assets/img/product/" + fileName,
                    status: proStatus.checked,
                });
                resetForm();
            }
        }
    }
    loadProducts();
    localStorage.setItem("products", JSON.stringify(products));
});
