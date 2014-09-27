var Cr52 = {
	iterationFrequency: 100,
	updateFrequency: 2000,
	lastUpdate: false,
	init: function() {
		window.setInterval(function() {
			Cr52.routine();
		}, Cr52.iterationFrequency);
	},

	routine: function() {

	},
	proceed: function() {
		if (this.time.doUpdate() ||
			)
	},
	time: {
		now: function() {
			return new Date().getTime();
		},
		doUpdate: function() {
			if (!lastUpdates) return true;
			else if (this.now() >= Cr52.updateFrequency + Cr52.lastUpdate) return true;
			else return false;
		}
	}
};

Cr52.init();