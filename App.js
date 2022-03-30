import { Product } from "./Product.js";
import { UI } from "./UI.js";

// DOM Events
document
  .getElementById("product-form")
  .addEventListener("submit", function (event) {
    // console.log('====================================');
    // console.log(event);
    // console.log('====================================');
    // Override the default Form behaviour
    event.preventDefault();

    // Getting Form Values
    const name = document.getElementById("name").value,
      price = document.getElementById("price").value,
      cantidad = document.getElementById("cantidad").value,
      year = document.getElementById("year").value;
     
    //  console.log(document.getElementById("cantidad"))
    // Create a new Oject Product
    // const product = new Product(name, price, year, 5);

    const product = new Product(name, price, year, cantidad);

    // Create a new UI instance
    const ui = new UI();

    // Input User Validation
    if (name === "" || price === "" || year === "" || cantidad ==="" ) {
      
        return ui.showMessage("Campos Vacios!", "danger");
    }

    // Save Product
    const res=  ui.addProduct(product);
    ui.showMessage("Producto Agregado", "success");
    ui.resetForm();
  });

document.getElementById("product-list").addEventListener("click", (e) => {
  const ui = new UI();
  // console.log('====================================');
  // console.log(e.target);
  // console.log('====================================');
  ui.deleteProduct(e.target);
  e.preventDefault();
});
