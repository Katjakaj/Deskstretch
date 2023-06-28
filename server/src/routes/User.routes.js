import UserController from "../controllers/User.controller.js";

const routes = (app) => {
    app.post('/user', UserController.createUser)
}

export default {
    routes
}