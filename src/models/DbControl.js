export class DbControl {
    constructor(control, configId) {

        if (control.id)
            this.id = control.id;
        this.name = control.name;
        let options = {};
        control.options.forEach(function (option) {
            options[option.name] = option.value || option.defaultValue;
        });
        this.options = JSON.stringify(options);
        this.config_id = configId;
    }
}