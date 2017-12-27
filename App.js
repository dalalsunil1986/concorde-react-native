import React from 'react';
import {StackNavigator} from 'react-navigation';
import Home from "./components/Home";
import Flights from "./components/flights/Flights";
import EditFlight from "./components/manageFlights/EditFlight";
import DetailsFlight from "./components/flights/DetailsFlight";
import ManageFlights from "./components/manageFlights/ManageFlights";
import AddFlight from "./components/manageFlights/AddFlight";

export const SimpleApp = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Concorde',
        },
    },
    Flights: {
        screen: Flights,
        navigationOptions: {
            title: 'Flights',
        },
    },
    DetailsFlight: {
        screen: DetailsFlight,
        path: 'DetailsFlight/:id',
        navigationOptions: {
            title: 'Details flight',
        },
    },
    ManageFlights: {
        screen: ManageFlights,
        navigationOptions: {
            title: 'Manage flights',
        },
    },
    EditFlight: {
        screen: EditFlight,
        path: 'EditFlight/:flight',
        navigationOptions: {
            title: 'Edit flight',
        },
    },
    AddFlight: {
        screen: AddFlight,
        navigationOptions: {
            title: 'Add flight',
        },
    },
});

export default class App extends React.Component {
    render() {
        return <SimpleApp/>;
    }
}

