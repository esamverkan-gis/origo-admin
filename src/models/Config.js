export class Config {
    constructor(_config) {

        const config = _config || {};

        this.id = config.id || null;
        this.name = config.name || "";

        // this.projection_extent;
        let projection_extent = [];
        if (config.projection_extent)
            projection_extent = config.projection_extent.split(',');
        this.proj_extent_0 = projection_extent[0] || "";
        this.proj_extent_1 = projection_extent[1] || "";
        this.proj_extent_2 = projection_extent[2] || "";
        this.proj_extent_3 = projection_extent[3] || "";


        // this.extent = ""//[];
        let map_extent = [];
        if (config.extent)
            map_extent = config.extent.split(',');
        this.map_extent_0 = map_extent[0] || "";
        this.map_extent_1 = map_extent[1] || "";
        this.map_extent_2 = map_extent[2] || "";
        this.map_extent_3 = map_extent[3] || "";

        // this.center = ""//[];
        let center = [];
        if (config.center)
            center = config.center.split(',');
        this.center_coord_0 = center[0] || "";
        this.center_coord_1 = center[1] || "";

        this.resolutions = config.resolutions || "";
        this.zoom = config.zoom || "";
        this.proj4defs_id = config.proj4defs_id || -1;
        // this.projection_code = config.projection_code || "EPSG:3006";
        // this.pinning = config.featureinfo_options.pinning || false;
        this.featureinfo_options = config.featureinfo_options || { pinning: false };
    }
}

/*
    constructor(jsonMaeklarObjektDO: any) {
        this.mapDataToMaeklarObjekt(jsonMaeklarObjektDO);
    }

    private mapDataToMaeklarObjekt(jsonMaeklarObjektDO: any) {
        this.aerBesiktigad = jsonMaeklarObjektDO.aerBesiktigad;
        this.aerNyproduktion = jsonMaeklarObjektDO.aerNyproduktion;
        this.aerObjektIProjekt = jsonMaeklarObjektDO.aerObjektIProjekt;
        this.aerUtland = jsonMaeklarObjektDO.aerUtland;
        this.bankKontakt = jsonMaeklarObjektDO.bankKontakt;
        this.basfakta = jsonMaeklarObjektDO.basfakta;
        this.beskrivningKort = jsonMaeklarObjektDO.beskrivningKort;
        this.extraKontakt = jsonMaeklarObjektDO.extraKontakt;
        this.maeklare = jsonMaeklarObjektDO.maeklare;
        this.saeljFras = jsonMaeklarObjektDO.saeljFras;
        this.zon = jsonMaeklarObjektDO.zon;
        this.header = jsonMaeklarObjektDO.header;
        this.karta = jsonMaeklarObjektDO.karta;
        this.harVRFilm = jsonMaeklarObjektDO.harVRFilm;
        this.harPanoramaFilm = jsonMaeklarObjektDO.harPanoramaFilm;
        this.harOevrigFilm = jsonMaeklarObjektDO.harOevrigFilm;
        this.harPlanritning = jsonMaeklarObjektDO.harPlanritning;
        this.harBilder = jsonMaeklarObjektDO.harBilder;
        this.harBeskrivning = jsonMaeklarObjektDO.harBeskrivning;
        this.harAgaerenBeraettar = jsonMaeklarObjektDO.harAgaerenBeraettar;
        this.harFakta = jsonMaeklarObjektDO.harFakta;
        this.kontor = jsonMaeklarObjektDO.kontor;
        this.visaIntresseamaelan = jsonMaeklarObjektDO.visaIntresseamaelan;
        this.budgivning = jsonMaeklarObjektDO.budgivning;
        this.kommunNamn = jsonMaeklarObjektDO.kommunNamn;
    }
    */

