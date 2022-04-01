import {
  Product
} from "./Product.js";
import {
  UI
} from "./UI.js";


document.addEventListener('DOMContentLoaded', () => { productList(); })


let listProduct = [];

function productList(){
  
  const ui = new UI();
  const arrayProducts = JSON.parse(localStorage.getItem('listProduct'));
  // console.log(arrayProducts)
  if (arrayProducts) {
    listProduct=arrayProducts;
    ui.listProducts(arrayProducts);
  }
}
// arrayProducts? listProduct.push(arrayProducts): null;
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
    const idGenerado= idGenerated();
    console.log('====================================');
    console.log(idGenerado);
    console.log('====================================');
    const product = new Product(name, price, year, cantidad, idGenerado);

    // Create a new UI instance
    const ui = new UI();

    // Input User Validation
    if (name === "" || price === "" || year === "" || cantidad === "" || idGenerado === "" ) {

      return ui.showMessage("Campos Vacios!", "danger");
    }
    // Save Product
    const res = ui.addProduct(product);
    listProduct.push(product);
    // console.log(listProduct);
    //envio mi array de objetos productos al local storage
    localStorage.setItem('listProduct', JSON.stringify(listProduct));
    ui.showMessage("Producto Agregado", "success");
    ui.resetForm();
  });

document.getElementById("product-list").addEventListener("click", (e) => {
  const ui = new UI();
  console.log('====================================');
  console.log(e.target.id);
  console.log('====================================');
  ui.deleteProduct(e.target);
  e.preventDefault();
  const idEliminar = e.target.id;
  listProduct = listProduct.filter(  (element) => element.id !== idEliminar  );
  localStorage.setItem('listProduct', JSON.stringify(listProduct));
});

function idGenerated(){
  let id = new Date();
  // console.log('====================================');
  // console.log(id);
  // console.log('====================================');
  id= id+"";
  id= id.split(':',3);
  let idParte1 = id[1];
  // console.log("🚀 ~ file: App.js ~ line 22 ~ productList ~ idParte1", idParte1)
  let idParte2 = id[2].split(' ',1);
  idParte2= idParte2[0];
  // console.log("🚀 ~ file: App.js ~ line 24 ~ productList ~ idParte2", idParte2)
  
  id = idParte1+idParte2;
  return id;
}