import React from 'react';
import {StackNavigator} from 'react-navigation';
import Home from "./components/Home";
import Flights from "./components/flights/Flights";
import EditFlight from "./components/manageFlights/EditFlight";
import DetailsFlight from "./components/flights/DetailsFlight";
import ManageFlights from "./components/manageFlights/ManageFlights";
import AddFlight from "./components/manageFlights/AddFlight";

export const SimpleApp = StackNavigator({
    Home: {screen: Home},
    Flights: {screen: Flights},
    DetailsFlight: {screen: DetailsFlight, path: 'DetailsFlight/:id'},
    ManageFlights: {screen: ManageFlights},
    EditFlight: {screen: EditFlight, path: 'EditFlight/:flight'},
    AddFlight: {screen: AddFlight},
});

export default class App extends React.Component {
    render() {
        return <SimpleApp/>;
    }
}

