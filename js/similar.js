'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var debounce = function (calledFunction) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        calledFunction.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var wizardColor = {
    coat: COAT_COLORS[0],
    eyes: EYES_COLORS[0]
  };

  var wizardCoat = {
    colorNode: document.querySelector('.setup-wizard .wizard-coat'),
    colorInput: document.querySelector('.setup-player [name="coat-color"]')
  };
  var wizardEyes = {
    colorNode: document.querySelector('.setup-wizard .wizard-eyes'),
    colorInput: document.querySelector('.setup-player [name="eyes-color"]')
  };
  var wizardFireball = {
    colorNode: document.querySelector('.setup-fireball-wrap'),
    colorInput: document.querySelector('.setup-fireball-wrap [name="fireball-color"]')
  };

  var wizardParts = [
    {
      colors: COAT_COLORS,
      colorIndex: 0,
      colorNode: wizardCoat.colorNode,
      colorInput: wizardCoat.colorInput,
      colorType: 'fill',
      partName: 'coat'
    },
    {
      colors: EYES_COLORS,
      colorIndex: 0,
      colorNode: wizardEyes.colorNode,
      colorInput: wizardEyes.colorInput,
      colorType: 'fill',
      partName: 'eyes'
    },
    {
      colors: FIREBALL_COLORS,
      colorIndex: 0,
      colorNode: wizardFireball.colorNode,
      colorInput: wizardFireball.colorInput,
      colorType: 'backgroundColor',
      partName: 'fireball'
    }
  ];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === wizardColor.coat) {
      rank += 2;
    }
    if (wizard.colorEyes === wizardColor.eyes) {
      rank += 1;
    }

    return rank;
  };
  var namesComparator = function (leftName, rightName) {
    if (leftName > rightName) {
      return 1;
    } else if (leftName < rightName) {
      return -1;
    } else {
      return 0;
    }
  };
  var wizardsFilter = function (leftWizard, rightWizard) {
    var rankDiff = getRank(rightWizard) - getRank(leftWizard);
    if (rankDiff === 0) {
      rankDiff = namesComparator(leftWizard.name, rightWizard.name);
    }
    return rankDiff;
  };

  var updateWizards = function () {
    window.render(window.wizards.slice().sort(wizardsFilter));
  };

  var onPartChange = debounce(function (color, wizardPart) {
    wizardColor[wizardPart.partName] = color;
    updateWizards();
  });

  var onWizardPartClick = function (wizardPart) {
    wizardPart.colorNode.addEventListener('click', function () {
      var newColor;
      wizardPart.colorIndex = wizardPart.colorIndex < wizardPart.colors.length - 1 ? wizardPart.colorIndex += 1 : 0;

      newColor = wizardPart.colors[wizardPart.colorIndex];
      wizardPart.colorNode.style[wizardPart.colorType] = newColor;
      wizardPart.colorInput.value = newColor;

      onPartChange(newColor, wizardPart);
    });
  };

  wizardParts.forEach(function (wizardPart) {
    onWizardPartClick(wizardPart);
  });
})();
