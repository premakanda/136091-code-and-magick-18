'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCAOLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb (0, 0, 0)'];
var WIZARD_EYESCAOLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var setupElement = document.querySelector('.setup');
var similarListElement = setupElement.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomItem = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

var generateWizards = function (count) {
  var data = [];
  for (var i = 0; i < count; i++) {
    data.push({
      name: getRandomItem(WIZARD_NAMES) + getRandomItem(WIZARD_SURNAMES),
      coatColor: getRandomItem(WIZARD_COATCAOLOR),
      eyesColor: getRandomItem(WIZARD_EYESCAOLOR)
    });
  }
  return data;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var t = 0; t < arr.length; t++) {
    fragment.appendChild(renderWizard(arr[t]));
  }
  similarListElement.appendChild(fragment);
};

setupElement.classList.remove('hidden');
var wizards = generateWizards(4);
renderWizards(wizards);
setupElement.querySelector('.setup-similar').classList.remove('hidden');


// задвние: одеть Надежду
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupElement.querySelector('.setup-close');

// var nameForm = setup.querySelector('.setup-user-name');
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARD_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = getRandomItem(WIZARD_COATCAOLOR);
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = getRandomItem(WIZARD_EYESCAOLOR);
});

wizardFireball.addEventListener('click', function () {
  wizardFireball.style.backgroundColor = getRandomItem(WIZARD_FIREBALL);
});

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setupElement.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setupElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

