import {UserService} from '../service/UserService';

export class UserController {
    constructor() {
        this.service = UserService.getInstance();
    }

    getUser() {
        return this.service.getUser();
    }

    authenticate(username, password) {
        return this.service.authenticate(username, password)
    }

    authenticateWithGoogle() {
        return this.service.authenticateWithGoogle()
    }

    logout() {
        return this.service.logout();
    }
}
