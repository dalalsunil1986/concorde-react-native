import React from 'react';
import {StackNavigator} from 'react-navigation';
import Home from "./components/Home";
import Flights from "./components/Flights";
import EditFlight from "./components/EditFlight";

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
    EditFlight: {screen: EditFlight, path: 'EditFlight/:flight'},
});

export default class App extends React.Component {
    render() {
        return <SimpleApp/>;
    }
}

