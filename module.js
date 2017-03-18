'use strict'
// using Standard JS
angular.module('public.checkout', ['ui.router', 'ui.bootstrap-slider', 'stripe'])
    .config(function($stateProvider) {
        $stateProvider
            .state('public.checkout', {
                abstract: true,
                url: '/checkout',
                data: {
                    title: 'CheckOut',
                    css: 'assets/css/checkout.css'
                },
                views: {
                    'content@public': {
                        templateUrl: '/client/checkout/views/MainCheckout.html'
                    }
                }
            })
            .state('public.checkout.login', {
                url: '/login',
                params: {
                    order: {},
                    cart: {}
                },
                data: {
                    title: 'Address Login'
                },
                views: {
                    'content@public': {
                        templateUrl: '/client/checkout/views/LoginCheckout.html',
                        controller: 'CheckoutController as CheckoutCtrl'
                    }
                }
            })
            .state('public.checkout.confirmation', {
                url: '/confirmation',
                params: {
                    order: {},
                    cart: {}
                },
                data: {
                    title: 'Order Confirmation'
                },
                views: {
                    'content@public': {
                        templateUrl: '/client/checkout/views/confirmation.html',
                        controller: 'CheckoutController as CheckoutCtrl'
                    }

                }

            })
            .state('public.checkout.address', {
                url: '/address',
                params: {
                    order: {},
                    cart: {}
                },
                data: {
                    title: 'Shipping Address'
                },
                views: {
                    'subContent@public.checkout': {
                        templateUrl: '/client/checkout/views/SavedAddresses.html',
                        controller: 'MyAddressesController as addCtrl'
                    }
                }
            })
            .state('public.checkout.address.form', {
                url: '/address/form',
                params: {
                    order: {},
                    cart: {}
                },
                data: {
                    title: 'Shipping Address Form'
                },
                views: {
                    'subContent@public.checkout': {
                        templateUrl: '/client/checkout/views/AddressFormCheckout.html',
                        controller: 'CheckoutController as CheckoutCtrl'
                    }
                }
            })
            .state('public.checkout.billing', {
                url: '/billing',
                params: {
                    order: {},
                    cart: {},
                    address: {}
                },
                data: {
                    title: 'Billing Address'
                },
                views: {
                    'subContent@public.checkout': {
                        templateUrl: '/client/checkout/views/BillingCheckout.html',
                        controller: 'CheckoutController as CheckoutCtrl'
                    }
                }
            })
            .state('public.checkout.same.address', {
                url: '/billing',
                params: {
                    order: {},
                    cart: {}
                },
                data: {
                    title: 'Billing Address Form'
                },
                views: {
                    'checkBox@public.checkout': {
                        templateUrl: '/client/checkout/views/SameAddressCheckbox.html',
                        controller: 'CheckoutController as CheckoutCtrl'
                    }
                }
            })
            .state('public.checkout.shipping', {
                url: '/shipping',
                params: {
                    order: {},
                    cart: {}
                },
                data: {
                    title: 'Shipping'
                },
                views: {
                    'subContent@public.checkout': {
                        templateUrl: '/client/checkout/views/ShippingCheckout.html',
                        controller: 'CheckoutController as CheckoutCtrl'
                    }
                }
            })
            .state('public.checkout.payment', {
                url: '/payment?PayerID&paymentId',
                params: {
                    order: {},
                    cart: {}
                },
                data: {
                    title: 'Payment'
                },
                views: {
                    'subContent@public.checkout': {
                        templateUrl: '/client/checkout/views/PaymentCheckout.html',
                        controller: 'CheckoutController as CheckoutCtrl'
                    }
                }
            })
            .state('public.checkout.order', {
                url: '/order?PayerID&paymentId',
                params: {
                    order: {},
                    cart: {}
                },
                data: {
                    title: 'Confirm Order'
                },
                views: {
                    'subContent@public.checkout': {
                        templateUrl: '/client/checkout/views/OrderCheckout.html',
                        controller: 'CheckoutController as CheckoutCtrl'
                    }
                }

            })
    })
