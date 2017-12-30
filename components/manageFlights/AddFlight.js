import React from 'react';
import {Button, StyleSheet, TextInput, View, Linking} from 'react-native';
import {NavigationActions} from "react-navigation";
import {FlightController} from "../../controller/FlightController";
import CityPicker from "./CityPicker";

export default class AddFlight extends React.Component {
    constructor(props) {
        super(props);

        this.flightController = new FlightController();

        this.state = {
            id: -1,
            source: "",
            destination: "",
            price: 0,
        };
    }

    async componentDidMount() {
        this.setState({
            loaded: true,
        });
    }

    componentWillUnmount() {
        this.setState({
            loaded: false,
        });
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

    async _addFlight() {
        this.state.price = parseInt(this.state.price);
        const flight = this.state;
        await this.flightController.add(flight);
        this._sendMail(flight);
    }

    _goBackToManageFlights() {
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Home'})
            ]
        }));
        this.props.navigation.navigate('ManageFlights');
    }

    render() {
        if (!this.state.loaded) return null;
        return (
            <View style={styles.container}>
                <CityPicker selectedValue={this.state.source}
                            onValueChange={(value) => this.setState({source: value})}/>
                <CityPicker selectedValue={this.state.destination}
                            onValueChange={(value) => this.setState({destination: value})}/>
                <TextInput
                    style={styles.inputText}
                    value={`${this.state.price}`}
                    keyboardType='numeric'
                    onChangeText={(price) => this.setState({price})}
                />
                <Button
                    title="Add flight"
                    onPress={() => {
                        this._addFlight().then(() => {
                            this._goBackToManageFlights();
                        });
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        padding: 30,
        margin: 2,
        alignSelf: 'stretch',
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    },
    inputText: {
        width: 100,
        height: 30,
    }
});
