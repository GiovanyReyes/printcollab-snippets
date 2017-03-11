const responses = require('../models/responses')
const path = require('path')
const apiPrefix = '/api/slides/'
const slideModel = require('../models/slide')
const slidesService = require('../services/slides.services')({
    modelService: slideModel
})

module.exports = slidesController

function slidesController() {
    return {
        getAll,
        getAllFeatured,
        getOneById,
        insert,
        updateById,
        removeById
    }

    function getAll(req, res) {
        slidesService.getAll()
            .then((slides) => {
                const responseModel = new responses.ItemsResponse()
                responseModel.items = slides
                res.json(responseModel)
            }).catch((err) => {
                res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function getAllFeatured(req, res) {
        slidesService.getAllFeatured()
            .then((slides) => {
                const responseModel = new responses.ItemsResponse()
                responseModel.items = slides
                res.json(responseModel)
            }).catch((err) => {
                res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function getOneById(req, res) {
        let queryCondition = {
            _id: req.params.id
        }
        slidesService.getOne(queryCondition)
            .then((slide) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = slide
                res.json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function insert(req, res) {
        slidesService.insert(req.body)
            .then((slide) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = slide
                res.status(201)
                    .location(path.join(apiPrefix, slide._id.toString()))
                    .json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function updateById(req, res) {
        let queryCondition = {
            _id: req.params.id
        }
        slidesService.updateOne(queryCondition, req.body)
            .then((slide) => {
                const responseModel = new responses.ItemResponse()
                res.status(204)
                    .json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err.stack))
            })
    }

    function removeById(req, res) {
        let queryCondition = {
            _id: req.params.id
        }
        slidesService.removeOne(queryCondition)
            .then((slide) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = slide
                res.json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }
}
