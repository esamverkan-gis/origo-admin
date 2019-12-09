export class Layer {
  constructor(config_id) {
    this.id = -1;
    this.name = "";
    this.name_id = "";
    this.title = "";
    this.format = "";
    this.queryable = "";
    this.visible = false;
    this.type = "";
    this.attribution = "";
    this.order_number = "";
    this.copyright = "";
    this.config_id = config_id;
    this.attributes = [];
    this.group_id = null;
    this.source_id = null;
    this.style_id = null;
  }
}