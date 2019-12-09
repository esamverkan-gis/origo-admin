export class DbConfig {
    constructor(config) {

        this.id = config.id || null;
        this.name = config.name || "";

        let projection_extent = [];
        projection_extent[0] = config.proj_extent_0 || '';
        projection_extent[1] = config.proj_extent_1 || '';
        projection_extent[2] = config.proj_extent_2 || '';
        projection_extent[3] = config.proj_extent_3 || '';
        this.projection_extent = projection_extent.join(',');

        let map_extent = [];
        map_extent[0] = config.map_extent_0 || '';
        map_extent[1] = config.map_extent_1 || '';
        map_extent[2] = config.map_extent_2 || '';
        map_extent[3] = config.map_extent_3 || '';
        this.extent = map_extent.join(',');
        
        let center = [];
        center[0] = config.center_coord_0 || '';
        center[1] = config.center_coord_1 || '';
        this.center = center.join(',');

        this.resolutions = config.resolutions || "";
        this.zoom = config.zoom || "";
        this.proj4defs_id = config.proj4defs_id || null;
        // this.projection_code = config.projection_code || "";
        // this.pinning = config.featureinfo_options.pinning || false;
        this.featureinfo_options = config.featureinfo_options || { pinning: false };
    }
}
