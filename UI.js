/**
 * User Interface Class
 */
export class UI {

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
                    <a href="#" class="btn btn-danger rounded" name="delete">Borrar</a>
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
