'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_SHADOW_OFFSET = 10;
  var CLOUD_TEXT_OFFSET = 40;
  var CLOUD_RESULT_OFFSET = 20;
  var CLOUD_COLOR = '#ffffff';
  var CLOUD_SHADOW_COLOR = 'rgba(0,0,0,0.5)';
  var CLOUD_TEXT = 'Ура вы победили!';
  var CLOUD_RESULT = 'Список результатов:';

  var COLUMN_WIDTH = 40;
  var COLUMN_HEIGHT = 150;
  var COLUMN_BASE_X = 150;
  var COLUMN_Y = 100;
  var COLUMN_OFFSET = COLUMN_WIDTH + 50;
  var COLUMN_NAME_Y_OFFSET = 20;
  var COLUMN_TIME_Y_OFFSET = -10;
  var COLUMN_COLOR = 'rgba(0,0,0,1)';
  var COLUMN_TEXT_FONT = '16px PT Mono';

  var renderCloud = function (ctx, cloudShape) {
    ctx.fillStyle = cloudShape.color;
    ctx.fillRect(cloudShape.x, cloudShape.y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var renderColumn = function (ctx, name, time, columnShape) {
    ctx.fillStyle = columnShape.color;
    ctx.fillRect(columnShape.x, columnShape.y, columnShape.width, columnShape.height);
    ctx.fillStyle = COLUMN_COLOR;
    ctx.fillText(name, columnShape.x, COLUMN_HEIGHT + COLUMN_Y + COLUMN_NAME_Y_OFFSET);
    ctx.fillText(time, columnShape.x, columnShape.y + COLUMN_TIME_Y_OFFSET);
  };

  var findMaxScore = function (times) {
    for (var i = 0; i < times.length - 1; i++) {
      var maxTime = times[i];

      for (var j = i + 1; j < times.length; j++) {
        if (times[j] > maxTime) {
          maxTime = times[j];
          var swap = times[i];
          times[i] = maxTime;
          times[j] = swap;
        }
      }
    }
    return times[0];
  };

  var getColumnColor = function (name) {
    return name === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240,100%,' + 100 * Math.random() + '%)';
  };

  var getColumnParameters = function (userColumnHeight, name, index) {
    return {
      x: COLUMN_BASE_X + COLUMN_OFFSET * index,
      y: COLUMN_Y + (COLUMN_HEIGHT - userColumnHeight),
      width: COLUMN_WIDTH,
      height: userColumnHeight,
      color: getColumnColor(name)
    };
  };

  // eslint-disable-next-line
  window.renderStatistics = function (ctx, names, times) {
    var maxScore = findMaxScore(times);
    renderCloud(ctx, {color: CLOUD_SHADOW_COLOR, x: CLOUD_X + CLOUD_SHADOW_OFFSET, y: CLOUD_Y + CLOUD_SHADOW_OFFSET});
    renderCloud(ctx, {color: CLOUD_COLOR, x: CLOUD_X, y: CLOUD_Y});

    ctx.fillStyle = COLUMN_COLOR;
    ctx.font = COLUMN_TEXT_FONT;
    ctx.fillText(CLOUD_TEXT, CLOUD_X + CLOUD_TEXT_OFFSET, CLOUD_TEXT_OFFSET);
    ctx.fillText(CLOUD_RESULT, CLOUD_X + CLOUD_TEXT_OFFSET, CLOUD_TEXT_OFFSET + CLOUD_RESULT_OFFSET);

    names.forEach(function (currentElement, index) {
      var time = Math.round(times[index]);
      var userColumnHeight = Math.round(COLUMN_HEIGHT * time / maxScore);
      renderColumn(ctx, names[index], time, getColumnParameters(userColumnHeight, names[index], index));
    });
  };
})();

