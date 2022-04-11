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
  // console.log( arrayProducts.length)
  // console.log( arrayProducts)
  const condicion = (arrayProducts.length > 0 && arrayProducts !== undefined)
  // nueva instancia de mi interfaz
  const ui = new UI();

  if (condicion) {
    // console.log('ingreso');
    // const arrayProducts = JSON.parse(localStorage.getItem('listProduct'));
    // console.log(arrayProducts)
    listProduct = arrayProducts;
    ui.listProducts(arrayProducts);
    ui.resetForm();
  } else {
    ui.showMessage("Fallo la consulta no hay conexion el servidor!", "info");
    console.error(' fallo consulta no hay conexion con el servidor');
  }

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

  // console.log(listProduct);
  //envio mi array de objetos productos al local storage
  let result;
  try {
    result = await saveProductDb(product);
    console.log(result);
    // Save Product
    ui.addProduct(product);
    listProduct.push(product);
    /**
     * muestro el mensaje que envio desde mi funcion fecth de crear 
     * productos
     */
    ui.showMessage(result.exitoMsn, "success");
    ui.resetForm();
  } catch (error) {
    console.log('dice que tiene un error ', error);
    ui.showMessage(error.errorMsn, "danger");
  }
  // localStorage.setItem('listProduct', JSON.stringify(listProduct));
}

document.getElementById("product-list").addEventListener("click", (event) => {

  trabajandoData(event);
  

});

async function  trabajandoData  (e){
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
      
    /**
     * llamamos a nuestra funcion para eliminar un producto
     * y enviamos como argumento el ID del producto (idProduct)
     */
    
    try {
      
        const resp = await deleteProduct(2);
        console.log(resp);
        ui.showMessage(result.exitoMsn, "success");
        ui.deleteProduct(e.target);
        const idEliminar = e.target.id;
        // listProduct = listProduct.filter((element) => element.id !== idEliminar);

     } catch (error) {
      console.log('mensaje error elimando ', error);
      ui.showMessage(error.errorMsn, "danger");
     }

    
    // localStorage.setItem('listProduct', JSON.stringify(listProduct));

  }
  e.preventDefault();

 }

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

//  async function fetchData(){

//  }
const fetchData = async () => {
  const error = 'No fue posible cargar la lista de productos';

  try {
    const res = await fetch('http://localhost:3000/products');
    // console.log('respeusta de consulta listado', res);

    if (res !== undefined && res.status === 200) {
      const result = await res ? res.json() : null
      // console.log(result);
      return result;
    } else {
      return error;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}


const saveProductDb = async (product) => {
  /**
   * destructuracion
   */
  const {
    name,
    price,
    cantidad,
    year
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
        method: 'POST',
        mode: 'cors'
      };
      let fetchResultData = null;

      const fetchResult = await fetch('http://localhost:3000/products', fetchOptions);
      console.log(fetchResult.ok);
      if (!fetchResult.ok) {
        console.log('aqui ocurrio un error');
        // reject({status: 301, errorMsn: 'Dato Duplicado'});
        reject(fetchResult);
      }
      fetchResultData = await fetchResult.json();

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

const deleteProduct = async (idProduct) => {
  console.log(idProduct);
  return new Promise(async (resolve, reject) => {
    try {
      const fetchOptions = {
        cache: 'no-cache',
        method: 'DELETE',
        mode: 'cors'
      };
      let fetchResultData = null;

      const fetchResult = await fetch(`http://localhost:3000/${idProduct}`, fetchOptions);
      console.log(fetchResult);
      if (!fetchResult.ok) {
        console.error('Aqui ocurrio un error al eliminar');
        reject({status: 404, errorMsn: 'No ha sido posible Eliminar este producto'});
        // reject(fetchResult);
      }
      fetchResultData = await fetchResult.json();

      resolve({
        status: 201,
        exitoMsn: 'Producto Eliminado correctamente!'
      });
    } catch (error) {
      console.log('estoy catch voy a retornar ', error)
      reject({
        status: 500,
        errorMsn: 'Error al eliminar el producto, Fallo la conexion con el servidor'
      });
    }
  });
};