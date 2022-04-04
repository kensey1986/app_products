/**
 * User Interface Class
 */
export class UI {

  listProducts(listadoDeProductos){
    console.log('listando productos', listadoDeProductos);
    listadoDeProductos?.forEach(product => {
      this.addProduct(product);
    });

  }
  /**
   * Add a New Product
   * @param {Object} product A new product Object
   */
  addProduct(product) {

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

  /**
   * Reset Form Values
   */
  resetForm() {
    document.getElementById("product-form").reset();
  }


  deleteProduct(element) {
    if (element.name === "delete") {
      console.log(element.parentElement);
      console.log(element.parentElement.parentElement);

      element.parentElement.parentElement.remove();
      this.showMessage("Producto Eliminado!", "success");
    }
  }

  editProduct(element, item) {
      // console.log('============entro a editar========================');
      // console.log(element);
      // console.log('====================================');
      // console.log('============item========================');
      // console.log(item);
      // console.log('====================================');
      /**
       * aqui lleno el formulario con los datos del producto a
       */
      document.getElementById('name').value = item.name;
      document.getElementById('price').value = item.price;
      document.getElementById('cantidad').value = item.cantidad;
      document.getElementById('year').value = item.year;
      /**
       * trabajo con los botones
       */
      const btnSave=document.getElementById('btnSave');
      // console.log("🚀 ~ file: UI.js ~ line 65 ~ UI ~ editProduct ~ btnSave", btnSave)
      btnSave.setAttribute("class", "hidden-btn");

      /**
       * oculto el item
       */
      element.parentElement.parentElement.setAttribute("class", "hidden-btn");


      const bntEdit=document.getElementById('bntEdit');

      // console.log("🚀 ~ file: UI.js ~ line 69 ~ UI ~ editProduct ~ bntEdit", bntEdit)

      bntEdit.setAttribute("class", "btn btn-success btn-block rounded show-btn");
      // element.parentElement.parentElement.remove();
      // this.showMessage("Producto Eliminado!", "success");

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
    setTimeout( () => {
      document.querySelector(".alert").remove();
    }, 2000);
  }
}
