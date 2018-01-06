import {Alert, AsyncStorage} from 'react-native';
import {FlightService} from '../service/FlightService';

export class FlightController {
    constructor() {
        this.service = new FlightService();
    }

    add(flight) {
        return this.service.add(flight)
    }

    edit(flight) {
        return this.service.edit(flight)
    }

    remove(flight) {
        return this.service.remove(flight)
    }

    async get(id) {
        try {
            let flights = await this.service.getAllFromAsyncStorage();

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

    getAll() {
        return this.service.getAll();
    }
}
