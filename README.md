googlemaps-utils
========

Google Maps utilities for;

 * calculating bounds - get the bounds of a static map API request.
 * calculating zoom - determine the zoom level to use for a given bounds.

Installation
--------

    $ npm install -g googlemaps-utils

Examples
--------

The following examples show you how to use googlemaps-utils.

```javascript
var gmu = require('googlemaps-utils');

// Static map we want the bounds for
// http://maps.googleapis.com/maps/api/staticmap?center=-26.6812783, 153.1215971&zoom=15&size=649x480&sensor=false

// calculate the bounds for a given lonlat, zoom, width and height
var bounds = gmu.calcBounds(-26.6812783, 153.1215971, 15, 649, 480);
/* 
{ bounds: [
	153.10767107079468,
    -26.690480881985657,
    153.13552312920532,
    -26.67207497516463
  ],
  bbox: '153.10767107079468,-26.690480881985657,153.13552312920532,-26.67207497516463',
  top: -26.67207497516463,
  right: 153.13552312920532,
  bottom: -26.690480881985657,
  left: 153.10767107079468
}
*/

// calculate the zoom for a given bounds (l, b, r, t), width and height
var zoom = gmu.calcZoomForBounds([153.10767107079468, -26.690480881985657, 153.13552312920532, -26.67207497516463], 649, 480);
// 15

```

Running tests
----

    $ npm test