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
      $scope.isShowFront = true;
      $scope.totalCount = $scope.unusedCards.length;
      $scope.correctCount = 0;
      $scope.wrongCount = 0;

      addCard();

      $scope.toggleSide = function() {
        $scope.isShowFront = !$scope.isShowFront;
      };

      $scope.cardDestroyed = function() {
        addCard();
        $scope.cards.splice(0, 1);
      };

      $scope.onTransitionLeft = function() {
        $scope.wrongCount++;
      };

      $scope.onTransitionRight = function() {
        $scope.correctCount++;
      };

      $scope.toggleLeftMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };

      $scope.isGameEnd = function() {
        return $scope.totalCount == $scope.correctCount + $scope.wrongCount;
      };

      function addCard() {
        if ($scope.unusedCards.length > 0) {
          $scope.cards.push($scope.unusedCards[0]);
          $scope.unusedCards.splice(0, 1);
        }
      }
    })

})();
