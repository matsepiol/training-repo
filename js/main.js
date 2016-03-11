var mainModule = (function() {

  var xDown = null,
    yDown = null;

  var handleTouchStart = function(e) {
    xDown = e.touches[0].clientX;
    yDown = e.touches[0].clientY;
  };

  var handleTouchMove = function(e) {
    if (!xDown || !yDown) {
      return;
    }

    var xUp = e.touches[0].clientX;
    var yUp = e.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        hideMenu();
      } else {
        showMenu();
      }
    }

    xDown = null;
    yDown = null;
  };

  var showMenu = function() {
    var mobileMenu = document.getElementsByClassName("mobile-menu")[0];
    var mobileBackground = document.getElementsByClassName("currently-played")[0];

    mobileMenu.style.width = "75%";
    mobileMenu.style.padding = "0 25px";

    mobileBackground.addEventListener("click", hideMenu);
  };

  var hideMenu = function() {
    var mobileMenu = document.getElementsByClassName("mobile-menu")[0];

    mobileMenu.style.width = "0";
    mobileMenu.style.padding = "0";
  };

  var toggleVolumeSlider = function() {
    var obj = document.getElementsByClassName("custom-player")[0];

    if (obj.style.display === "none" || !obj.style.display) {
      obj.style.display = "inline-block";
    } else {
      obj.style.display = "";
    }
  };

  var navigateTo = function(e) {
    e.preventDefault();

    var obj = (e.target === e.currentTarget ? e.target : e.target.parentNode);
    var destination = obj.getAttribute('href').slice(1); //getting rid of #
    var startPosition = window.pageYOffset;
    var targetSectionPosition = document.getElementById(destination).offsetTop;

    var scrolling = setInterval(function() {
      if (window.pageYOffset >= targetSectionPosition || window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        clearInterval(scrolling);
      } else {
        window.scrollTo(0, window.pageYOffset + 8);
      }
    }, 1);
  };

  var currentlyPlayedTab = document.getElementsByClassName("currently-played")[0];
  var menuLink = document.getElementsByClassName("menu-link");

  currentlyPlayedTab.addEventListener('touchstart', handleTouchStart);
  currentlyPlayedTab.addEventListener('touchmove', handleTouchMove);

  for (var i = 0; i < menuLink.length; i++) {
    menuLink[i].addEventListener('click', navigateTo);

    //hide menu after navigating
    menuLink[i].addEventListener('click', hideMenu);
  }

  return {
    showMenu: showMenu,
    toggleVolumeSlider: toggleVolumeSlider
  }

})();