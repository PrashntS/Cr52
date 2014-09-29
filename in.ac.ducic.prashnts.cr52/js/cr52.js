/*!
 * -.-. .-. ..... ..---
 * Cr52 Chrome - Main Library
 * @author          Prashant Sinha <firstname><lastname>@outlook.com, <firstname>@ducic.ac.in
 * @organization    Cluster Innovation Centre, University of Delhi
 * @version         0.1
 * @license         MIT License [opensource.org/licenses/MIT]
 * @link            github.com/PrashntS/Cr52
 */

/*!
 * Cr52 closure. Library.
 * @type {Object}
 */
var Cr52 = {

    /*!
     * Frequency, in seconds, of interval between each iterations of Cr52.
     * @type {Number}
     */
    iterationFrequency: 100,

    /*!
     * Force update after *this* number of milliseconds.
     * @type {Number}
     */
    updateFrequency: 2000,

    /*!
     * Contains the UTC time-stamp of last time when the Hook was updated.
     * @type {Number}
     */
    lastUpdate: 0,

    /*!
     * Contains count of number of time Hook was updated.
     * @type {Number}
     */
    refreshed: 0,

    /*!
     * The HTML hook object closure. Responsible for page manipulation, including addition of new
     * hook, appending the hook, and detecting presence of it.
     * @type {Object}
     */
    hook: {

        /*!
         * Contains the ID of the being-appended-to-body element.
         * @type {String}
         */
        id: "Cr52-Hook",

        /*!
         * Show or hide the Hook?
         * Must be a valid CSS3 "display:" argument
         * @type {String}
         */
        display: "inline",

        /*!
         * Appends the hook in the Body.
         * @param  {String} dat
         * @return {Boolean}
         */
        append: function(dat) {
            this.create();
            this.get().html(dat);
            Cr52.lastUpdate = Cr52.time.now();
            return true;
        },

        /*!
         * Creates a Hook element in the Body. If the element exists, it clears the innerHTML,
         * otherwise it creates a span in the body.
         * @return {Boolean}
         */
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

        /*!
         * Returns the DOM object of hook.
         * @return {Mixed}
         */
        get: function() {
            var hookSelector = $("#"+this.id);
            if (hookSelector.length == 0) return false;
            else return hookSelector;
        },

        /*!
         * Determines if the Cr52.routine should be executed due to hook.
         * @return {Boolean}
         */
        doUpdate: function() {
            if (this.get()) return false;
            else return true;
        }
    },

    /*!
     * Initializes the Cr52 service.
     * @return {NaN}
     */
    init: function() {
        window.setInterval(function() {
            Cr52.routine();
        }, Cr52.iterationFrequency);
    },

    /*!
     * Defines the Service, to be executed per iteration.
     * @return {Mixed}
     */
    routine: function() {
        console.log("hook:"+ this.hook.doUpdate() + " time:"+ this.time.doUpdate() + " lastUpdate:" + this.lastUpdate + "refreshed:" + this.refreshed);
        if (this.time.doUpdate() || this.hook.doUpdate()) {
            this.refreshed++;
            return this.hook.append("Main Data goes here.");
        } else return false;
    },

    /*!
     * The time closure.
     * @type {Object}
     */
    time: {

        /*!
         * Returns current UTC Time-stamp, taken from Client's clock.
         * @return {Number}
         */
        now: function() {
            return new Date().getTime();
        },

        /*!
         * Determines if the Cr52.routine should be executed due to time factor.
         * @return {Boolean}
         */
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
