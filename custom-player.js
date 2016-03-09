{
  var nativePlayer = document.getElementById('audio');
  var durationLine = document.getElementsByClassName("active-duration-line")[0];
  var slideButton = document.getElementsByClassName("slide-button")[0];

  function play() {
    nativePlayer.play();
    console.log('Playing audio');
  }

  function pause() {
    nativePlayer.pause();
    console.log('Pausing audio');
  }

  function rewind() {
    nativePlayer.currentTime = 0;

    durationLine.style.width = 0 + "px";
    slideButton.style.left = 0  + "%";
  }

  function getPosition(obj, e) {
    console.log('Getting Position');

    var songSliderWidth = obj.offsetWidth;
    var evtobj = window.event ? event : e;
    clickLocation =  evtobj.layerX - obj.offsetLeft;
    
    var percentage = (clickLocation/songSliderWidth);
    updatePosition(percentage, songSliderWidth);
  }

  function updatePosition(percentage, width) {
    nativePlayer.currentTime = nativePlayer.duration * percentage;
    percentageOffset = percentage * 100 - 8;

    var activeSongWidth = width * percentage;
    durationLine.style.width = activeSongWidth  + "px";
    slideButton.style.left = percentageOffset  + "%";
  }
}