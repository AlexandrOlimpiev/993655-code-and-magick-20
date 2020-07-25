'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var wizards = [];
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var getRandomElement = function (listElements) {
  return listElements[Math.round(Math.random() * (listElements.length - 1))];
};

var makeWizard = function () {
  return {
    'name': getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
    'coatColor': getRandomElement(COAT_COLORS),
    'eyesColor': getRandomElement(EYES_COLORS)
  };
};

var getWizards = function () {
  var array = [];
  for (var i = 0; i < 4; i++) {
    array[i] = makeWizard();
  }
  return array;
};

wizards = getWizards();

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var renderWizards = function (arrayWizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 4; i++) {
    fragment.appendChild(renderWizard(arrayWizards[i]));
  }
  return fragment;
};

similarListElement.appendChild(renderWizards(wizards));
userDialog.querySelector('.setup-similar').classList.remove('hidden');

var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userNameInput = userDialog.querySelector('.setup-user-name');
var FlagFocuseNameInput = false;

userNameInput.addEventListener('focus', function () {
  FlagFocuseNameInput = true;
});

userNameInput.addEventListener('blur', function () {
  FlagFocuseNameInput = false;
});

var dialogEscapePressHandler = function (evt) {
  if (evt.key === ESC_KEY && FlagFocuseNameInput === false) {
    closeDialog();
  }
};

var openDialog = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', dialogEscapePressHandler);
};

var closeDialog = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', dialogEscapePressHandler);
};


userDialogOpen.addEventListener('click', function () {
  openDialog();
});

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openDialog();
  }
});

userDialogClose.addEventListener('click', function () {
  closeDialog();
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closeDialog();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var userSetup = document.querySelector('.setup-player');
var userWizard = userSetup.querySelector('.setup-wizard');
var coatUserWizard = userWizard.querySelector('.wizard-coat');
var eyesUserWizard = userWizard.querySelector('.wizard-eyes');
var fireballUserWizard = userSetup.querySelector('.setup-fireball-wrap');

coatUserWizard.addEventListener('click', function () {
  coatUserWizard.style.fill = getRandomElement(COAT_COLORS);
  userSetup.querySelector('input[name="coat-color"]').value = coatUserWizard.style.fill;
});

eyesUserWizard.addEventListener('click', function () {
  eyesUserWizard.style.fill = getRandomElement(EYES_COLORS);
  userSetup.querySelector('input[name="eyes-color"]').value = eyesUserWizard.style.fill;
});

fireballUserWizard.addEventListener('click', function () {
  fireballUserWizard.querySelector('input[name="fireball-color"]').value = getRandomElement(FIREBALL_COLOR);
  fireballUserWizard.style.background = fireballUserWizard.querySelector('input[name="fireball-color"]').value;
});
