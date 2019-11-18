'use strict';

(function () {
  var HIDE_BLOCK_TIMEOUT = 2500;

  var wizardsList = document.querySelector('.setup-similar-list');
  window.wizards = [];

  var createHintNode = function (hintMessage, hintType) {
    var color = hintType === 'error' ? 'red' : 'green';
    var temporary = hintType === 'error' ? false : true;
    var hintNode = document.createElement('div');

    hintNode.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: ' + color + ';';
    hintNode.style.position = 'absolute';
    hintNode.style.left = 0;
    hintNode.style.right = 0;
    hintNode.style.top = 0;
    hintNode.style.fontSize = '20px';
    hintNode.style.cursor = 'pointer';
    hintNode.textContent = hintMessage;

    hintNode.addEventListener('click', function () {
      hintNode.style.display = 'none';
    });

    if (temporary) {
      setTimeout(function () {
        hintNode.parentElement.removeChild(hintNode);
      }, HIDE_BLOCK_TIMEOUT);
    }

    return hintNode;
  };

  var saveWizardsSuccess = function () {
    var successNode = createHintNode('Данные успешно отправлены на сервер', 'success');
    document.body.insertAdjacentElement('afterbegin', successNode);
    window.setup.classList.add('hidden');
  };

  var saveWizardError = function (response) {
    var errorNode = createHintNode(response, 'error');
    wizardsList.insertAdjacentElement('afterbegin', errorNode);
  };

  var setupForm = document.querySelector('.setup-wizard-form');
  setupForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(setupForm), saveWizardsSuccess, saveWizardError);
    evt.preventDefault();
  });

  var loadWizardsSuccess = function (data) {
    window.wizards = data;
    window.render(window.wizards);
  };

  var loadWizardsError = function (errorMessage) {
    var errorNode = createHintNode(errorMessage, 'error');
    wizardsList.insertAdjacentElement('afterbegin', errorNode);
  };

  window.backend.load(loadWizardsSuccess, loadWizardsError);
})();
