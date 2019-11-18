'use strict';

(function () {
  var dialogHandler = document.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var Coordinate = function (x, y) {
      this.x = x;
      this.y = y;
    };
    Coordinate.prototype.setX = function (x) {
      this.x = x;
    };
    Coordinate.prototype.setY = function (y) {
      this.y = y;
    };

    var startCoords = new Coordinate(evt.clientX, evt.clientY);
    var dragged = false;
    var leftPosition = window.setup.offsetWidth / 2;
    var topPosition = 0;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = new Coordinate(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);

      startCoords.setX(moveEvt.clientX);
      startCoords.setY(moveEvt.clientY);

      var canMoveLeft = (window.setup.offsetLeft - leftPosition > 0) || (shift.x < 0);
      var canMoveRight = (window.setup.offsetLeft - leftPosition + window.setup.offsetWidth < document.body.clientWidth) || (shift.x > 0);
      var canMoveTop = (window.setup.offsetTop - topPosition > 0) || (shift.y < 0);
      var canMoveDown = (window.setup.offsetTop - topPosition + window.setup.offsetHeight < window.innerHeight) || (shift.y > 0);

      if (canMoveTop && canMoveDown) {
        window.setup.style.top = (window.setup.offsetTop - shift.y) + 'px';
      }
      if (canMoveLeft && canMoveRight) {
        window.setup.style.left = (window.setup.offsetLeft - shift.x) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (dragEvt) {
          dragEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
