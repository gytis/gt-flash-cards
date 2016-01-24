(function() {
  'use strict';

  angular.module('flashCards.controllers', ['ionic', 'flashCards.services'])
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

    .controller('GameController', function($scope, $localCardsContainer, $ionicAnimation) {
      $scope.cards = $localCardsContainer.getAll();
      $scope.currentCard = {};
      $scope.displayCardContent = '';
      $scope.answered = true;

      $scope.next = function() {
        if ($scope.answered) {
          $scope.getNextCard();
          $scope.displayCardContent = $scope.currentCard.front;
        } else {
          $scope.displayCardContent = $scope.currentCard.back;
        }
        $scope.answered = !$scope.answered;
      };

      $scope.getNextCard = function() {
        if ($scope.cards.length === 0) {
          throw Error('Out of cards');
        }

        var i = Math.floor(Math.random() * $scope.cards.length);
        $scope.currentCard = $scope.cards[i];
        $scope.cards.splice(i, 1);
      };

      $scope.next();
    })

})();
