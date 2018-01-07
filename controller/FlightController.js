import {FlightService} from '../service/FlightService';

export class FlightController {
    constructor() {
        this.service = FlightService.getInstance();
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

    get(id) {
        return this.service.getAllFromAsyncStorage()
            .then((flights) => {
                for (let i = 0; i < flights.length; i++) {
                    if (flights[i].id === id) {
                        return flights[i];
                    }
                }
                return null;
            })
    }

    getAll() {
        return this.service.getAll()
    }

    getAllFromAsyncStorage() {
        return this.service.getAllFromAsyncStorage()
    }
}
