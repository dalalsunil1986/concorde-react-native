export class FlightController {
    constructor() {
        this.nextId = 6;
    }

    add(flight) {
        flight.id = this.nextId;
        this.nextId += 1;
        global.flights.push(flight);
    }

    edit(flight) {
        for (let i = 0; i < global.flights.length; i++) {
            if (global.flights[i].id === flight.id) {
                global.flights[i] = flight;
            }
        }
    }

    remove(flight) {
        for(let i =0; i<global.flights.length; i++) {
            if (global.flights[i].id === flight.id) {
                global.flights.splice(i, 1);
                return;
            }
        }
    }

    get(id) {
        for (let i = 0; i < global.flights.length; i++) {
            if (global.flights[i].id === id) {
                return global.flights[i];
            }
        }
        return null;
    }

    getAll() {
        return global.flights;
    }
}

global.flights = [
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
