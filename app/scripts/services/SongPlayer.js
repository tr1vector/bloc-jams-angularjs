(function (){
	function SongPlayer(Fixtures) {
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
		       currentBuzzObject.stop();
		       SongPlayer.currentSong.playing = null;
		   }
		 
		   currentBuzzObject = new buzz.sound(song.audioUrl, {
		       formats: ['mp3'],
		       preload: true
		   });
		 
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
				if (currentBuzzObject.isPaused()) {
					playSong(song);
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
		* @desc Selects previous song
		* @param {Object} empty
		*/
		SongPlayer.previous = function() {
     		var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     		currentSongIndex--;

     		 if (currentSongIndex < 0) {
         		currentBuzzObject.stop();
         		SongPlayer.currentSong.playing = null;
     		 } else {
     		 	var song = currentAlbum.songs[currentSongIndex];
         		setSong(song);
         		playSong(song);
     		 }
 		};

		return SongPlayer;
	}

	angular
		.module("blocJams")
		.factory("SongPlayer", ["Fixtures", SongPlayer]);
})();