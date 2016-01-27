(function() {
  'use strict';

  angular.module('flashCards.controllers', ['ionic', 'ngUnderscore', 'flashCards.services', 'ionic.contrib.ui.tinderCards'])
    .controller('CardsController', function($scope, $ionicSideMenuDelegate, $ionicModal, $localCardsContainer) {
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

    .controller('GameController', function($scope, $localCardsContainer, underscore, $ionicSideMenuDelegate) {
      $scope.unusedCards = underscore.shuffle($localCardsContainer.getAll());
      $scope.cards = [];
      $scope.showAnswer = false;

      addCard();

      $scope.cardDestroyed = function(index) {
        console.log("Card destroyed");
        addCard();
        $scope.cards.splice(index, 1);
      };

      $scope.toggleSide = function() {
        $scope.showAnswer = !$scope.showAnswer;
      };

      $scope.cardSwipedLeft = function() {
        console.log("Card swiped left");
      };

      $scope.cardSwipedRight = function() {
        console.log("Card swiped right");
      };

      $scope.cardSnapBack = function() {
        console.log("Snap back");
      };

      $scope.toggleLeftMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };

      function addCard() {
        if ($scope.unusedCards.length > 0) {
          $scope.cards.push($scope.unusedCards[0]);
          $scope.unusedCards.splice(0, 1);
        }
      }
    })

})();
