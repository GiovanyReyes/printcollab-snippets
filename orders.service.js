//Using standard JS
module.exports = ordersService

function ordersService(options) {
    let Order

    if (!options.modelService) {
        throw new Error('Options.modelService is required')
    }

    Order = options.modelService

    return {
        getAll,
        getCountByCampaignId,
        getOne,
        insert,
        insertFromCheckout,
        updateOne,
        removeOne
    }

    function getAll() {
        return Order.find()
    }

    function getCountByCampaignId(queryCondition) {
        return Order.find(queryCondition)
            .select('quantity')
    }

    function getOne(queryCondition) {
        return Order.findOne(queryCondition)
    }

    function insert(document) {
        let order = new Order(document)
        return order.save()
    }

    function insertFromCheckout(document) {
        let orders = []
        for (var i = 0; i < document.campaigns.length; i++) {
            let order = new Order({
                campaign: document.campaigns[i].campaign,
                quantity: document.campaigns[i].quantity,
                price: document.campaigns[i].price,
                name: document.campaigns[i].name,
                customer_id: document.customer_id,
                shipping_address: document.shipping_address,
                billing_address: document.billing_address,
                shipping: document.shipping,
                status: document.status

            })
            orders.push(order)
        }
        return Order.insertMany(orders)
    }

    function updateOne(queryCondition, doc) {
        return Order.findOneAndUpdate(queryCondition, doc, {
            new: true
        })
    }

    function removeOne(queryCondition) {
        return Order.findOneAndRemove(queryCondition)
    }
}
