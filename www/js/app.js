(function() {
  'use strict';

  angular.module('flashCards', ['ionic', 'flashCards.controllers'])
    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    })
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/cards");

      $stateProvider
        .state('cards', {
          url: '/cards',
          templateUrl: 'templates/cards.html'
        })
        .state('game', {
          url: '/game',
          templateUrl: 'templates/game.html'
        })
    });

})();
