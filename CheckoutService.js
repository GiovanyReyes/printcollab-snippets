// Using standard JS
(function () {
angular.module('public.checkout')
    .factory('CheckoutServices', CheckoutServicesFactory)
CheckoutServicesFactory.$inject = ['$http']

function CheckoutServicesFactory($http) {
    return {
        getSavedAddress,
        submitOrder
    }

    function getSavedAddress(id, onSuccess, onError) {
        $http.get('/api/addresses' + id)
            .then(function(response) {
                onSuccess(response.data)
            }).catch(function(response) {
                onError(response.data)
            })
    }

    function submitOrder(data, onSuccess, onError) {
        $http.post('/api/orders/checkout', data)
            .then(function(response) {
                onSuccess(response.data)
            }).catch(function(response) {
                onError(response.data)
            })
    }
}
})()
