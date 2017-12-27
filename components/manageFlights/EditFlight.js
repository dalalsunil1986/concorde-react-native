import React from 'react';
import {Button, StyleSheet, TextInput, View, Alert} from 'react-native';
import {NavigationActions} from "react-navigation";
import {FlightController} from "../../controller/FlightController";

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
                <View>
                    <TextInput
                        style={styles.inputText}
                        value={this.state.source}
                        onChangeText={(source) => this.setState({source})}
                    />
                    <TextInput
                        style={styles.inputText}
                        value={this.state.destination}
                        onChangeText={(destination) => this.setState({destination})}
                    />
                    <TextInput
                        style={styles.inputText}
                        value={`${this.state.price}`}
                        keyboardType='numeric'
                        onChangeText={(price) => this.setState({price})}
                    />
                </View>
                <View>
                    <Button
                        title="Edit flight"
                        onPress={() => {
                            this._editFlight().then(() => {
                                this._goBackToManageFlights();
                            });
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
                                        this.props.navigation.goBack();
                                        this._deleteFlight().then(() => {
                                            this._goBackToManageFlights();
                                        });
                                    }
                                }, {
                                    text: "No", onPress: () => {
                                    }
                                }],
                                {cancelable: false});

                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
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
