(function($, window) {
  // 設定内容の初期値
  var defaults = {
    'startBusinessHour'        :   5,
    'startBusinessHourSelector': '.shift .start-of-date',
    'success': function() {}
  };

  // 基準となるX座標の取得
  function getBaseCoordX(options) {
    var selector = options['startBusinessHourSelector'];
    return $(selector).offset().left - 10;
  }

  // 開始時間のX座標取得
  function getStartCoordX($element) {
      return $element.offset().left - 9;
  }

  // 終了時間のX座標取得
  function getEndCoordX($element) {
      var width = $element.width() - 1;
      var startCoordX = getStartCoordX($element);
      return startCoordX + width;
  }

  // 分の取得
  function getMinute(odd) {
      if (odd >= 0.9) {
          return 0;
      } else if (odd >= 0.65) {
          return 45;
      } else if (odd >= 0.44) {
          return 30;
      } else if (odd >= 0.19) {
          return 15;
      }
      return 0;
  }

  // 時間を取得
  function getTime(coordX, options) {
      // 営業開始時間
      var startBusinessHour = options['startBusinessHour'];
      // 時間
      var hour = Math.floor(coordX / 10 / 4);
      var odd = (coordX / 10 / 4) - hour;
      hour += startBusinessHour;
      // 分
      var minute = getMinute(odd);
      return {
        'hour'  : hour,
        'minute': minute
      };
  }

  $.fn.shift = function ( options, callback, errorCallback ) {
    var opts = $.extend( {}, defaults, options );

    // プラグインの実行
    return this.each(function () {
      // 動かした要素
      var $this = $( this );

      // 基準となるx座標
      var baseCoordX = getBaseCoordX(options);

      // 開始時間の取得
      var startX = getStartCoordX($this) - baseCoordX;

      // 終了時間の取得
      var endCoordX = getEndCoordX($this) - baseCoordX;

      // コールバック関数を実行
      opts['success'](getTime(startX, opts), getTime(endCoordX, opts));
    });
  };

}(jQuery, window));
