(function() {

  'use strict';

  angular
  .module('ionic-datepicker')
  .filter("zhWeek", [function(){
    return function(input) {
      var hash = {
        "Mon": "一",
        "Tue": "二",
        "Wed": "三",
        "Thu": "四",
        "Fri": "五",
        "Sat": "六",
        "Sun": "日"
      };
      var ret = hash[input];
      if (ret) {
        return ret;
      } else {
        return input;
      }
    };
  }])
  .filter("zhWeekTran", [function(){
    return function(input) {
      var hash = {
        "Monday": "星期一",
        "Tuesday": "星期二",
        "Wednesday": "星期三",
        "Thursday": "星期四",
        "Friday": "星期五",
        "Saturday": "星期六",
        "Sunday": "星期日"
      };
      var ret = hash[input];
      if (ret) {
        return ret;
      } else {
        return input;
      }
    };
  }])
  .filter("zhMonthTran", [function(){
    return function(input) {
      var hash = {
        "Jan": "一月",
        "Feb": "二月",
        "Mar": "三月",
        "Apr": "四月",
        "May": "五月",
        "Jun": "六月",
        "Jul": "七月",
        "Aug": "八月",
        "Sep": "九月",
        "Oct": "十月",
        "Nov": "十一月",
        "Dec": "十二月",
      };
      var ret = hash[input];
      if (ret) {
        return ret;
      } else {
        return input;
      }
    };
  }])
  .controller('DatepickerCtrl', [ '$scope', 'DatepickerService', function ($scope, DatepickerService) {

    var type  = 'date'
      , today = new Date();

    // Delegates
    this.getDaysOfWeek = DatepickerService.getDaysOfWeek;
    this.getMonths = DatepickerService.getMonths;
    this.getYears = DatepickerService.getYears;

    this.initialize = function() {

      this.selectedDate = angular.copy($scope.date || new Date());
      this.tempDate = angular.copy(this.selectedDate);

      this.createDateList(this.selectedDate);
    };

    this.getDate = function(row, col) {
      return this.dateList[row * 7 + col];
    };

    this.isDefined = function(date) {
      return date !== undefined;
    };

    this.isDisabled = function(date) {
      if (!date) return true;
      if ($scope.min) {
        $scope.min.setHours(0, 0, 0, 0);
        if (date < $scope.min) return true;
      }
      if ($scope.max) {
        $scope.max.setHours(0, 0, 0, 0);
        if (date > $scope.max) return true;
      }
      return false;
    };

    this.isActualDate = function(date) {
      if (!date) return false;
      return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
    };

    this.isActualMonth = function(month) {
      return month === today.getMonth();
    };

    this.isActualYear = function(year) {
      return year === today.getFullYear();
    };

    this.isSelectedDate = function(date) {
      if (!date) return false;
      return date.getDate() === this.selectedDate.getDate() &&
        date.getMonth() === this.selectedDate.getMonth() &&
        date.getFullYear() === this.selectedDate.getFullYear();
    };

    this.isSelectedMonth = function(month) {
      return month === this.tempDate.getMonth();
    };

    this.isSelectedYear = function(year) {
      return year === this.tempDate.getFullYear();
    };

    this.changeType = function(val) {
      type = val;
    };

    this.showType = function(val) {
      return type === val;
    };

    this.selectDate = function (date) {
      if (this.isDisabled(date)) return;
      this.selectedDate = date;
      this.selectedDate.setHours(0, 0, 0, 0);
      this.tempDate = angular.copy(this.selectedDate);
    };

    this.selectMonth = function(month) {
      this.tempDate = angular.copy(this.tempDate);
      this.tempDate.setMonth(month);
      if (this.tempDate.getMonth() !== month) {
        this.tempDate.setDate(0);
      }
      this._selectMonthOrYear();
    };

    this.selectYear = function(year) {
      this.tempDate = angular.copy(this.tempDate);
      this.tempDate.setFullYear(year);
      this._selectMonthOrYear();
    };

    this._selectMonthOrYear = function() {
      this.changeType('date');
      this.createDateList(this.tempDate);
      if (this.isDisabled(this.tempDate)) return;
      this.selectedDate = this.tempDate;
    };

    this.createDateList = function(selectedDate) {
      this.dateList = DatepickerService.createDateList(selectedDate);
      this.cols = new Array(7);
      this.rows = new Array(parseInt(this.dateList.length / this.cols.length) + 1);
    };

    this.onCancel = function(e) {
      this.selectedDate = angular.copy($scope.date || new Date());
      $scope.callback(undefined);
    };

    this.onDone = function(e) {
      $scope.date = angular.copy(this.selectedDate);
      $scope.callback($scope.date);
    };

  }]);
})();
