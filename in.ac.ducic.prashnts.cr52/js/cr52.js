var Cr52 = {
	iterationFrequency: 100,
	updateFrequency: 2000,
	lastUpdate: false,
	refreshed: 0,

	hook: {
		id: "Cr52-Hook",
		display: "inline",
		append: function(dat) {
			this.create();
			this.get().html(dat);
			Cr52.lastUpdate = Cr52.time.now();
			return true;
		},
		create: function() {
			var hookInstance = this.get();
			if (hookInstance) {
				hookInstance.html("");
				return true;
			} else {
				var hookCreate = '<span id="'+this.id+'" style="display:'+this.display+'"></span>';
				$("body").append(hookCreate);
				return true;
			}
		},
		get: function() {
			var hookSelector = $("#"+this.id);
			if (hookSelector.length == 0) return false;
			else return hookSelector;
		},
		doUpdate: function() {
			if (this.get()) return false;
			else return true;
		}
	},
	init: function() {
		window.setInterval(function() {
			Cr52.routine();
		}, Cr52.iterationFrequency);
	},
	routine: function() {
		console.log("hook:"+ this.hook.doUpdate() + " time:"+ this.time.doUpdate() + " lastUpdate:" + this.lastUpdate + "refreshed:" + this.refreshed);
		if (this.time.doUpdate() || this.hook.doUpdate()) {
			this.refreshed++;
			return this.hook.append("Main Data goes here.");
		} else return false;
	},
	time: {
		now: function() {
			return new Date().getTime();
		},
		doUpdate: function() {
			if (!Cr52.lastUpdate) {
				return true;
			}
			else if (this.now() >= Cr52.updateFrequency + Cr52.lastUpdate) {
				return true;
			}
			else return false;
		}
	}
};

Cr52.init();
