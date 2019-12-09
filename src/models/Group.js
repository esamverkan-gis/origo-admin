export class Group {
  constructor(configId) {
    this.id = null;
    this.name = "";
    this.title = "";
    this.parent = "";
    this.expanded = false;
    this.config_id = configId;
    this.order_number = 0;
  }
}