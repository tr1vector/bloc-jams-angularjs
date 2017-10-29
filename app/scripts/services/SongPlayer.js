(function (){
	function SongPlayer($rootScope, Fixtures) {
		var SongPlayer = {};
		/**
		* @function currentAlbum
		* @desc stores album info from the Get Album Method
		* @param {Object} empty
		*/
		var currentAlbum = Fixtures.getAlbum();
		/**
		* @desc Buzz object audio file
 		* @type {Object}
 		*/
		var currentBuzzObject = null;
		/**
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		var setSong = function(song) {
		    if (currentBuzzObject) {
		        stopSong(song);
		    }
		 
		    currentBuzzObject = new buzz.sound(song.audioUrl, {
		        formats: ['mp3'],
		        preload: true
		    });

		    currentBuzzObject.bind('timeupdate', function() {
         		$rootScope.$apply(function() {
              		SongPlayer.currentTime = currentBuzzObject.getTime();
         		});
         	});

         	currentBuzzObject.bind('ended', function(){
         		SongPlayer.next();
         	})
     	
		   SongPlayer.currentSong = song;
		};
		/**
		* @function playSong
		* @desc Plays current song and sets boolean value of song playing to true
		* @param {Object} song
		*/
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
		};
		/**
		* @function stopSong
		* @desc Stops current song and sets boolean value of song playing to true
		* @param {Object} song
		*/
		var stopSong = function(song) {
			currentBuzzObject.stop();
         	SongPlayer.currentSong.playing = null;
		}
		/**
		* @function getSongIndex
		* @desc returns the index of a song
		* @param {Object} song
		*/
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		};
		/**
		* @desc Active song object from list of songs
		* @type {Object}
		*/
		SongPlayer.currentSong = null;
		/**
 		* @desc Current playback time (in seconds) of currently playing song
 		* @type {Number}
 		*/
		SongPlayer.currentTime = null;
		/**
 		* @desc Current volume value set on the player bar
 		* @type {Number}
 		*/
		SongPlayer.volume = 80;
		/**
		* @method SongPlayer.play
		* @desc Sets/Plays song if song clicked is not current song and plays song if current song is paused
		* @param {Object} song
		*/
		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);
			} else if (SongPlayer.currentSong === song) {
				if (!currentBuzzObject) {
					//Play the first song
					var firstSong = currentAlbum.songs[0];
					setSong(firstSong);
					playSong(firstSong);
				} else if (currentBuzzObject.isPaused()) {
					playSong(song);
				} else {
					currentBuzzObject.pause();
					song.playing = false;
				}
			}
			
		};
		/**
		* @method SongPlayer.pause
		* @desc Pauses song if pause button is clicked and changes boolean value of playing song to false
		* @param {Object} song
		*/
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};
		/**
		* @method SongPlayer.previous
		* @desc Selects previous song to play
		* @param {Object} empty
		*/
		SongPlayer.previous = function() {
     		var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     		currentSongIndex--;

     		 if (currentSongIndex < 0) {
     		 	if(currentSongIndex + 1 === 0){
     		 		stopSong(song);
     		 	}
     		 } else {
     		 	var song = currentAlbum.songs[currentSongIndex];
         		setSong(song);
         		playSong(song);
     		 }
 		};
 		/**
		* @method SongPlayer.next
		* @desc Selects next song to play
		* @param {Object} empty
		*/

 		SongPlayer.next = function() {
 			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     		currentSongIndex++;

     		if (currentSongIndex > currentAlbum.songs.length-1){
     			stopSong(song);
     		} else {
     			var song = currentAlbum.songs[currentSongIndex];
     			setSong(song);
     			playSong(song);
     		}
 		};
 		/**
 		* @function setCurrentTime
 		* @desc Set current time (in seconds) of currently playing song
 		* @param {Number} time
 		*/
 		SongPlayer.setCurrentTime = function(time) {
     		if (currentBuzzObject) {
         		currentBuzzObject.setTime(time);
     		}
 		};
 		/**
 		* @function setVolume
 		* @desc Set current volume (number) for player bar
 		* @param {Number} time
 		*/
 		SongPlayer.setVolume = function(volume) {
 			if (currentBuzzObject){
 				currentBuzzObject.setVolume(volume);
 			}
 			SongPlayer.volume = volume;
 		};

 		SongPlayer.muteVolume = function(volume) {
 			currentBuzzObject.mute(volume);
 			SongPlayer.volume = null;
 		}

		return SongPlayer;
	}

	angular
		.module("blocJams")
		.factory("SongPlayer", ["$rootScope", "Fixtures", SongPlayer]);
})();