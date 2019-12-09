"use strict";

// creating JSON object for a style read from index.json adjusted to be saved in the database
export function createStyleObject (styleName, styleOptions) {

  for (var i = 0; i < styleOptions.length; i++) {
    var styleValues;
    //Check if rule is array, ie multiple styles for the rule
    if (styleOptions[i].constructor === Array) {
      for (var j = 0; j < styleOptions[i].length; j++) {
        if (j > 0) break; // Now we handle only one style per layer(the first one in case of several styles)
        styleValues = createStyleValues(styleOptions[i][j]);
      }
    }
    //If just a single style 
    else {
      styleValues = createStyleValues(styleOptions[i]);
    }
  }

  var styleObject = {
    name: styleName
    // style_type: 
    // stroke_color: styles[styleName].version,
    // fill_color: String,
    // width: Number,
    // radius: Number,
    // icon_source: String,
    // sld_style: String,
    // image_source: String,
    // legend_is_multirow: Boolean
  };

  Object.assign(styleObject, styleValues);

  return styleObject;
}

function createStyleValues (styleParams) {

  var styleValues = {};

  if (styleParams.hasOwnProperty('stroke')) {
    styleValues.style_type = 'stroke';
    styleValues.stroke_color = styleParams.stroke.color;
    styleValues.width = styleParams.stroke.width;
  }
  if (styleParams.hasOwnProperty('fill')) {
    styleValues.fill_color = styleParams.fill.color;
  }
  if (styleParams.hasOwnProperty('circle')) {
    styleValues.style_type = 'circle';
    styleValues.radius = styleParams.circle.radius;
    styleValues.fill_color = styleParams.circle.fill.color;
    styleValues.stroke_color = styleParams.circle.stroke.color;
    styleValues.width = styleParams.circle.stroke.width;
  }
  if (styleParams.hasOwnProperty('icon')) {
    styleValues.style_type = 'icon';
    if (styleParams.icon.hasOwnProperty('src')) {
      styleValues.icon_source = styleParams.icon.src;
    }
  }
  if (styleParams.hasOwnProperty('legendIsMultiRow')) {
    styleValues.legend_is_multirow = styleParams.legendIsMultiRow;
  }
  if (styleParams.hasOwnProperty('sldStyle')) {
    styleValues.sld_style = styleParams.sldStyle;
  }
  if (styleParams.hasOwnProperty('image')) {
    styleValues.style_type = 'image';
    styleValues.image_source = styleParams.image.src;
  }

  return styleValues;
}

// module.exports = createStyleObject;

/*
example:
styleOptions for "origo-logo": 
[
  [{
    "circle": {
      "radius": 16,
      "stroke": {
        "color": "rgba(0,0,0,1)",
        "width": 5
      },
      "fill": {
        "color": "rgba(255,255,255,0.9)"
      }
    }
  }, {
    "circle": {
      "radius": 4,
      "stroke": {
        "color": "rgba(0,0,0,0)",
        "width": 1
      },
      "fill": {
        "color": "rgba(37,129,196,1)"
      }
    }
  }]
];

styleParams: 
	{
    "circle": {
      "radius": 16,
      "stroke": {
        "color": "rgba(0,0,0,1)",
        "width": 5
      },
      "fill": {
        "color": "rgba(255,255,255,0.9)"
      }
    }
  }
*/

// creating JSON object for a style read from Database adjusted to be saved in the index.json
export function createJsonObject (databaseFormattedStyle) {

  let obj = {};
  let styleType = databaseFormattedStyle.style_type;
  if (styleType == 'stroke') {
    obj.stroke = {};
    obj.stroke.color = databaseFormattedStyle.stroke_color;
    obj.stroke.width = databaseFormattedStyle.width;
    if (databaseFormattedStyle.fill_color) {
      obj.fill = {};
      obj.fill.color = databaseFormattedStyle.fill_color;
    }
  }
  if (styleType == 'circle') {
    obj.circle = {};
    obj.circle.radius = databaseFormattedStyle.radius;
    obj.circle.stroke = {};
    obj.circle.stroke.color = databaseFormattedStyle.stroke_color;
    obj.circle.stroke.width = databaseFormattedStyle.width;
    obj.circle.fill = {};
    obj.circle.fill.color = databaseFormattedStyle.fill_color;
  }
  if (styleType == 'icon') {
    obj.icon = {};
    obj.icon.src = databaseFormattedStyle.icon_source;
  }
  if (styleType == 'image') {
    obj.image = {};
    obj.image.src = databaseFormattedStyle.image_source;
  }
  if (databaseFormattedStyle.legend_is_multirow) {
    obj.legendIsMultiRow = databaseFormattedStyle.legend_is_multirow;
  }
  if (databaseFormattedStyle.sld_style) {
    obj.sldStyle = databaseFormattedStyle.sld_style;
  }
  return obj;
}

export function prettifyJson (jsonStr) {
  try {
    let obj = JSON.parse(jsonStr);
    return JSON.stringify(obj, undefined, 4);
  }
  catch (err) {
    console.log("Could not prettify JSON, not valid JSON.");
    return jsonStr;
  }
}