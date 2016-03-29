var playerModule = (function() {

  var nativePlayer = document.getElementById('audio');
  var durationLine = document.getElementsByClassName("active-duration-line")[0];
  var slideButton = document.getElementsByClassName("slide-button")[0];
  nativePlayer.volume = .5;

  function play() {
    if (nativePlayer.paused) {
      nativePlayer.play();
      toggleButton();
      console.log('Playing audio');
    } else {
      pause();
    }
  }

  function pause() {
    nativePlayer.pause();
    toggleButton();

    console.log('Pausing audio');
  }

  function toggleButton() {
    var playButtons = document.getElementsByClassName("trigger-button");

    if (nativePlayer.paused || nativePlayer.stopped) {
      for (var i = 0; i < playButtons.length; i++) {
        playButtons[i].className = "font-icon trigger-button play-icon";
      }
    } else {
      for (var i = 0; i < playButtons.length; i++) {
        playButtons[i].className = "font-icon trigger-button pause-icon";
      }
    }
  }

  function rewind() {
    nativePlayer.currentTime = 0;
  }

  function getSliderPosition(obj, e) {
    console.log('Getting Position');

    var songSliderWidth = obj.offsetWidth;
    var evtobj = window.event ? event : e;
    clickLocation = evtobj.layerX - obj.offsetLeft;

    var percentage = (clickLocation / songSliderWidth);
    updatePosition(percentage, songSliderWidth);
  }

  function updatePosition(percentage, width) {

    nativePlayer.volume = percentage;
    percentageOffset = percentage * 100 - 8;

    var activeSongWidth = width * percentage;
    durationLine.style.width = activeSongWidth + "px";
    slideButton.style.left = percentageOffset + "%";
  }

  return {
    play: play,
    pause: pause,
    toggleButton: toggleButton,
    rewind: rewind,
    getSliderPosition: getSliderPosition
  }

})();