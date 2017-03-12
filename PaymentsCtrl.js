// Using ECMAScript ASI
(function () {
angular.module('public.payments')
    .controller('PaymentsController', PaymentsController)
PaymentsController.$inject = ['PaymentsService', '$scope', '$state', '$rootScope', 'UsersService']

function PaymentsController(PaymentsService, $scope, $state, $rootScope, UsersService) {
    var vm = this
    vm.tagline = 'the higher road'
    vm.user = {}
    vm.getUser = _getUser
    vm.cardForm = {}
    vm.selectCheckBox = selectCheckBox
    vm.user._id = {}
    vm.paymentForm = {}
    vm.disableButton = disableButton
    vm.isDisabled = false

    _getUser()

    console.log(vm.user)

    function _getUser() {
        vm.user = $rootScope.user // finding logged in user via $rootscope defind in app.js
        vm.user.id = $rootScope.user.id
        console.log(vm.user.id)
        return vm.user
    }

    vm.checkbox = {
        selected: false
    }

    function selectCheckBox() {
        console.log('big thie')
        vm.select = true
    }

    $scope.saveCustomer = function(status, response) {
        vm.user['token'] = {
            source: response.id,
            email: vm.user.email
        }

        // SEND TOKEN BACK TO STRIPE TO SAVE CUSTOMER
        PaymentsService.saveCard(vm.user.id, vm.user.token, saveCardSuccess, onStripeError)
        // PaymentsService.saveCard(vm.user._id, response, saveCardSuccess, onStripeError)
    }

    // SAVE CUSTOMER SUCCESS
    function saveCardSuccess(data) {
        vm.user.card_brand = data.item.payment.card_brand
        vm.user.card_lastFour = data.item.payment.card_lastFour
        vm.user.card_exp_month = data.item.payment.card_exp_month
        vm.user.card_exp_year = data.item.payment.card_exp_year
        $state.go('public.checkout.payment')
    }

    function disableButton() {
        console.log('disabled button clicked')
        vm.isDisabled = true
    }
    // ERROR HANDLER
    function onStripeError(err) {
        console.log(err)
    }

    function onError(err) {
        console.log(err)
    }

    console.log(vm.user.stripe_id + '   user stripe outside of function')
}
})()
