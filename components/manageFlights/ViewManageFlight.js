import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default class ViewFlight extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            flight: this.props.flight,
        };
    }

    editFlight(flight) {
        this.setState(previousState => {
            return {
                id: this.props.id,
                source: this.props.source,
                destination: this.props.destination,
                price: this.props.price
            };
        });
    }

    render() {
        let flight = this.state.flight;
        return (
            <View style={styles.container}>
                <Text>{flight.source} to {flight.destination}</Text>
                <Text>${flight.price}</Text>
                <Button
                    title="Manage"
                    onPress={() => {
                        this.props.navigation.navigate('EditFlight', flight);
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
