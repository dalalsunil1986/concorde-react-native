import React from 'react';
import {Button, StyleSheet, Text, TextInput, View, Linking} from 'react-native';
import {NavigationActions} from "react-navigation";

export default class AddFlight extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: -1,
            source: "",
            destination: "",
            price: 0,
        };
    }

    addFlight() {
        let flight = this.state;
        global.flights.push(flight);
        let body = "New flight from " + flight.source + " to " +
            flight.destination + " at $" + flight.price.toString() + ".";
        console.log(body);
        Linking.openURL(
            "mailto:mirceadino97@gmail.com" +
            "?subject=" + "New flight" +
            "&body=" + body
        );
    }

    static navigationOptions = {
        title: 'Add flight',
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
                        title="Add flight"
                        onPress={() => {
                            this.addFlight();
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
