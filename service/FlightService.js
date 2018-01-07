import {Alert, AsyncStorage, Linking} from 'react-native';

export class FlightService {
    static myInstance = null;

    static getInstance() {
        if (FlightService.myInstance === null) {
            FlightService.myInstance = new FlightService();
        }
        return FlightService.myInstance;
    }

    constructor() {
        // const HOST = "10.152.5.194";
        const HOST = "192.168.43.18";
        const PORT = 5000;
        this.URL = "http://" + HOST + ":" + PORT;
        this.observers = []
    }

    subscribe(handler) {
        this.observers.push(handler)
    }

    unsubscribe(handler) {
        for (let i = 0; i < this.observers.length; ++i) {
            if (this.observers[i] === handler) {
                console.log("Unsubscribing.");
                this.observers.splice(i, 1);
                break;
            }
        }
    }

    notify() {
        for (let i = 0; i < this.observers.length; ++i) {
            this.observers[i]();
        }
    }

    _fromServerToLocal(item) {
        let newItem = {
            id: item.id,
            source: item.source,
            destination: item.destination,
            allPrices: item.price,
            price: item.price[item.price.length - 1],
        };
        return newItem;
    }

    _fromLocalToServer(item) {
        let newItem = {
            id: item.id,
            source: item.source,
            destination: item.destination,
            price: item.allPrices,
        };
        return newItem;
    }

    _sendMail(flight) {
        const body = "New flight from " + flight.source + " to " +
            flight.destination + " at $" + flight.price.toString() + ".";
        Linking.openURL(
            "mailto:mirceadino97@gmail.com" +
            "?subject=" + "New flight" +
            "&body=" + body
        );
    }

    add(flight) {
        flight.allPrices = [parseInt(flight.price)];
        flight = this._fromLocalToServer(flight);
        return fetch(this.URL + '/flights', {
            method: 'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({flight: flight})
        })
            .then((response) => response.json()
                    .then((response) => {
                        return this.getAllFromAsyncStorage()
                            .then((flights) => {
                                flights.push(this._fromServerToLocal(response));
                                this._sendMail(flight);
                                return AsyncStorage.setItem("flights", JSON.stringify(flights));
                            });
                    }),
                (error) => {
                    console.log(error);
                    Alert.alert("Offline mode", "Couldn't connect to server.");
                })
            .then((response) => {
                this.notify();
                return response;
            })
    }

    _mergeFlights(flight_0, flight_1) {
        let flight = flight_0;
        flight.source = flight_1.source;
        flight.destination = flight_1.destination;
        if (flight.price !== parseInt(flight_1.price)) {
            flight.price = parseInt(flight_1.price);
            flight.allPrices.push(flight.price);
        }
        return flight;
    }

    edit(flight) {
        return this.getAllFromAsyncStorage()
            .then((flights) => {
                for (let i = 0; i < flights.length; i++) {
                    if (flights[i].id === flight.id) {
                        flight = this._mergeFlights(flights[i], flight);
                        break;
                    }
                }
                flight = this._fromLocalToServer(flight);
                return flight;
            })
            .then((flight) => fetch(this.URL + '/flights', {
                method: 'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({flight: flight})
            }))
            .then((response) => response.json()
                    .then((flight) => {
                        flight = this._fromServerToLocal(flight);
                        return this.getAllFromAsyncStorage()
                            .then((flights) => {
                                for (let i = 0; i < flights.length; i++) {
                                    if (flights[i].id === flight.id) {
                                        flights[i] = flight;
                                        break;
                                    }
                                }
                                return AsyncStorage.setItem("flights", JSON.stringify(flights));
                            });
                    }),
                (error) => {
                    console.log(error);
                    Alert.alert("Offline mode", "Couldn't connect to server.");
                })
            .then((response) => {
                this.notify();
                return response;
            })
    }

    remove(flight) {
        flight = this._fromLocalToServer(flight);
        return fetch(this.URL + '/flights', {
            method: 'DELETE',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({flight: flight})
        })
            .then((response) => response.json()
                    .then((response) => {
                        return this.getAllFromAsyncStorage()
                            .then((flights) => {
                                for (let i = 0; i < flights.length; i++) {
                                    if (flights[i].id === response.id) {
                                        flights.splice(i, 1);
                                        break;
                                    }
                                }
                                return AsyncStorage.setItem("flights", JSON.stringify(flights));
                            });
                    }),
                (error) => {
                    console.log(error);
                    Alert.alert("Offline mode", "Couldn't connect to server.");
                })
            .then((response) => {
                this.notify();
                return response;
            })
    }

    _fetchFlights() {
        return fetch(this.URL + '/flights')
            .then((response) => {
                    return response.json()
                        .then((response) => {
                            let flights = [];
                            response.forEach((item) => {
                                let newItem = item;
                                newItem.allPrices = item.price;
                                newItem.price = newItem.allPrices[newItem.allPrices.length - 1];
                                flights.push(newItem);
                            });
                            AsyncStorage.setItem("flights", JSON.stringify(flights));
                            return JSON.stringify(flights);
                        })
                },
                (error) => {
                    console.log(error);
                })
            .then((response) => {
                this.notify();
                return response;
            })
    }

    getAll() {
        setTimeout(() => this._fetchFlights(), 2000);
        return this.getAllFromAsyncStorage()
    }

    getAllFromAsyncStorage() {
        return AsyncStorage.getItem("flights")
            .then((response) => JSON.parse(response))
            .then((response) => (response || []))
    }
}
