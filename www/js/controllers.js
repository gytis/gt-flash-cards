(function() {
  'use strict';

  angular.module('flashCards.controllers', ['ionic', 'flashCards.services'])
    .controller('CardsController', function($scope, $ionicSideMenuDelegate, $ionicModal, $localCardsContainer) {
      if ($ionicSideMenuDelegate.isOpenLeft()) {
        $ionicSideMenuDelegate.toggleLeft();
      }

      $scope.cards = $localCardsContainer.getAll();

      $scope.saveCard = function(card) {
        $localCardsContainer.add({
          front: card.front,
          back: card.back
        });
        $scope.cards = $localCardsContainer.getAll();
        $scope.cardModal.hide();
        card.front = '';
        card.back = '';
      };

      $scope.openNewCard = function() {
        $scope.cardModal.show();
      };

      $scope.closeNewCard = function() {
        $scope.cardModal.hide();
      };

      $scope.toggleLeftMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };

      $ionicModal.fromTemplateUrl('templates/addCard.html', function(modal) {
        $scope.cardModal = modal;
      }, {
        scope: $scope,
        animation: 'slide-in-up'
      });
    })

})();
