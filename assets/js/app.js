// back-to-top
jQuery(document).ready(function ($) {
    if ($(".back-to-top").length > 0) {
        $(window).scroll(function () {
            var e = $(window).scrollTop();
            if (e > 300) {
                $(".back-to-top").show();
            } else {
                $(".back-to-top").hide();
            }
        });
        $(".back-to-top").click(function () {
            $("body,html").animate({
                scrollTop: 0,
            });
        });
    }
});
// load new products
var products = JSON.parse(localStorage.getItem("products")) || [];
var listProducts = products.filter((p) => p.status);
function loadNewProduct() {
    let item = "";
    for (let i = 0; i < listProducts.length; i++) {
        if (i < 5) {
            item += ` <div class="card-deck item new-product-item">
                           <div class="card new-content">
                               <a href="#!" class="image">
                                   <img class="card-img-top" src= "${listProducts[i].images}" alt="" />
                               </a>
                               <div class="card-body">
                                   <span class="price-new">${listProducts[i].price} đ</span>
                                   <span class="price-old"></span>
                                   <h2 class="name">${listProducts[i].name}</h2>
                               </div>
                               <div class="rating-cart">
                                   <div class="rating">
                                       <i class="fas fa-star star"></i>
                                       <i class="fas fa-star star"></i>
                                       <i class="fas fa-star star"></i>
                                       <i class="fas fa-star star"></i>
                                       <i class="fas fa-star star"></i>
                                   </div>
                                   <div class="add-cart-button">
                                       <a href="#!" class="add-cart" onclick= "buy(event, '${listProducts[i].id}','${listProducts[i].name}','${listProducts[i].price}','${listProducts[i].images}')">
                                           MUA
                                           <i class="fas fa-chevron-right"></i>
                                       </a>
                                   </div>
                               </div>
                           </div>
                       </div>`;
        }
    }
    $(".new-product-content").html(item);
}
loadNewProduct();

// load product
function loadProduct() {
    let item = "";
    for (let p of listProducts) {
        item += ` <div class="col-lg-3 col-md-6 mb-5">
                    <div class="card-deck new-product-item">
                        <div class="card new-content">
                            <a href="#!" class="image">
                                <img
                                    class="card-img-top"
                                    src="${p.images}"
                                    alt=""
                                />
                            </a>
                            <span class="sale">Hot</span>
                            <div class="card-body">
                                <span class="price-new">${p.price} đ</span>
                                <span class="price-old"></span>
                                <h2 class="name">${p.name}</h2>
                            </div>
                            <div class="rating-cart">
                                <div class="rating">
                                    <i class="fas fa-star star"></i>
                                    <i class="fas fa-star star"></i>
                                    <i class="fas fa-star star"></i>
                                    <i class="fas fa-star star"></i>
                                    <i class="fas fa-star star"></i>
                                </div>
                                <div class="add-cart-button">
                                    <a href="#!" class="add-cart" onclick= "buy(event, '${p.id}','${p.name}','${p.price}','${p.images}')">
                                        MUA
                                        <i class="fas fa-chevron-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
    }
    $(".products-item").html(item);
}
loadProduct();

// mua hang
var carts = JSON.parse(localStorage.getItem("carts")) || [];
function buy(evt, proId, proName, proPrice, proImage) {
    console.log(products.name);
    // Kiểm tra xem sp đó đã được mua chưa
    let cartItem = carts.find((c) => c.productId == proId);
    if (cartItem) {
        // tăng số lượng
        cartItem.quantity += 1;
    } else {
        // Thêm sản phẩm được mua vào giỏ hàng
        carts.push({
            productId: proId,
            name: proName,
            images: proImage,
            price: proPrice,
            quantity: 1,
        });
    }
    localStorage.setItem("carts", JSON.stringify(carts));
}

// slider
$(".header-slider").owlCarousel({
    items: 1,
    lazyLoad: true,
    loop: true,
    nav: true,
    autoplay: true,
    margin: 0,
    autoplayHoverPause: true,
    navContent: true,
});

$(".new-product-content").owlCarousel({
    loop: true,
    item: 4,
    lazyLoad: true,
    margin: 10,
    autoplay: true,
    autoplayHoverPause: true,
    nav: true,
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 2,
        },
        1000: {
            items: 4,
        },
    },
});

$(".partner-content").owlCarousel({
    item: 7,
    loop: true,
    margin: 40,
    autoplay: true,
    autoplayHoverPause: true,
    dots: false,
    responsive: {
        0: {
            items: 2,
        },
        600: {
            items: 4,
        },
        1000: {
            items: 6,
        },
    },
});
