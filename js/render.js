'use strict';

(function () {
  var NUMBER_OF_SHOWN_WIZARDS = 4;

  var generateWizardNode = function (wizard) {
    var wizardElementTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    var wizardNode = wizardElementTemplate.cloneNode(true);

    wizardNode.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardNode.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardNode.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardNode;
  };

  var wizardsList = document.querySelector('.setup-similar-list');
  var wizardsBlock = document.querySelector('.setup-similar');

  window.render = function (wizards) {
    var wizardsNumber = wizards.length > NUMBER_OF_SHOWN_WIZARDS ? NUMBER_OF_SHOWN_WIZARDS : wizards.length;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizardsNumber; i++) {
      fragment.appendChild(generateWizardNode(wizards[i]));
    }

    wizardsList.innerHTML = '';
    wizardsList.appendChild(fragment);
    wizardsBlock.classList.remove('hidden');
  };
})();
