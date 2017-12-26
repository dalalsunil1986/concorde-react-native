import React from 'react';
import {StackNavigator} from 'react-navigation';
import Home from "./components/Home";
import Flights from "./components/flights/Flights";
import EditFlight from "./components/manageFlights/EditFlight";
import DetailsFlight from "./components/flights/DetailsFlight";
import ManageFlights from "./components/manageFlights/ManageFlights";
import AddFlight from "./components/manageFlights/AddFlight";

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

export const SimpleApp = StackNavigator({
    Home: {screen: Home},
    Flights: {screen: Flights},
    DetailsFlight: {screen: DetailsFlight, path: 'DetailsFlight/:flight'},
    ManageFlights: {screen: ManageFlights},
    EditFlight: {screen: EditFlight, path: 'EditFlight/:flight'},
    AddFlight: {screen: AddFlight},
});

export default class App extends React.Component {
    render() {
        return <SimpleApp/>;
    }
}

