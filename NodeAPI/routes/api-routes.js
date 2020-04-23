// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import trackingController
var trackingController = require('./trackingController');
// track routes
router.route('/track')
    .get(trackingController.index) //route for getting the average prediction for curent date
    .post(trackingController.new) //route for updating daily tracking details
    .put(trackingController.call) //rout for getting the artical
    .patch(trackingController.getAllPrediction); //rout for getting all past predictions

router
    .route("/track/:track_id")
    .get(trackingController.view)    // additional route. not used for any functionality (used for viewing a data by giving id)
    .delete(trackingController.delete);   // additional route. not used for any functionality (used for delete a data by giving id)



// Export API routes
module.exports = router;