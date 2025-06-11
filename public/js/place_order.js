let item_in_cart = [];

const metaTag = document.querySelector('meta[name="menu-data"]');
const to_menu_page = JSON.parse(metaTag.getAttribute('content'));
console.log('Menu:', to_menu_page);

for (let element of document.getElementsByClassName("add-to-cart")){
    let id = Number(element.id);
    element.addEventListener("click", ()=>{
        if(item_in_cart.find((item)=>item.item_id === id)){
            const item_index = item_in_cart.findIndex(item=> item.item_id === id);
            element.innerText = "add to cart";
            item_in_cart.splice(item_index, 1);
            console.log(item_in_cart);
        }
        else{
            console.log("its not in cart");
            let new_item_for_cart = {
                item_id:id,
                item_name:(to_menu_page.result.find((element)=>element.item_id ===id)).item_name,
                price:(to_menu_page.result.find((element)=>element.item_id === id)).price,
                quantity:1,
                instruction:null
            }
            element.innerText = "remove"
            item_in_cart.push(new_item_for_cart);
            console.log(item_in_cart);
        }
    })
}

const to_cart_button = document.getElementsByClassName("to_cart_button")[0];
to_cart_button.addEventListener("click", ()=>{
    sessionStorage.setItem("to_menu_page", JSON.stringify(to_menu_page));
    sessionStorage.setItem("item_in_cart", JSON.stringify(item_in_cart));
    window.location.href="/static/cart";
})
