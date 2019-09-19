'use strict';

var WIZARD_NAMES = ['Дамблдор', 'Волдеморт', 'Доктор Стрендж', 'Гарри Поттер'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var wizards = function (name, coatColor, eyesColor) {
  for (var i = 0; i < name.length; i++) {
    name = WIZARD_NAMES[i];
  }
  for (var j = 0; i < coatColor.length; j++) {
    coatColor = Math.random(coatColor[j]);
  }
  for (var k = 0; k < eyesColor.length; k++) {
    eyesColor = Math.random(eyesColor[k]);
  }
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var t = 0; t < wizards.length; t++) {
  fragment.appendChild(renderWizard(wizards[t]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
