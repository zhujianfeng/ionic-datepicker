(function() {

  'use strict';

  angular.module('ionic-datepicker')
  .service('DatepickerService', function () {

    //var locale = window.navigator.userLanguage || window.navigator.language;
    //根据用户浏览器语言设置返回星期几，然后在页面上取字符串的第一个字符，在英文中没有问题
    //但是在中文里就特别傻，因为取出来的都是“星星星星”

    this.getDaysOfWeek = function() {
      var today     = new Date()
        , days      = []
        , firstDay  = today.getDate() - today.getDay()
        , lastDay   = firstDay + 6;
      for (var i = firstDay; i <= lastDay; i++) {
        today.setDate(i);
        days.push(today.toDateString().split(" ")[0]);
      }
      return days;
    };

    this.getMonths = function() {
      var today   = new Date()
        , months  = [];
      for (var i = 0; i < 12; i++) {
        today.setDate(1);
        today.setMonth(i);
        months.push(today.toDateString().split(" ")[1]);
      }
      return months;
    };

    this.getYears = function() {
      var years = [];
      for (var i = 2014; i < 2101; i++) years.push(i);
      return years;
    };

    this.createDateList = function(currentDate) {

      var firstDay  = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate()
        , lastDay   = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
        , dateList  = [];

      for (var i = firstDay; i <= lastDay; i++) {
        dateList.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
      }

      firstDay = dateList[0].getDay();
      for (var j = 0; j < firstDay; j++) {
        dateList.unshift(undefined);
      }
      return dateList;
    };
  });
})();
