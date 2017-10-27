(function() {
    function timecode() {
    	/**
		* @function timecode
		* @desc Takes seconds as argument and formats to the readable 0:00 time format
		* @param {number} seconds
		*/
        return function(seconds) {
         //    var seconds = Number.parseFloat(seconds);

         // 	   if (Number.isNaN(seconds)){
         // 		   return '-:--';
         // 	   }
         //    var wholeSeconds = Math.floor(seconds);
         //    var minutes = Math.floor(wholeSeconds / 60);
         //    var remainingSeconds = wholeSeconds % 60;
 
         //    var output = minutes + ':';
 
         //    if (remainingSeconds < 10) {
         //         output += '0';   
         //    }
 
         //    output += remainingSeconds;

         //    return output;
         	var output = buzz.toTimer(seconds);
         	if(output === '--:--'){
         		output = '00:00';
         	}
         	return output;
        };
    }
 
    angular
        .module('blocJams')
        .filter('timecode', timecode);
})();