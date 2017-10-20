(function (){
	function SongPlayer() {
		var SongPlayer = {};

		var currentSong = null;
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
		       currentSong.playing = null;
		   }
		 
		   currentBuzzObject = new buzz.sound(song.audioUrl, {
		       formats: ['mp3'],
		       preload: true
		   });
		 
		   currentSong = song;
		};
		/**
		* @function playSong
		* @desc Plays current song and sets boolean value of song playing to true
		* @param {Object} song
		*/
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
		}
		/**
		* @method SongPlayer.play
		* @desc Sets/Plays song if song clicked is not current song and plays song if current song is paused
		* @param {Object} song
		*/
		SongPlayer.play = function(song) {
			if (currentSong !== song) {
				setSong(song);
				playSong(song);
			} else if (currentSong === song) {
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
			currentBuzzObject.pause();
			song.playing = false;
		};

		return SongPlayer;
	}

	angular
		.module("blocJams")
		.factory("SongPlayer", SongPlayer);
})();