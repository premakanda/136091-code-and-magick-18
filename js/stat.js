'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_X = 140;
var BAR_Y = 240;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var NAME_Y = 260;
var MAX_TINE_Y = 230;
var INTERVAL_TERM = 100;
var TEXT_X = 120;
var TEXT_VICTORY_Y = 35;
var TEXT_RESULT_Y = 55;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    maxElement = arr[i] > maxElement ? arr[i] : maxElement;
  }

  return maxElement;
};

// подбор цвета
var randomColor = function () {
  var randomNumber = Math.random() * 100;
  var color = 'hsl(250,80%,' + randomNumber + '%)';
  return color;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)'); // Рисует белое облако
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff'); // Рисует тень облако

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', TEXT_X, TEXT_VICTORY_Y);
  ctx.fillText('Список результатов:', TEXT_X, TEXT_RESULT_Y);

  var maxTime = getMaxElement(times);
  var interval = 0;

  // Рисуем гистограму
  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : randomColor();
    ctx.fillRect(BAR_X + interval, BAR_Y, BAR_WIDTH, -(MAX_BAR_HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), BAR_X + interval, MAX_TINE_Y - ((MAX_BAR_HEIGHT * times[i]) / maxTime));
    ctx.fillText(names[i], BAR_X + interval, NAME_Y);
    interval += INTERVAL_TERM;
  }
};
