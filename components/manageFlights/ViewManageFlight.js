import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {FlightController} from "../../controller/FlightController";

export default class ViewFlight extends React.Component {
    constructor(props) {
        super(props);

        this.flightController = new FlightController();

        this.state = {
            id: this.props.id,
        };
    }

    render() {
        const flight = this.flightController.get(this.state.id);
        return (
            <View style={styles.container}>
                <Text>{flight.source} to {flight.destination}</Text>
                <Text>${flight.price}</Text>
                <Button
                    title="Manage"
                    onPress={() => {
                        this.props.navigation.navigate('EditFlight', flight.id);
                    }}
                />
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
});
