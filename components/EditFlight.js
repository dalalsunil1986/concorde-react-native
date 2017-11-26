import React from 'react';
import {Button, StyleSheet, Text, TextInput, View, Linking} from 'react-native';

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
                let body = "Flight no. " + flight.id.toString() + " is now from " + flight.source + " to " +
                    flight.destination + " at $" + flight.price.toString() + ".";
                console.log(body);
                Linking.openURL(
                    "mailto:mirceadino97@gmail.com" +
                    "?subject=" + "Flight was modified" +
                    "&body=" + body
                );
            }
        }
    }

    static navigationOptions = {
        title: 'Edit flight',
    };

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
                        title="Submit"
                        onPress={() => {
                            this.editFlight();
                            this.props.navigation.goBack();
                            this.props.navigation.goBack();
                            this.props.navigation.navigate('Flights');
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
