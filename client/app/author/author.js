'use strict';

angular.module('shopnxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('author', {
        title: 'Add, Remove, Edit Authors',
        url: '/author',
        templateUrl: 'app/author/author.html',
        controller: 'AuthorCtrl',
        authenticate: true
      });
  });
