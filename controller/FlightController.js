import {Alert, AsyncStorage} from 'react-native';

export class FlightController {
    constructor() {
    }

    async _getAndIncrementNextId() {
        let response = await AsyncStorage.getItem("nextFlightId") || 1;
        const id = parseInt(response);
        await AsyncStorage.setItem("nextFlightId", JSON.stringify(id + 1));
        return id;
    }

    async add(flight) {
        try {
            let flights = await this.getAll();

            flight.id = await this._getAndIncrementNextId();
            flights.push(flight);

            await AsyncStorage.setItem("flights", JSON.stringify(flights));

        } catch (error) {
            Alert.alert("Error", "There's been a storage error.");
        }
    }

    async edit(flight) {
        try {
            let flights = await this.getAll();

            for (let i = 0; i < flights.length; i++) {
                if (flights[i].id === flight.id) {
                    flights[i] = flight;
                    break;
                }
            }

            await AsyncStorage.setItem("flights", JSON.stringify(flights));

        } catch (error) {
            Alert.alert("Error", "There's been a storage error.");
        }
    }

    async remove(flight) {
        try {
            let flights = await this.getAll();

            for (let i = 0; i < flights.length; i++) {
                if (flights[i].id === flight.id) {
                    flights.splice(i, 1);
                    break;
                }
            }

            await AsyncStorage.setItem("flights", JSON.stringify(flights));

        } catch (error) {
            Alert.alert("Error", "There's been a storage error.");
        }
    }

    async get(id) {
        try {
            let flights = await this.getAll();

            for (let i = 0; i < flights.length; i++) {
                if (flights[i].id === id) {
                    return flights[i];
                }
            }

            return null;

        } catch (error) {
            Alert.alert("Error", "There's been a storage error.");
        }
    }

    async _populate() {
        flights = [
            {
                id: 1,
                source: 'Cluj-Napoca',
                destination: 'Budapest',
                price: 20,
            },
            {
                id: 2,
                source: 'Cluj-Napoca',
                destination: 'Bucharest',
                price: 30,
            },
            {
                id: 3,
                source: 'Cluj-Napoca',
                destination: 'Paris',
                price: 80,
            },
            {
                id: 4,
                source: 'Budapest',
                destination: 'Cluj-Napoca',
                price: 30,
            },
            {
                id: 5,
                source: 'Budapest',
                destination: 'Bucharest',
                price: 50,
            },
        ];

        AsyncStorage.clear();
        await AsyncStorage.setItem("flights", JSON.stringify(flights));
        await AsyncStorage.setItem("nextFlightId", JSON.stringify(6));
    }

    async getAll() {
        let response = await AsyncStorage.getItem("flights");
        return await JSON.parse(response) || [];
    }
}
