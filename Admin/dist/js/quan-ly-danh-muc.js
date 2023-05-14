var categories = JSON.parse(localStorage.getItem("categories")) || [];
var products = JSON.parse(localStorage.getItem("products")) || [];

function loadCategories() {
    let rows = "";
    for (let c of categories) {
        rows += `<tr>
                    <td>${c.id}</td>
                    <td>${c.name}</td>
                    <td>${c.status ? "Còn hàng" : "Hết hàng"}</td>
                    <td>
                        <button class="btn btn-warning" onclick = 'editCategory(event, ${c.id})'>Sửa</button>
                        <button class="btn btn-danger" onclick = 'delCategory(event, ${c.id})'>Xóa</button>
                    </td>
                </tr>`;
    }
    $(".tbl_categories").html(rows);
}

function editCategory(evt, id) {
    let cat = categories.find((c) => c.id == id);
    if (cat) {
        $("#catId").val(cat.id);
        $("#catId").attr("readonly", true);
        $("#catName").val(cat.name);
        $("#catStatus").attr("checked", cat.status);
    }
    return true;
}

function delCategory(evt, id) {
    let checkId = products.find((p) => p.categoriesId == id);
    if (checkId) {
        alert("Bạn không thể xóa danh mục vì sản phẩm vẫn còn trong danh mục");
    } else {
        if (confirm("Bạn có muốn xoá không")) {
            let index = categories.findIndex((c) => c.id == id);
            if (index >= 0) {
                categories.splice(index, 1);
                loadCategories();
                localStorage.setItem("categories", JSON.stringify(categories));
            }
        }
    }
}

loadCategories();

// validation
const categoriesId = document.querySelector("#catId");
const categoriesName = document.querySelector("#catName");
const btnSubmit = document.querySelector("#btn-save");
const categoriesStatus = document.querySelector("#catStatus");
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

categoriesId.onblur = function () {
    let value = categoriesId.value.trim();
    if (value === "" || null) {
        showError(categoriesId, "Vui lòng nhập vào trường này");
    }
};

categoriesName.onblur = function () {
    let value = categoriesName.value.trim();
    if (value === "" || null) {
        showError(categoriesName, "Vui lòng nhập vào trường này");
    }
};

categoriesId.oninput = function () {
    let value = categoriesId.value.trim();
    if (value !== "" || null) {
        showSuccess(categoriesId);
    }
};
categoriesName.oninput = function () {
    let value = categoriesName.value.trim();
    if (value !== "" || null) {
        showSuccess(categoriesName);
    }
};

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
    if (categories.find((e) => e.id === value)) {
        showError(input, "Giá trị nhập vào đã tồn tại");
        isDuplicate = true;
    }
    return isDuplicate;
}

function resetForm() {
    categoriesId.value = "";
    categoriesId.readOnly = false;
    categoriesName.value = "";
    categoriesStatus.checked = false;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let emptyError = checkEmptyError([categoriesId, categoriesName]);
    let id = categoriesId.value;
    if (id) {
        let cat = categories.find((v) => v.id == id);
        if (cat && !emptyError && categoriesId.readOnly) {
            cat.name = categoriesName.value;
            cat.status = categoriesStatus.checked;
            resetForm();
        } else {
            let duplicate = checkDuplicate(categoriesId);
            if (!(emptyError || duplicate)) {
                categories.push({
                    id: categoriesId.value,
                    name: categoriesName.value,
                    status: categoriesStatus.checked,
                });
                resetForm();
            }
        }
    }
    loadCategories();
    localStorage.setItem("categories", JSON.stringify(categories));
});
