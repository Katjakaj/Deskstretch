import UserController from "../controllers/User.controller.js";

const routes = (app) => {
    app.get('/user', UserController.getAllUsers)
    app.get('/user/:userId', UserController.getUserWithId)
    app.get('/searchuser', UserController.getUserWithUsernameQuery)
}

export default {
    routes
}