現在開発中です。
========

## シフト管理のようなインターフェースのjQueryプラグイン

Chromeでしかまだ確認していませんので、使用する際はご注意ください。
ガントチャートのようなものはよく見かけるのですが、時間を選択するようなものは見つける事ができなかったので、実装しました。

15分単位で時間を選択できます。

### Usage

  <script>
  $(function() {
    $('.resizable').resizable({
      'grid'   :    10,
      'handles': 'e,w',
      'stop'   : function(event) {
        $(this).shift({
          'grid' :    10,
          'startBusinessHourSelector': '.shift .start-of-date',
          'event': event,
          'success': function(startTime, endTime) {
            $('#time').text("選択した時間は、" + startTime['hour'] + '時' + startTime['minute'] + '分' + 'から' + endTime['hour'] + '時' + endTime['minute']);
          }
        });
      }
    });
  });
  </script>
