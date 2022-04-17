export class QueryApi {

  constructor() {
    const URL = ' http://localhost:3000/products';
    this.URL = URL;
  }

  listProducts = async () => {
    try {
      const res = await fetch(this.URL);
      if (!res.ok) {
        console.log('aqui ocurrio un error');
        return {
          errorMsn: 'Ha ocurrido un problema al cargar los datos'
        }
      }
      const result = await res.json()
      return result;
    } catch (error) {
      return {
        status: 500,
        errorMsn: 'Ha ocurrido un problema al conectar con el servidor'
      }
    }
  }

  saveProductDb = async (product) => {
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

        const fetchResult = await fetch(this.URL, fetchOptions);
        if (!fetchResult.ok) {
          reject({
            status: 301,
            errorMsn: 'Dato Duplicado'
          });
          // reject(fetchResult);
        }
        fetchResultData = await fetchResult.json();

        resolve({
          status: 201,
          exitoMsn: 'Producto creado correctamente!'
        });
      } catch (error) {
        reject({
          status: 500,
          errorMsn: 'Error al crear producto, Fallo la conexion con el servidor'
        });
      }
    });
  };

   deleteProduct = async (idProduct) => {
    return new Promise(async (resolve, reject) => {
      try {
        const fetchOptions = {
          cache: 'no-cache',
          method: 'DELETE',
          mode: 'cors'
        };
  
        const fetchResult = await fetch(`${this.URL}/${idProduct}`, fetchOptions);
        if (!fetchResult.ok) {
          reject({
            status: 404,
            errorMsn: 'No ha sido posible Eliminar este producto'
          });
          // reject(fetchResult);
        }
        fetchResultData = await fetchResult.json();
  
        resolve({
          status: 201,
          exitoMsn: 'Producto Eliminado correctamente!'
        });
      } catch (error) {
        reject({
          status: 500,
          errorMsn: 'Error al eliminar el producto, Fallo la conexion con el servidor'
        });
      }
    });
  };

    getProductById = async (idProduct) => {

    return new Promise(async (resolve, reject) => {
  
      try {
        const fetchOptions = {
          cache: 'no-cache',
          method: 'GET',
          mode: 'cors'
        };
  
        const fetchResult = await fetch(`${this.URL}/${idProduct}`, fetchOptions);
        if (!fetchResult.ok) {
          reject({
            status: 301,
            errorMsn: 'fallo la carga del producto'
          });
          // reject(fetchResult);
        }
        const fetchResultData = await fetchResult.json();
        // console.log(fetchResultData);
        resolve({
          status: 200,
          exitoMsn: 'Producto consultado correctamente!',
          result: fetchResultData
        });
      } catch (error) {
        reject({
          status: 500,
          errorMsn: 'Error al consultar producto, Fallo la conexion con el servidor'
        });
      }
    });
  };

  updateProduct = async (product, idProduct) => {
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
          method: 'PUT',
          mode: 'cors'
        };
        let fetchResultData = null;

        const fetchResult = await fetch(`${this.URL}/${idProduct}`, fetchOptions);
        if (!fetchResult.ok) {
          reject({
            status: 301,
            errorMsn: 'Dato Duplicado'
          });
          // reject(fetchResult);
        }
        fetchResultData = await fetchResult.json();

        resolve({
          status: 201,
          exitoMsn: 'Producto Actualizado correctamente!'
        });
      } catch (error) {
        reject({
          status: 500,
          errorMsn: 'Error al crear producto, Fallo la conexion con el servidor'
        });
      }
    });
  };
}

/**
 * User Interface Class
 */
export class UI {


  async listProducts() {
    // creo una instancia
    const list = new QueryApi();
    try {
      const resp = await list.listProducts();
      if (resp === null || resp === []) {
        this.showMessage("Problema al cargar listado de productos!", "info");
      }
      resp?.forEach(product => {
        renderizarProduct(product);
      });
    } catch (error) {
      this.showMessage("Fallo la conexion con el servidor!", "info");
    }
  }

  /**
   * Add a New Product
   * @param {Object} product A new product Object
   */
   async addProduct(product) {

    const saveProduct= new QueryApi();

    try {
         const resp =  await saveProduct.saveProductDb(product);
         if (resp.status === 201) {
          this.showMessage(resp.exitoMsn, "success");
          renderizarProduct(product);

         } else {
          this.showMessage(resp.errorMsn, "info");
         }
    } catch (error) {
      this.showMessage("Fallo la conexion con el servidor!", "info");
    }

   
    
  }

  /**
   * Reset Form Values
   */
  resetForm() {
    document.getElementById("product-form").reset();
  }


  async deleteProduct(element, idProduct) {

    const deleteP = new QueryApi();
      try {
           const resp = await deleteP.deleteProduct(idProduct);
           if (resp.status === 201) {

             this.showMessage(resp.exitoMsn, "success");
              element.parentElement.parentElement.remove();
              this.showMessage("Producto Eliminado!", "success");

            } else {
             this.showMessage(resp.errorMsn, "danger");
            }
          } catch (error) {
            this.showMessage(resp.errorMsn, "danger");
        }
  }

  async editProduct(element, idProduct) {
  
    const updateProduct = new QueryApi();
    try {
         const resp =  await updateProduct.getProductById(idProduct);
         console.log(resp);
         if (resp.status!== 200) {
           this.showMessage(resp.errorMsn, "danger");
         } 
         localStorage.setItem('idProductEdit', resp.result.id)
         cargarData(element, resp.result);
    } catch (error) {
      this.showMessage(resp.errorMsn, "danger");
      
    }
    

  }

  async updateProduct(product) {

    const updateProductDB= new QueryApi();
    const idProduct = localStorage.getItem('idProductEdit')

    try {
         const resp =  await updateProductDB.updateProduct(product, idProduct);
         if (resp.status === 201) {
          this.showMessage(resp.exitoMsn, "success");
          renderizarProduct(product);

         } else {
          this.showMessage(resp.errorMsn, "info");
         }
    } catch (error) {
      this.showMessage("Fallo la conexion con el servidor!", "info");
    }

   
    
  }
  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-2`;
    div.appendChild(document.createTextNode(message));

    // Show in The DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#App");

    // Insert Message in the UI
    container.insertBefore(div, app);

    // Remove the Message after 3 seconds
    // setTimeout(function () {
    //   document.querySelector(".alert").remove();
    // }, 2000);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 5000);
  }
}


/**
 * 
 * @param {product} recibe un objeto de producto 
 */

function renderizarProduct(product) {
  const productList = document.getElementById("product-list");

  const element = document.createElement("div");

  element.innerHTML = `
          <div class="card text-center mb-4">
              <div class="card-body">
                  <strong>Producto</strong>: ${product.name} -
                  <strong>Precio</strong>: ${product.price} -
                  <strong>Cantidad</strong>: ${product.cantidad} -
                  <strong>Año</strong>: ${product.year}
                  <a href="#" id=${product.id} class="btn btn-danger rounded" name="delete">Borrar</a>
                  <a href="#" id=${product.id} class="btn btn-info rounded" name="edit">Editar</a>
              </div>
          </div>
      `;
  productList.appendChild(element);
}

function cargarData (element, product){
  /**
   * aqui lleno el formulario con los datos del producto a
   */
  document.getElementById('name').value = product.name;
  document.getElementById('price').value = product.price;
  document.getElementById('cantidad').value = product.cantidad;
  document.getElementById('year').value = product.year;
  /**
   * trabajo con los botones
   */
  const btnSave = document.getElementById('btnSave');
  btnSave.setAttribute("class", "hidden-btn");

  /**
   * oculto el item
   */
  element.parentElement.parentElement.setAttribute("class", "hidden-btn");
  const bntEdit = document.getElementById('bntEdit');
  bntEdit.setAttribute("class", "btn btn-success btn-block rounded show-btn");
 
  }