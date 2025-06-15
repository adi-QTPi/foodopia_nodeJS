// const { render } = require("ejs");

const to_menu_page = JSON.parse(sessionStorage.getItem("to_menu_page"));
const item_in_cart = JSON.parse(sessionStorage.getItem("item_in_cart"));


console.log(to_menu_page);
console.log(item_in_cart);

async function show_user_details(to_menu_page){
    const curr_name = document.getElementsByClassName("curr_name")[0];
    const curr_user_name = document.getElementsByClassName("curr_user_name")[0];
    const curr_role = document.getElementsByClassName("curr_role")[0];

    curr_name.innerText = `Name -> ${to_menu_page.user.name}`;
    curr_user_name.innerText = `User Name -> ${to_menu_page.user.user_name}`;
    curr_role.innerText = `Role -> ${to_menu_page.user.role}`;
}

async function render_cart(item_in_cart){
    const cart_space = document.getElementsByClassName("cart_space")[0];
    cart_space.innerHTML = ``;
    for (let items of item_in_cart){
        let new_el = document.createElement("tr");
        new_el.classList.add("cart_item");
        let sub_total=items.quantity * items.price;
        new_el.innerHTML = `
        <td class="item-name">${items.item_name}</td>
        <td class="quantity">
            <button type="button" class="qty-btn minus-btn" data-item-id="${items.item_id}">-</button>
            <span class="qty-display">${items.quantity}</span>
            <button type="button" class="qty-btn plus-btn" data-item-id="${items.item_id}">+</button>
        </td>
        <td class="subtotal">${sub_total}</td>
        <td class="instruction">
            <input type="text" class="item_instruction_input" data-item-id="${items.item_id}">
        </td>
        <td class="quantity">
            <button type="button" class="delete-btn">Delete</button>
        </td>
        `;
        cart_space.appendChild(new_el);

        const minus_button = new_el.querySelector(".minus-btn");
        const plus_button = new_el.querySelector(".plus-btn");
        const delete_button = new_el.querySelector(".delete-btn");
        const quantity_space = new_el.getElementsByClassName("qty-display")[0];
        const subtotal_space = new_el.getElementsByClassName("subtotal")[0];

        minus_button.addEventListener("click", () => {
            if (items.quantity > 1){
                items.quantity--;
                quantity_space.innerText = items.quantity; 
                subtotal_space.innerText = items.quantity * items.price;
            }
            else {
                quantity_space.innerText = items.quantity;
                subtotal_space.innerText = items.quantity * items.price;
            }
        });
        
        plus_button.addEventListener("click", () => {
            items.quantity++;
            quantity_space.innerText = items.quantity;
            subtotal_space.innerText = items.quantity * items.price;
        });

        delete_button.addEventListener("click", ()=>{
            const item_index = item_in_cart.findIndex(item => item.item_id === items.item_id);

            if(item_index !== -1){
                item_in_cart.splice(item_index,1);
                sessionStorage.setItem("item_in_cart", JSON.stringify(item_in_cart));
                new_el.remove();
            }
        })
    }
}

//page rendering
show_user_details(to_menu_page);
render_cart(item_in_cart);



const cart_form = document.getElementsByClassName("cart_form")[0];
cart_form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const item_instruction_input = document.getElementsByClassName("item_instruction_input");

    for (let input of item_instruction_input){
        const item_id = Number(input.getAttribute("data-item-id"));
        const instruction_from_form = input.value.trim();

        const item_index = item_in_cart.findIndex(item => item.item_id === item_id);

        if(item_index !== -1){
            item_in_cart[item_index].instruction = instruction_from_form;
        }
    }

    sessionStorage.setItem("item_in_cart", JSON.stringify(item_in_cart));

    console.log("form submit button pressed...");
    console.log(item_in_cart);

    fetch("/api/orders", {
    method: "POST",
    body: JSON.stringify(item_in_cart),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    .then((response) => response.json())
    .then((data)=>{
        // alert("New order placed !");
        // setTimeout(()=>{
        // },2000);
        console.log(data);
        window.location.href="/static/orders"
    })
    // .then((json) => console.log(json))
    .catch((err)=>console.log("error:", err));
})