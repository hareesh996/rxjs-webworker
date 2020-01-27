import { User } from './user-model';
import { WebWorkerController, WebWorker } from '../web-worker-controller/web-worker';

@WebWorkerController('user')
export class UserController {

    @WebWorker('retrieve-user')
    getUserDetails(): User {
        return {
            firstName: 'Hareesh',
            lastName: 'Chandrashekhara'
        }
    }

    @WebWorker('create-user')
    createUser(user: User) {
        // should save the user. And return the saved user.
        return user;
    }
}