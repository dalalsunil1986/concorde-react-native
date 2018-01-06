import {Alert, AsyncStorage} from 'react-native';

export class UserService {
    static myInstance = null;

    static getInstance() {
        if (UserService.myInstance === null) {
            UserService.myInstance = new UserService();
        }
        return UserService.myInstance;
    }

    constructor() {
        const HOST = "10.152.5.194";
        const PORT = 5000;
        this.URL = "http://" + HOST + ":" + PORT;
        this.user = null;
    }

    _fromServerToLocal(item) {
        if (item === null) return null;
        let newItem = {
            id: item.id,
            username: item.username,
            password: item.password,
            isIbis: item.isIbis,
        };
        return newItem;
    }

    _fromLocalToServer(item) {
        if (item === null) return null;
        let newItem = {
            id: item.id,
            username: item.username,
            password: item.password,
            isIbis: item.isIbis,
        };
        return newItem;
    }

    getUser() {
        return this.user;
    }

    authenticate(username, password) {
        this.user = null;
        return fetch(this.URL + '/users?username=' + username + "&password=" + password)
            .then((response) => {
                    return response.json()
                        .then((response) => {
                            let user = this._fromServerToLocal(response);
                            this.user = user;
                            return user;
                        })
                },
                (error) => {
                    console.log(error);
                    Alert.alert("Offline mode", "Can't connect to server.");
                })
    }

    authenticateWithGoogle() {
        this.user = null;
        return Expo.Google.logInAsync({androidClientId: '428634379241-jdbfrs7jv1or94nd9qura8355tcbpunf.apps.googleusercontent.com'})
            .then((response) => {
                if (response.type === 'success') {
                    const id = response.user.id;
                    return fetch(this.URL + '/users', {
                        method: 'POST',
                        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            username: id,
                            password: id,
                            user: {username: id, password: id}
                        })
                    })
                        .then((response) => {
                                return response.json()
                                    .then((response) => {
                                        let user = this._fromServerToLocal(response);
                                        this.user = user;
                                        return user;
                                    })
                            },
                            (error) => {
                                console.log(error);
                                Alert.alert("Offline mode", "Can't connect to server.");
                            })

                } else {
                    this.user = null;
                    return this.user
                }
            })
    }

    logout() {
        this.user = null;
    }
}
