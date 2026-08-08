// ================= DEFAULT PRODUCTS =================

let defaultProducts = [
    {
        id: 1,
        title: "iPhone 16 Pro",
        price: 119999,
        category: "Mobile",
        image: "https://media-ik.croma.com/Croma%20Assets/Communication/Mobiles/Images/309733_0_mr0ju4.png"
    },
    {
        id: 2,
        title: "Summer Clothes",
        price: 900,
        category: "Clothes",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScYhbi0ld4GIMKwYjknazeYkolsuLRZ2YZnjiXIOW5Z7j87UTF7I8VQdPz&s=10"
    },
    {
        id: 3,
        title: "JBL Flip 7 Bluetooth Speaker",
        price: 12999,
        category: "Speaker",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFnTJo9wX1wgNIVNIAWxuk0LzTJ9opfp9TN-Fn-9SqCg&s"
    },
    {
        id: 4,
        title: "Sony WH-1000XM5 Headphones",
        price: 4490,
        category: "Headphones",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuTIcnlCEc1-60KGyZL_nyLo5TWz9Bb-Ba-52mlu77917kXeJpHfBwUj0&s=10"
    },
    {
        id: 5,
        title: "Google Pixel 9 Pro",
        price: 114880,
        category: "Mobile",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiR8wSf6ioYKfJitgP2TdPnj0FL1Aru_A5lnGqr1JFaLxHjqZN_M08K9z-&s=10"
    },
    {
        id: 6,
        title: "Canon EOS R50 Camera",
        price: 69949,
        category: "Camera",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvBM2KNF-qu3ow_Klde5PK2RIZ0d7YaF9l_RAGiqNku6DXj1gayf_pRBzU&s=10"
    },
    {
        id: 7,
        title: "Croma Buds",
        price: 1649,
        category: "Buds",
        image: "https://media.tatacroma.com/Croma%20Assets/Communication/Headphones%20and%20Earphones/Images/248627_0_s9yj30.png"
    },
    {
        id: 8,
        title: "HP Wireless Mouse",
        price: 644,
        category: "Mouse",
        image: "https://www.hpshop.co.za/cdn/shop/files/8b383a45-c686-4556-a0d8-df8fe590695d_332090.jpg?v=1755748815&width=1500"
    },
    {
        id: 9,
        title: "Rolex",
        price: 1518112,
        category: "Watch",
        image: "https://www.ctpundole.com/rolex-assets/images/model_gallery_assets_landscape/Slide1_landscape/m126610ln-0001.webp"
    },
    {
        id: 10,
        title: "Anker PowerCore",
        price: 3499,
        category: "Power Bank",
        image: "https://m.media-amazon.com/images/I/51y5dlkTfpL.AC_UF1000,1000_QL80.jpg"
    },
    {
        id: 11,
        title: "Nike Shoes",
        price: 3650,
        category: "Shoes",
        image: "https://m.media-amazon.com/images/I/71ApDSO83QL.AC_UY1000.jpg"
    },
    {
        id: 12,
        title: "HP Laptop",
        price: 32295,
        category: "Laptop",
        image: "https://i5.walmartimages.com/asr/8c904bb0-d40b-4300-abf2-bd6df2179ca6_2.8857a0b66e26a3c87d44fdb535252915.jpeg"
    }
];


// ================= LOCAL STORAGE =================

// Pehle localStorage check karo
let products = JSON.parse(localStorage.getItem("products"));

// Agar products nahi mile ya array nahi hai
if (!Array.isArray(products) || products.length === 0) {

    products = [...defaultProducts];

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );
}


// ================= EDIT ID =================

let editId = null;


// ================= DOM ELEMENTS =================

let productForm = document.getElementById("productForm");

let title = document.getElementById("title");
let price = document.getElementById("price");
let image = document.getElementById("image");
let category = document.getElementById("category");

let submitBtn = document.getElementById("submitBtn");

let search = document.getElementById("search");
let filter = document.getElementById("filter");
let sort = document.getElementById("sort");

let productList = document.getElementById("productList");


// ================= DISPLAY PRODUCTS =================

function displayProducts(data) {

    let output = "";

    if (!data || data.length === 0) {

        output = `
            <h2 style="
                grid-column: 1/-1;
                text-align: center;
                color: #777;
            ">
                No Products Found
            </h2>
        `;

    } else {

        data.forEach(product => {

            output += `
                <div class="product-card">

                    <div class="product-image">

                        <img 
                            src="${product.image}" 
                            alt="${product.title}"
                            onerror="this.src='https://via.placeholder.com/200?text=No+Image'"
                        >

                    </div>

                    <div class="product-info">

                        <span class="category-badge">
                            ${product.category}
                        </span>

                        <h3>
                            ${product.title}
                        </h3>

                        <p class="price">
                            ₹${Number(product.price).toLocaleString("en-IN")}
                        </p>

                        <div class="card-actions">

                            <button
                                type="button"
                                class="edit-btn"
                                onclick="editProduct(${product.id})"
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                class="delete-btn"
                                onclick="deleteProduct(${product.id})"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>
            `;
        });
    }

    productList.innerHTML = output;
}


// ================= ADD / UPDATE PRODUCT =================

productForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let product = {

        id: editId !== null ? editId : Date.now(),

        title: title.value.trim(),

        price: Number(price.value),

        image: image.value.trim(),

        category: category.value.trim()

    };


    // Validation

    if (
        product.title === "" ||
        product.price <= 0 ||
        product.image === "" ||
        product.category === ""
    ) {

        alert("Please fill all fields correctly!");

        return;
    }


    // UPDATE PRODUCT

    if (editId !== null) {

        products = products.map(item => {

            if (item.id == editId) {
                return product;
            }

            return item;
        });

        editId = null;

        submitBtn.innerText = "Add Product";

    }

    // ADD PRODUCT

    else {

        products.push(product);

    }


    // Save in LocalStorage

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );


    // Clear form

    productForm.reset();


    // Display

    applyFilters();

});


// ================= EDIT PRODUCT =================

window.editProduct = function (id) {

    let product = products.find(item => item.id == id);

    if (!product) {
        return;
    }


    title.value = product.title;

    price.value = product.price;

    image.value = product.image;

    category.value = product.category;


    editId = id;

    submitBtn.innerText = "Update Product";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

};


// ================= DELETE PRODUCT =================

window.deleteProduct = function (id) {

    let confirmDelete = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
        return;
    }


    products = products.filter(
        item => item.id != id
    );


    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );


    applyFilters();

};


// ================= SEARCH / FILTER / SORT =================

function applyFilters() {

    let data = [...products];


    // SEARCH

    if (search && search.value.trim() !== "") {

        let searchValue =
            search.value.toLowerCase().trim();

        data = data.filter(item =>

            item.title
                .toLowerCase()
                .includes(searchValue)

        );
    }


    // CATEGORY FILTER

    if (
        filter &&
        filter.value !== "" &&
        filter.value !== "All"
    ) {

        data = data.filter(item =>

            item.category.toLowerCase() ===
            filter.value.toLowerCase()

        );
    }


    // SORT

    if (sort) {

        if (sort.value === "low") {

            data.sort(
                (a, b) =>
                    Number(a.price) -
                    Number(b.price)
            );

        }

        else if (sort.value === "high") {

            data.sort(
                (a, b) =>
                    Number(b.price) -
                    Number(a.price)
            );

        }

    }


    displayProducts(data);

}


// ================= EVENTS =================

if (search) {

    search.addEventListener(
        "input",
        applyFilters
    );

}


if (filter) {

    filter.addEventListener(
        "change",
        applyFilters
    );

}


if (sort) {

    sort.addEventListener(
        "change",
        applyFilters
    );

}



applyFilters();