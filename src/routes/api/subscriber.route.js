
const router = require('express').Router();
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');
const SubscriberController = require("../../controllers/subscriber.controller")

router.post('/create', awaitHandlerFactory(SubscriberController.createSubscriber))
router.get('/', awaitHandlerFactory(SubscriberController.getAllSubscribers))

module.exports = router