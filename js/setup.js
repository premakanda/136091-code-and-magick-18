'use strict';

(function () {
  var ENTER_KEY = 13;
  var ESC_KEY = 27;

  window.setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var setupUserName = document.querySelector('.setup-user-name');

  var setupTop = window.setup.style.top;
  var setupLeft = window.setup.style.left;

  var onPopupEscPress = function (evt) {
    if ((evt.keyCode === ESC_KEY) && (document.activeElement !== setupUserName)) {
      window.setup.classList.add('hidden');
    }
  };
  var openPopup = function () {
    window.setup.style.top = setupTop;
    window.setup.style.left = setupLeft;
    window.setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };
  var closePopup = function () {
    window.setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });
  setupOpenIcon.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });
  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY) {
      closePopup();
    }
  });
})();
