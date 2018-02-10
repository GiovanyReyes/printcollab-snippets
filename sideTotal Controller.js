// using standard JS
(function () {
    angular.module('public.checkout')
        .controller('sideTotalController', sideTotalController)
    sideTotalController.$inject = [
        '$scope', 
        '$rootScope',
        'CartService']
    
    function sideTotalController(
         $scope, 
         $rootScope,
         CartService
        ) {
             
        var vm = this;
        vm.shipping = 0;
        vm.total = {};
        vm.grandTotal = {};
        vm.shoppingCart = [];       
        vm.getTotal = _getTotal;
        vm.grandTotal = grandTotal;
        vm.showAllCampaigns = showAllCampaigns;
        vm.userId = $rootScope.user.user_id;

        function showAllCampaigns() {
            if (vm.userId) {
                CartService.getCurrentCart(vm.userId, getAllSuccess, onError)
            }
        };
       
        showAllCampaigns();

        function getAllSuccess(data) {
            vm.shoppingCart = data.item
            _getTotal()
            grandTotal()
            return vm.shoppingCart
        };

        function _getTotal() {
            vm.total = 0;
            for (var i = 0; i < vm.shoppingCart.length; i++) {
                vm.item = vm.shoppingCart[i]
                vm.newQty = vm.item.quantity
                vm.campaignPrice = JSON.parse(vm.item.campaign.price)
                vm.total += (vm.campaignPrice * vm.newQty)
            }
            $scope.$parent.$broadcast('sendingTotal', vm.total);
            return vm.total;
        };

        function grandTotal() {
            vm.grandTotal = (vm.shipping + vm.total)
        };

        $scope.$on('shipping', function (event, data) {
            vm.shipping = data
            grandTotal()
        });

        $scope.$on('sendingCampaigns', function (event, data) {
            vm.campaigns = data
        });

        function onError(err) {
            console.log(err)
        };
    }
})();
