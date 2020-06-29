'use strict';
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_COLOR = '#ffffff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var SHADOW_OFFSET = 10;
var SIDE_INDENT = 55;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGT = 150;
var INDENT_BAR = 50;
var VERTICAL_INDENT_BAR = 100;
var VERTICAL_INDENT_TEXT = 30;
var VERTICAL_INDENT_LINE = 20;
var FONT_SIZE = '16px';
var FONT_FAMILY = 'PT Mono';
var TEXT_COLOR = '#000000';
var TEXT_ALIGN = 'left';
var TITLE_TEXT_ALIGN = 'center';
var PLAYER_BAR_COLOR = 'rgba(255, 0, 0, 1)';


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH - 10, y + 40);
  ctx.lineTo(x + CLOUD_WIDTH - 10, y + CLOUD_HEIGHT - 40);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x + 10, y + CLOUD_HEIGHT - 40);
  ctx.lineTo(x + 10, y - 40);
  ctx.closePath();
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = 0;
  if (arr.length) {
    maxElement = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
  }
  return maxElement;
};

var getBarHeigt = function (times, i) {
  var maxTime = getMaxElement(times);
  if (maxTime > 0) {
    return MAX_BAR_HEIGT * times[i] / maxTime;
  } else {
    return 0;
  }
};

var renderTitle = function (ctx) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = (FONT_SIZE + ' ' + FONT_FAMILY);
  ctx.textAlign = TITLE_TEXT_ALIGN;
  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_WIDTH / 2, VERTICAL_INDENT_TEXT);
  ctx.fillText('Список результатов', CLOUD_X + CLOUD_WIDTH / 2, VERTICAL_INDENT_TEXT + VERTICAL_INDENT_LINE);
};

var renderBar = function (ctx, players, times, i) {
  if (players[i] === 'Вы') {
    ctx.fillStyle = PLAYER_BAR_COLOR;
  } else {
    ctx.fillStyle = 'hsl(240, 100%,' + Math.random() * 100 + '%)';
  }
  ctx.fillRect(CLOUD_X + SIDE_INDENT + (BAR_WIDTH + INDENT_BAR) * i, VERTICAL_INDENT_BAR + MAX_BAR_HEIGT - getBarHeigt(times, i), BAR_WIDTH, getBarHeigt(times, i));
  ctx.fillStyle = TEXT_COLOR;
  ctx.textAlign = TEXT_ALIGN;
  ctx.fillText(Math.round(times[i]), CLOUD_X + SIDE_INDENT + (BAR_WIDTH + INDENT_BAR) * i, VERTICAL_INDENT_BAR + MAX_BAR_HEIGT - getBarHeigt(times, i) - VERTICAL_INDENT_LINE);
  ctx.fillText(players[i], CLOUD_X + SIDE_INDENT + (BAR_WIDTH + INDENT_BAR) * i, VERTICAL_INDENT_BAR + MAX_BAR_HEIGT + VERTICAL_INDENT_LINE);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_OFFSET, CLOUD_Y + SHADOW_OFFSET, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
  renderTitle(ctx);
  for (var i = 0; i < players.length; i++) {
    renderBar(ctx, players, times, i);
  }
};
