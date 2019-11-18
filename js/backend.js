'use strict';

(function () {
  var DATA_TYPE = 'json';
  var SUCCESS_CODE = 200;

  var loadURL = 'https://js.dump.academy/code-and-magick/data';
  var saveURL = 'https://js.dump.academy/code-and-magick';

  var transmitData = function (xhr, onLoad, onError, processAction) {
    if (xhr.status === SUCCESS_CODE) {
      onLoad(xhr.response);
    } else {
      var errorAction = processAction === 'load' ? 'загрузить' : 'сохранить';
      onError('Не удалось ' + errorAction + ' данные: ' + xhr.status + ' ' + xhr.statusText);
    }
  };

  var processData = function (onLoad, onError, processAction, data) {
    var xhr = new XMLHttpRequest();
    var url = processAction === 'load' ? loadURL : saveURL;
    var method = processAction === 'load' ? 'GET' : 'POST';

    xhr.responseType = DATA_TYPE;
    xhr.open(method, url);

    xhr.addEventListener('load', function () {
      transmitData(xhr, onLoad, onError, processAction);
    });

    if (processAction === 'load') {
      xhr.send();
    } else if (processAction === 'save') {
      xhr.send(data);
    }
  };

  window.backend = {
    load: function (onLoad, onError) {
      processData(onLoad, onError, 'load');
    },
    save: function (data, onLoad, onError) {
      processData(onLoad, onError, 'save', data);
    }
  };
})();
