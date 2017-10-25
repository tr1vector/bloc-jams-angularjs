(function() {
    //$document added to be used in our seekBar function
    function seekBar($document) {
        /**
         * @function calculatePercent
         * @desc Calculates the seekbar percent along the entire bar where the event was passed in from the seek bar view
         * @param {Object} seekBar, event from seek bar view
         */
    	var calculatePercent = function(seekBar, event) {
		    var offsetX = event.pageX - seekBar.offset().left;
		    var seekBarWidth = seekBar.width();
		    var offsetXPercent = offsetX / seekBarWidth;
		    offsetXPercent = Math.max(0, offsetXPercent);
		    offsetXPercent = Math.min(1, offsetXPercent);
		    return offsetXPercent;
 		};

     	return {
        	templateUrl: '/templates/directives/seek_bar.html',
        	replace: true,
        	restrict: 'E',
         	scope: { },
         	link: function(scope, element, attributes) {
                 /**
                  * @desc Holds current value of the seekbar.  Default is set to 0.
                  */
	            scope.value = 0;
                 /**
                  * @desc Holds maximum value of the seekbar.  This value is set at 100 or the end of the seekbar.
                  */
	            scope.max = 100;
                 /**
                  * @desc This value contains the matching directive element value at <seek-bar></seek-bar in the view
                  */
	            var seekBar = $(element);
	             /**
                  * @function percentString
                  * @desc Calculates the percent of the seekbar from value to max - 0-100
                  * @param {Object} seekBar, event from seek bar view
                  */
	            var percentString = function () {
	                var value = scope.value;
	                var max = scope.max;
	                var percent = value / max * 100;
	                return percent + "%";
	            };
	             /**
                  * @method fillStyle
                  * @desc returns the width of the fillbar based on the value of the percentString
                  * @param empty
                  */
	            scope.fillStyle = function() {
	                return {width: percentString()};
	            };
                 /**
                  * @method thumbStyle
                  * @desc returns location of the thumbar based on the value of the percentString
                  * @param empty
                  */
                scope.thumbStyle = function() {
                    return {left: percentString()};
                }
                 /**
                   * @method onClickSeekBar
                   * @desc holds the updated value of the seek bar based on the seek bar width and where the user clicked on the seek bar
                   * @param {Object} event
                   */
	            scope.onClickSeekBar = function(event) {
            		var percent = calculatePercent(seekBar, event);
            		scope.value = percent * scope.max;
         		};
                 /**
                   * @method trackThumb
                   * @desc Constantly tracks the current value in thumb tracker using $apply
                   * @param empty
                   */
         		scope.trackThumb = function() {
    				$document.bind('mousemove.thumb', function(event) {
        				var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                        });
        			
    				});
 
    				$document.bind('mouseup.thumb', function() {
        				$document.unbind('mousemove.thumb');
        				$document.unbind('mouseup.thumb');
    				});
				};
         	}
    	};
	}
 
    angular
        .module('blocJams')
        .directive('seekBar', ["$document", seekBar]);
})();