(function() {
  'use strict';

  angular.module('flashCards.services', [])
    .factory('$localStorage', ['$window', function($window) {
      return {
        set: function(key, value) {
          $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
          return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
          $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
          return JSON.parse($window.localStorage[key] || '{}');
        }
      }
    }])
    .factory('$localCardsContainer', ['$localStorage', function($localStorage) {
      var containerKey = 'CARDS_CONTAINER';

      if (!($localStorage.getObject(containerKey) instanceof Array)) {
        $localStorage.setObject(containerKey, []);
      }

      return {
        getAll: function() {
          return $localStorage.getObject(containerKey);
        },
        add: function(card) {
          var container = $localStorage.getObject(containerKey);
          container.push(card);
          console.log(container);
          $localStorage.setObject(containerKey, container);
        }
      };
    }]);

})();
