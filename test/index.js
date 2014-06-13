var gmu = require('../');

describe('Google Maps Utilities', function() {
	
	// bounds
	it('bounds returns an object', function(done) {
		gmu.calcBounds(-27.470127, 153.0147027, 19, 649, 480).should.be.an.Object;
		done();
	});
	
	it('bounds returns 6 keys', function(done) {
		gmu.calcBounds(-27.470127, 153.0147027, 19, 649, 480).should.have
			.keys('bounds', 'bbox', 'top', 'right', 'bottom', 'left');
		done();
	});
	
	
	it('bounds returns expected top left', function(done) {
		gmu.calcBounds(-27.470127, 153.0147027, 19, 649, 480).top.should.be
			.approximately(-27.46955584799242, 0.1).and.be.a.Number;
		
		gmu.calcBounds(-27.470127, 153.0147027, 19, 649, 480).left.should.be
			.approximately(153.01383232317463, 0.1).and.be.a.Number;
		
		done();
	});
	
	
	it('bounds returns same value for bounds[1] and bottom', function(done) {
		var bounds = gmu.calcBounds(-27.470127, 153.0147027, 19, 649, 480);
		bounds.bounds[1].should.be.exactly(bounds.bottom).and.be.a.Number;
		done();
	});
	
	it('bounds returns same value for bounds[2] and right', function(done) {
		var bounds = gmu.calcBounds(-27.470127, 153.0147027, 19, 649, 480);
		bounds.bounds[2].should.be.exactly(bounds.right).and.be.a.Number;
		done();
	});
	
	// zoom
	it('zoom returns a number', function(done) {
		gmu.calcZoomForBounds([153.01383232317463, -27.470698149047504, 153.0155730768253, -27.46955584799242], 649, 480).should.be.a.Number;
		done();
	});
	
	it('zoom returns a correct zoom', function(done) {
		gmu.calcZoomForBounds([153.01383232317463, -27.470698149047504, 153.0155730768253, -27.46955584799242], 649, 480).should.be.exactly(19);
		done();
	});
	
	it('zoom returns same value as set in calcBounds', function(done) {
		var bounds = gmu.calcBounds(-27.470127, 153.0147027, 18, 640, 489);
		gmu.calcZoomForBounds(bounds.bounds, 649, 480).should.be.exactly(18);
		done();
	});
	
});