import React from 'react';
import {Button, StyleSheet, TextInput, View, Alert} from 'react-native';
import {NavigationActions} from "react-navigation";
import {FlightController} from "../../controller/FlightController";
import CityPicker from "./CityPicker";

export default class EditFlight extends React.Component {
    constructor(props) {
        super(props);

        this.flightController = new FlightController();

        this.state = {
            id: -1,
            loaded: false,
        };

        if (this.props.navigation.state.params.id !== undefined) {
            this.state.id = this.props.navigation.state.params.id;
        }
    }

    async componentDidMount() {
        const flight = await this.flightController.get(this.state.id);
        if (flight !== null) {
            this.setState({
                source: flight.source,
                destination: flight.destination,
                price: flight.price,
                loaded: true,
            });
        }
    }

    componentWillUnmount() {
        this.setState({
            loaded: false,
        });
    }

    _getFlightFromState() {
        return {
            id: this.state.id,
            source: this.state.source,
            destination: this.state.destination,
            price: this.state.price,
        };
    }

    async _editFlight() {
        const flight = this._getFlightFromState();
        await this.flightController.edit(flight);
    }

    async _deleteFlight() {
        const flight = this._getFlightFromState();
        await this.flightController.remove(flight);
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
                    title="Edit flight"
                    onPress={() => {
                        this._editFlight();
                        this._goBackToManageFlights();
                    }}
                />

                <Button
                    title="Delete flight"
                    onPress={() => {
                        Alert.alert(
                            "Delete flight",
                            "Are you sure you want to delete the flight?",
                            [{
                                text: "Yes", onPress: () => {
                                    this._deleteFlight();
                                    this._goBackToManageFlights();
                                }
                            }, {
                                text: "No", onPress: () => {
                                }
                            }],
                            {cancelable: false});

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
