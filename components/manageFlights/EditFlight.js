import React from 'react';
import {Button, StyleSheet, Text, TextInput, View, Linking} from 'react-native';
import {NavigationActions} from "react-navigation";

export default class EditFlight extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: -1,
            source: "",
            destination: "",
            price: 0,
        };

        if (this.props.navigation.state.params.id !== undefined) {
            let flight = this.props.navigation.state.params;
            this.state.id = flight.id;
            this.state.source = flight.source;
            this.state.destination = flight.destination;
            this.state.price = flight.price;
        }
    }

    editFlight() {
        let flight = this.state;
        for (let i = 0; i < global.flights.length; i++) {
            if (global.flights[i].id === flight.id) {
                global.flights[i] = flight;
            }
        }
    }

    deleteFlight() {
        var flight = this.state;
        var index = global.flights.indexOf(flight);
        global.flights.splice(index, 1);
    }

    static
    navigationOptions = {
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

const
    styles = StyleSheet.create({
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
