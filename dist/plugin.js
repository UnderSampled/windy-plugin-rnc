"use strict";

/**
 * This is main plugin loading function
 * Feel free to write your own compiler
 */
W.loadPlugin(
/* Mounting options */
{
  "name": "windy-plugin-rnc",
  "version": "0.1.0",
  "author": "UnderSampled",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/UnderSampled/windy-plugin-rnc"
  },
  "description": "Windy plugin for displaying RNC nautical charts as the base map.",
  "displayName": "RNC Nautical Charts",
  "hook": "menu",
  "className": "windy-plugin-rnc"
},
/* HTML */
'<h2>RNC Nautical Charts for Windy</h2> <p>Show RNC nautical charts from NOAA in Windy!</p>',
/* CSS */
'.overlay-layer{mix-blend-mode:multiply}',
/* Constructor */
function () {
  var map = W.require('map');

  var baseLayer = map.baseLayer;
  var rncLayer = null;

  this.onopen = function () {
    var tileSource = "//tileservice.charts.noaa.gov/tiles/50000_1/{z}/{x}/{y}.png";
    rncLayer = L.tileLayer(tileSource, {
      className: "rnc-layer",
      tileSize: 256
    }).addTo(map);
    baseLayer.setZIndex(0);
    rncLayer.setZIndex(1);
  };

  this.onclose = function () {
    if (rncLayer) {
      map.removeLayer(rncLayer);
    }
  };
});