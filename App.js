import {
  Product
} from "./Product.js";
import {
  UI
} from "./UI.js";


document.addEventListener('DOMContentLoaded', () => {
  productList();
})


let listProduct = [];

async function productList() {
  // llamado a mi api json-serve
  const arrayProducts = await fetchData();
  // nueva instancia de mi interfaz
  const ui = new UI();
  // const arrayProducts = JSON.parse(localStorage.getItem('listProduct'));
  // console.log(arrayProducts)
  if (arrayProducts) {
    listProduct = arrayProducts;
    ui.listProducts(arrayProducts);
  }
  ui.resetForm();
}
// arrayProducts? listProduct.push(arrayProducts): null;
// DOM Events
document
  .getElementById("product-form")
  .addEventListener("submit", function (event) {
    saveProduct(event);
  });

async function saveProduct(event) {
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
  const idGenerado = idGenerated();

  const product = new Product(name, price, year, cantidad, idGenerado);
  // console.log('===========product=========================');
  // console.log(product);
  // console.log('====================================');
  // Create a new UI instance
  const ui = new UI();

  // Input User Validation
  if (name === "" || price === "" || year === "" || cantidad === "" || idGenerado === "") {

    return ui.showMessage("Campos Vacios!", "danger");
  }
  // Save Product
  const res = ui.addProduct(product);
  listProduct.push(product);
  // console.log(listProduct);
  //envio mi array de objetos productos al local storage
  saveProductDb(product);
  localStorage.setItem('listProduct', JSON.stringify(listProduct));
  ui.showMessage("Producto Agregado", "success");
  ui.resetForm();
}

document.getElementById("product-list").addEventListener("click", (e) => {
  const ui = new UI();
  // console.log('====================================');
  // console.log(e.target.id);
  // console.log('====================================');

  if (e.target.name === "edit") {
    const idEdit = e.target.id;
    // console.log("🚀 ~ file: App.js ~ line 84 ~ document.getElementById ~ idEdit", idEdit)

    const listItem = listProduct.filter((element) => element.id === idEdit);
    // console.log('=============listItem=======================');
    // console.log(listItem);
    // console.log('====================================');
    const item = listItem[0];
    console.log("🚀 ~ file: App.js ~ line 92 ~ document.getElementById ~ item", item)

    ui.editProduct(e.target, item);

    // element.parentElement.parentElement.remove();
    // this.showMessage("Producto Eliminado!", "success");
  }
  if (e.target.name === "delete") {

    ui.deleteProduct(e.target);
    const idEliminar = e.target.id;
    listProduct = listProduct.filter((element) => element.id !== idEliminar);
    localStorage.setItem('listProduct', JSON.stringify(listProduct));

  }
  e.preventDefault();


});


document.getElementById("bntEdit").addEventListener("click", (e) => {
  e.preventDefault();

  saveProduct(e);
  const ui = new UI();

  ui.deleteProduct(e.target);
  const idEliminar = e.target.id;

  listProduct = listProduct.filter((element) => element.id !== idEliminar);
  localStorage.setItem('listProduct', JSON.stringify(listProduct));
  const btnSave = document.getElementById('btnSave');

  // console.log("🚀 ~ file: UI.js ~ line 69 ~ UI ~ editProduct ~ bntEdit", bntEdit)

  btnSave.setAttribute("class", "btn btn-secondary btn-block rounded show-btn");

  const bntEdit = document.getElementById('bntEdit');
  // console.log("🚀 ~ file: UI.js ~ line 65 ~ UI ~ editProduct ~ btnSave", btnSave)
  bntEdit.setAttribute("class", "hidden-btn");

});

function idGenerated() {
  let id = new Date();
  // console.log('====================================');
  // console.log(id);
  // console.log('====================================');
  id = id + "";
  id = id.split(':', 3);
  let idParte1 = id[1];
  // console.log("🚀 ~ file: App.js ~ line 22 ~ productList ~ idParte1", idParte1)
  let idParte2 = id[2].split(' ', 1);
  idParte2 = idParte2[0];
  // console.log("🚀 ~ file: App.js ~ line 24 ~ productList ~ idParte2", idParte2)

  id = idParte1 + idParte2;
  return id;
}

const fetchData = async () => {
  try {
    const res = await fetch(`http://localhost:3000/products`)
    // console.log(res);
    const data = await res.json()
    return data;
  } catch (error) {
    console.error(error);
  }
}


const saveProductDb = async (product) => {
  console.log(product);
  return new Promise(async (resolve, reject) => {
    const body = {
        "name": "leche entera prueba",
        "price": 5.55,
        "cantidad": 35,
        "year": 2021,
        "categoryId": 1
    };
    try {
      const fetchOptions = {
        body: JSON.stringify(body),
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        mode: 'cors'
      };
      let fetchResultData = null;

      const fetchResult = await fetch('http://localhost:3000/products', fetchOptions);

      if (!fetchResult.ok) {
        reject(fetchResult);
      }

      fetchResultData = await fetchResult.json();
      

      // if (error.codigoError) {
      //   reject(error);

      //   return;
      // }

     
      resolve('ok');
    } catch (error) {
      reject(error);
    }
  });
};