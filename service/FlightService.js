import {Alert, AsyncStorage} from 'react-native';

export class FlightService {
    constructor() {
        const HOST = "10.152.5.194";
        const PORT = 5000;
        this.URL = "http://" + HOST + ":" + PORT;
    }

    _fromServerToLocal(item) {
        let newItem = {
            id: item.id,
            source: item.source,
            destination: item.destination,
            allPrice: item.price,
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

    add(flight) {
        flight.allPrices = [parseInt(flight.price)];
        flight = this._fromLocalToServer(flight);
        return fetch(this.URL + '/flights', {
            method: 'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({flight: flight})
        })
            .then((response) => {
                    return response.json()
                        .then((response) => {
                            return this.getAllFromAsyncStorage()
                                .then((flights) => {
                                    flights.push(this._fromServerToLocal(response));
                                    return AsyncStorage.setItem("flights", JSON.stringify(flights));
                                });
                        })
                },
                (error) => {
                    console.log(error);
                    Alert.alert("Offline mode", "Couldn't connect to server.");
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
            .then((response) => {
                    return response.json()
                        .then((flight) => {
                            return this.getAllFromAsyncStorage()
                                .then((flights) => {
                                    flights.push(this._fromServerToLocal(flight));
                                    return AsyncStorage.setItem("flights", JSON.stringify(flights));
                                });
                        })
                },
                (error) => {
                    console.log(error);
                    Alert.alert("Offline mode", "Couldn't connect to server.");
                })
    }

    remove(flight) {
        flight = this._fromLocalToServer(flight);
        return fetch(this.URL + '/flights', {
            method: 'DELETE',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({flight: flight})
        })
            .then((response) => {
                    return response.json()
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
                        })
                },
                (error) => {
                    console.log(error);
                    Alert.alert("Offline mode", "Couldn't connect to server.");
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
