'use strict';
(function () {
  var URL = 'https://js.dump.academy/code-and-magick';

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10s

      xhr.open('GET', URL);
      xhr.send();

    },

    save: function (data, onLoad, onError) {
      // var fragment = document.createDocumentFragment();

      // for (var i = 0; i < 4; i++) {
      //   fragment.appendChild(renderWizard(data[i]));
      // }
      // similarListElement.appendChild(fragment);

      // userDialog.querySelector('.setup-similar').classList.remove('hidden');

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';


      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10s

      xhr.open('GET', URL);
      xhr.send();
    }
  };


  // var URL = 'https://js.dump.academy/code-and-magick';

  // window.upload = function (data, onSuccess) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.responseType = 'json';

  //   xhr.addEventListener('load', function () {
  //     onSuccess(xhr.response);
  //   });

  //   xhr.open('POST', URL);
  //   xhr.send(data);
  // };

  // window.load = function (onSuccess, onError) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.responseType = 'json';

  //   xhr.addEventListener('load', function () {
  //     if (xhr.status === 200) {
  //       onSuccess(xhr.response);
  //     } else {
  //       onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
  //     }
  //   });
  //   xhr.addEventListener('error', function () {
  //     onError('Произошла ошибка соединения');
  //   });
  //   xhr.addEventListener('timeout', function () {
  //     onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  //   });

  //   xhr.timeout = 10000; // 10s

  //   xhr.open('GET', URL);
  //   xhr.send();
  // };
})();
