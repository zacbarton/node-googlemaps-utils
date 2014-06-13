var merc = require('mercator-projection');

exports.calcBounds = calcBounds;
exports.calcZoomForBounds = calcZoomForBounds;

// return the viewport bounds for a given lonlat, zoom and map/image width & height
function calcBounds(latitude, longitude, zoom, width, height) {
	var scale = Math.pow(2, zoom);
	var centerPx = merc.fromLatLngToPoint({lng: longitude, lat: latitude});
	
	var SWPoint = {x: (centerPx.x - (width / 2) / scale), y: (centerPx.y + (height / 2) / scale)};
	var SWLatLon = merc.fromPointToLatLng(SWPoint);
	
	var NEPoint = {x: (centerPx.x + (width / 2) / scale), y: (centerPx.y - (height / 2) / scale)};
	var NELatLon = merc.fromPointToLatLng(NEPoint);
    
    return {
    	bounds: [SWLatLon.lng, SWLatLon.lat, NELatLon.lng, NELatLon.lat] // [w, s, e, n]
    	, bbox: SWLatLon.lng + ',' + SWLatLon.lat + ',' + NELatLon.lng + ',' + NELatLon.lat
    	, top: NELatLon.lat
    	, right: NELatLon.lng
    	, bottom: SWLatLon.lat
    	, left: SWLatLon.lng
    };
};

// return the zoom for a given bounds and map/image width height
function calcZoomForBounds(bounds, width, height) {
	var WORLD_DIM = {width: 256, height: 256};
	var ZOOM_MAX = 21;
	
	var ne = {lon: bounds[2], lat: bounds[3]};
	var sw = {lon: bounds[0], lat: bounds[1]};
	
	var latFraction = (_latRad(ne.lat) - _latRad(sw.lat)) / Math.PI;
	var lonDiff = ne.lon - sw.lon;
	var lonFraction = ((lonDiff < 0) ? (lonDiff + 360) : lonDiff) / 360;
	
	var latZoom = _zoom(height, WORLD_DIM.height, latFraction);
	var lonZoom = _zoom(width, WORLD_DIM.width, lonFraction);
	
	return Math.min(latZoom, lonZoom, ZOOM_MAX);
};

// private helpers
function _latRad(lat) {
	var sin = Math.sin(lat * Math.PI / 180);
	var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
	return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
}

function _zoom(mapPx, worldPx, fraction) {
	return Math.round(Math.log(mapPx / worldPx / fraction) / Math.LN2);
}