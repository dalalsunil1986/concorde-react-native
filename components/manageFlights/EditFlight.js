import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {NavigationActions} from "react-navigation";
import {FlightController} from "../../controller/FlightController";

export default class EditFlight extends React.Component {
    constructor(props) {
        super(props);

        this.flightController = new FlightController();

        this.state = {
            id: -1,
            source: "",
            destination: "",
            price: 0,
        };

        if (this.props.navigation.state.params !== undefined) {
            this.state.id = this.props.navigation.state.params;
            const flight = this.flightController.get(this.state.id);
            this.state.source = flight.source;
            this.state.destination = flight.destination;
            this.state.price = flight.price;
        }
    }

    editFlight() {
        const flight = this.state;
        this.flightController.edit(flight);
    }

    deleteFlight() {
        const flight = this.state;
        this.flightController.remove(flight);
    }

    static navigationOptions = {
        title: 'Edit flight',
    };

    goBackToManageFlights() {
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Home'})
            ]
        }));
        this.props.navigation.navigate('ManageFlights');
    }

    render() {
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
                            this.editFlight();
                            this.goBackToManageFlights();
                        }}
                    />
                    <Button
                        title="Delete flight"
                        onPress={() => {
                            this.deleteFlight();
                            this.goBackToManageFlights();
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
