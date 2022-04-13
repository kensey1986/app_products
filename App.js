import {
  Product
} from "./Product.js";
import {
  UI
} from "./UI.js";



document.addEventListener('DOMContentLoaded', (e) => {
  productList(e);
})

// const list = new ApiMethods()
let listProduct = [];

function productList(e) {
  e.preventDefault();
  const ui = new UI();
  ui.listProducts();
  ui.resetForm();
}

// DOM Events
document
  .getElementById("product-form")
  .addEventListener("submit", function (event) {
    saveProduct(event);
  });

async function saveProduct(event) {
  
  event.preventDefault();
  // Getting Form Values
  const name = document.getElementById("name").value,
    price = document.getElementById("price").value,
    cantidad = document.getElementById("cantidad").value,
    year = document.getElementById("year").value;

  const idGenerado = idGenerated();

  const product = new Product(name, price, year, cantidad);
  
  // Create a new UI instance
  const ui = new UI();

  // Input User Validation
  if (name === "" || price === "" || year === "" || cantidad === "" ) {

    return ui.showMessage("Campos Vacios!", "danger");
  }
  ui.addProduct(product);
 
}

document.getElementById("product-list").addEventListener("click", async (event) => {
  await trabajandoData(event);

});

async function trabajandoData(e) {
  e.preventDefault();
  const ui = new UI();
  
  if (e.target.name === "edit") {
    const idEdit = e.target.id;
    ui.editProduct(e.target, idEdit);
  }

  if (e.target.name === "delete") {
      const idEliminar = e.target.id;
      ui.deleteProduct(e.target, idEliminar);
  }
}

document.getElementById("bntEdit").addEventListener("click", async (e) => {
  e.preventDefault();

  try {
      const resp = await updateProduct(product);

      if (resp.status === 200) {
          console.log('actualizo producto')
      }
  } catch (error) {
    
  }



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




const updateProduct = async (product) => {
  /**
   * destructuracion
   */
  const {
    name,
    price,
    cantidad,
    year,
    id
  } = product;

  return new Promise(async (resolve, reject) => {
    const body = {
      "name": name,
      "price": price,
      "cantidad": cantidad,
      "year": year,
      "categoryId": 1
    };
    try {
      const fetchOptions = {
        body: JSON.stringify(body),
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        mode: 'cors'
      };

      const fetchResult = await fetch(`http://localhost:3000/products/${id}`, fetchOptions);
      console.log(fetchResult.ok);
      if (!fetchResult.ok) {
        console.log('aqui ocurrio un error');
        // reject({status: 301, errorMsn: 'Dato Duplicado'});
        reject(fetchResult);
      }
      const fetchResultData = await fetchResult.json();

      resolve({
        status: 201,
        exitoMsn: 'Producto creado correctamente!'
      });
    } catch (error) {
      console.log('estoy catch voy a retornar ', error)
      reject({
        status: 500,
        errorMsn: 'Error al crear producto, Fallo la conexion con el servidor'
      });
    }
  });
};