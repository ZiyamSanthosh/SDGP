// api-routes.js
// Initialize express router
let router = require("express").Router();
const validator = require("express-validator");

// Set default API response
router.get("/", function (req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to RESTHub crafted with love!",
  });
});

// Import trackingController
var trackingController = require("../controllers/trackingController");
// Import initialDetailController
var initialDetailController = require("../controllers/initialDetailController");
const userController = require("../controllers/accountcontroller");
// track routes
router
  .route("/track")
  .post(trackingController.new) //route for updating daily tracking details and update in profile
  .put(trackingController.call) //route for getting the artical
  .patch(trackingController.getAllPrediction) //route for getting all past predictions( this includes the initial prediction too)...

router
  .route("/track/result")
  .post(trackingController.index) //route for getting the average prediction for today 
router
  .route("/track/predict")
  .post(trackingController.getLast);  // route for getting the last details of a user(for showing in the profile)

router
  .route("/track/:track_id")
  .get(trackingController.view) // additional route. not used for any functionality (used for viewing a data by giving id)
  .delete(trackingController.delete); // additional route. not used for any functionality (used for delete a data by giving id)

//Initial Data Route
router
  .route("/detail")
  .get(initialDetailController.getAll) // Route for get all documents related to initial prediction
  .post(initialDetailController.postInitialDetails); // Route for inserting initial form details to the DB
// and getting the initial prediction

router
  .route("/detail/:user_id")
  .get(initialDetailController.getById) // Route for getting initial prediction details related to particular userid
  .delete(initialDetailController.deleteInitialDetails) // Route for deleting initial prediction details related to particular userid
  .put(initialDetailController.updateInitialDetails); // Route for updating initial prediction details related to particular userid

// route for getting all the users
router.route("/users").get(userController.getUsers);

//route for getting user for a given user id
router.route("/users/:uId").get(userController.findUser);

//route for user registration
router
  .route("/users/register")
  .post(
    [
      validator.check("fullName").not().isEmpty(),
      validator.check("email").isEmail(),
      validator.check("password").isLength({ min: 8 }),
    ],
    userController.registerUser
  );

//route for user login
router
  .route("/users/login")
  .post(userController.loginUser);

//route for user deletion
router
  .route('/users/remove')
  .delete(userController.deleteUser);

//route for user modification
router
  .route('/users/modify')
  .put(userController.modifyUser);

// Export API routes
module.exports = router;
