// Using ECMAScript ASI
(function () {
angular.module('public.layout')
    .directive('searchModal', searchModal)
    .directive('searchInput', searchInput)
    .directive('searchCloseBtn', searchCloseBtn)
   .directive('searchCloseDetails', searchCloseDetails)

function searchModal() {
    return {
        restrict: 'AEC',
        replace: false,
        link: function(scope, elem, attrs) {
            elem.bind('click', function() {
                console.log('hi')
                $('.search-overly-mask').toggleClass('open')
            })
        }
    }
}

function searchInput() {
    return {
        restrict: 'AEC',
        controller: 'searchController',
        controllerAs: 'searchCtrl',
        templateUrl: '/client/layout/views/searchModel.html',
        replace: true
    }
}

function searchCloseBtn() {
    return {
        restrict: 'AE',
        template: '<a class=" search-close search-overly-close-trigger "> <i class=" fa fa-times-circle"> </i> </a>',
        replace: true,
        link: function(scope, elem, attrs) {
            elem.bind('click', function() {
                $('.search-overly-mask').removeClass('open')
            })
        }
    }
}
function searchCloseDetails() {
    return {
        restrict: 'AE',
        link: function(scope, elem, attrs) {
            elem.bind('click', function() {
                $('.search-overly-mask').removeClass('open')
            })
        }
    }
}
})()
