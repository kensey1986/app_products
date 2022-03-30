/**
 * Product Class
 */
export class Product {
  /**
   *
   * @param {string} name The Product Name
   * @param {number} price The Product Price
   * @param {number} year The year creation of the Product
   */
  constructor(name, price, year, cantidad) {
    this.name = name;
    this.price = price;
    this.cantidad = cantidad;
    this.year = year;
  }
}

