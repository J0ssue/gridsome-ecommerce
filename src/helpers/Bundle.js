export default class Bundle {
  constructor(type = 'bundle', price = 100, description = 'description') {
    this.type = type;
    this.price = price;
    this.description = description;
  }

  dump() {
    console.log(this.type);
    console.log(this.price);
    console.log(this.description);
  }
};