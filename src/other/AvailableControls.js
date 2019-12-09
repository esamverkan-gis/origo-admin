export const availableControls = [
  {
    "name": "mapmenu",
    "title": "Lagerlista",
    "options": []
  },
  {
    "name": "legend",
    "title": "Legend",
    "options": []
  },
  {
    "name": "sharemap",
    "title": "Dela kartan",
    "options": [
      {
        "name": "storeMethod",
        "title": "storeMethod",
        "type": "string",
        "description": ".............",
        "defaultValue": "saveStateToServer",
        "required": true
      },
      {
        "name": "serviceEndpoint",
        "title": "serviceEndpoint",
        "type": "url",
        "description": "..................",
        "defaultValue": "http://localhost:3001/mapstate",
        "required": true,
        "validation": "should be a valid link"
      }
    ]
  },
  {
    "name": "about",
    "title": "Infotext om Origo",
    "options": [
      {
        "name": "buttontext",
        "title": "Text som syns i kartan på den klickbara länken",
        "type": "string",
        "description": "Text to be shown in the list item for general info about the map",
        "defaultValue": "Om Origo",
        "required": true
      },
      {
        "name": "title",
        "title": "Title",
        "type": "string",
        "description": "Text to be shown in the title of the pop-up window for general info about the map",
        "defaultValue": "Om Origo",
        "required": true
      },
      {
        "name": "content",
        "title": "Textfältet som syns i kartan",
        "type": "text",
        "description": "Text to be shown in the body of the pop-up window for general info about the map",
        "defaultValue": "<p>Origo är ett ramverk för webbkartor. Ramverket bygger på JavaScript-biblioteket OpenLayers 3. Du kan använda Origo för att skapa egna webbaserade kartapplikationer.</p><br><p>Projektet drivs och underhålls av ett antal svenska kommuner. Besök gärna <a href='https://github.com/origo-map/origo' target='_blank'>Origo på GitHub</a> för mer information.</p>",
        "required": true,
        "validation": "should be an html element"
      }
    ]
  },
  {
    "name": "home",
    "title": "Zooma till hela kartan",
    "options": []
  },
  {
    "name": "geoposition",
    "title": "Visa nuvarande position i kartan",
    "options": []
  },
  {
    "name": "print",
    "title": "Skriv ut",
    "options": []
  },
  {
    "name": "scaledropdown",
    "title": "Välj skala från lista",
    "options": []
  },
  {
    "name": "draw",
    "title": "Rita",
    "options": []
  },
  {
    "name": "internalApi",
    "title": "API",
    "options": []
  },
  {
    "name": "search",
    "title": "Sök",
    "options": [
      {
        "name": "highlight",
        "title": "highlight", // discriptive title to be shown in the admin
        "type": "boolean",
        "description": "Används för att highlighta sökordet i resultat",
        "defaultValue": true,
        "required": false
      },
      {
        "name": "hint",
        "title": "Hint",
        "type": "boolean",
        "description": "Används för att hinta om ....",
        "defaultValue": true,
        "required": false
      },
      {
        "name": "minLength",
        "title": "Minimum length to trigger the search",
        "type": "int",
        "description": "Minimum antal bokstäver för att aktivera sökningen, defalts to 1",
        "defaultValue": 4,
        "minvalue": 1,
        "maxvalue": 12, // couldn't find a max in the documentation but it is reasonable to have one!
        "required": false
      },
      {
        "name": "limit",
        "title": "Maximum suggestions",
        "type": "int",
        "description": "The max number of suggestions to be displayed for each category. Defaults to 5",
        "defaultValue": 9,
        "minvalue": 1,
        "maxvalue": 20, // couldn't find a max in the documentation but it is reasonable to have one!
        "required": false
      },
      {
        "name": "title",
        "title": "Title",
        "type": "string",
        "description": "The title to be shown on top of results", // It seems that this one is not used anywhere right now!
        "value": "srearch results",
        "defaultValue": "Sökresultat",
        "required": false
      },
      {
        "name": "hintText",
        "title": "Placeholder",
        "type": "string",
        "description": "The placeholder to be shown in the search field",
        "defaultValue": "Sök adress, fastigheter...",
        "required": false
      },
      {
        "name": "municipalities",
        "title": "Municipalities to be searched",
        "type": "string",
        "description": "comma seperated names of the manucipalities that should be included in the search",
        "defaultValue": "Sundsvall,Härnösand,Timrå,Örnsköldsvik,Sollefteå,Kramfors,Ånge,Nordanstig,Hudiksvall",
        "required": true,
        "validation": "should be a comma seperated list & can includ only the names of Swedish municipalities"
      },
      {
        "name": "url_fastighet",
        "title": "url to search properties",
        "type": "url",
        "description": "link to the lantmäteriets web service to search through properties",
        "defaultValue": "https://kartatest.e-tjansteportalen.se/search/lm/registerenheter?lmuser=sundsvall",
        "required": true,
        "validation": "should be a valid link"
      },
      {
        "name": "url_adress",
        "title": "url to search addresses",
        "type": "url",
        "description": "link to the lantmäteriets web service to search through addresses",
        "defaultValue": "https://kartatest.e-tjansteportalen.se/search/lm/addresses?lmuser=sundsvall",
        "required": true,
        "validation": "should be a valid link"
      },
      {
        "name": "url_ort",
        "title": "url to search neighbourhoods",
        "type": "url",
        "description": "link to the lantmäteriets web service to search through neighbourhoods",
        "defaultValue": "https://kartatest.e-tjansteportalen.se/search/lm/placenames?lmuser=sundsvall",
        "required": true,
        "validation": "should be a valid link"
      },
      {
        "name": "url_yta",
        "title": "url to get the shape of a land",
        "type": "url",
        "description": "link to the lantmäteriets web service to get a polygon shape of a land",
        "defaultValue": "https://kartatest.e-tjansteportalen.se/search/lm/registerenheter/objectId/enhetsomraden?lmuser=sundsvall",
        "required": true,
        "validation": "should be a valid link"
      }
    ]
  },
  // {
  //   "name": "mouseposition",
  //   "title": "Koordinatposition",
  //   "options": [
  //       {
  //           "name": "targetelement",
  //           "title": "Targetelements id",
  //           "type": "string",
  //           "description": "id of the target element that shows the coordinates of the mouse pointer",
  //           "defaultValue": "o-footer-l",
  //           "required": true
  //       },
  //       {
  //           "name": "coordinate_precision",
  //           "title": "Antal decimaler",
  //           "type": "int",
  //           "description": "number of decimal figures shown in the mouseposition",
  //           "defaultValue": 2,
  //           "required": false
  //       }
  //   ]
  // },
  {
    "name": "position",
    "title": "Koordinatposition",
    "options": [
      {
        "name": "title",
        "title": "Title to be shown",
        "type": "string",
        "description": ".....................",
        "defaultValue": "Web Mercator",
        "required": true
      },
      {
        "name": "projectoins",
        "title": "projektioner",
        "type": "string",
        "description": ".....................",
        "defaultValue": {
          "EPSG:4326": "WGS84",
          "EPSG:3006": "Sweref99 TM"
        },
        "required": true
      }
    ]
  },
  {
    "name": "measure",
    "title": "Mät i kartan",
    "options": [
      {
        "name": "displayLengthAllSegments",
        "title": "Visa mått på alla sträckor",
        "type": "boolean",
        "description": ".............",
        "defaultValue": true,
        "required": false
      },
      {
        "name": "url",
        "title": "URL till tjänst som levererar höjdinformation",
        "type": "url",
        "description": "link to the lantmäteriets web service to get a point elevation",
        "defaultValue": "https://kartatest.e-tjansteportalen.se/search/lm/elevation/3006/easting/northing?lmuser=sundsvall",
        "required": true,
        "validation": "should be a valid link"
      },
      {
        "name": "measureTools",
        "title": "Mät Verktyg",
        "type": "list",
        "description": "................",
        "defaultValue": ["length", "area", "height"],
        "required": true
      }
    ]
  },
  {
    "name": "TEST",
    "title": "Test",
    "options": [
      {
        "name": "test1",
        "title": "TEST",
        "type": "string",
        "description": "testing a new control",
        "defaultValue": "Testinga new Control",
        "required": true
      },
      {
        "name": "test2",
        "title": "TEST",
        "type": "list",
        "description": "testing a new control",
        "defaultValue": ["item1", "item2", "item3", "item4", "item5"],
        "required": true
      }
    ]
  }
];