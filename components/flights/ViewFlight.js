import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default class ViewFlight extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            flight: this.props.flight,
        };
    }

    render() {
        let flight = this.state.flight;
        return (
            <View style={styles.container}>
                <Text>{flight.source} to {flight.destination}</Text>
                <Text>${flight.price}</Text>
                <Button
                    title="Details"
                    onPress={() => {
                        this.props.navigation.navigate('DetailsFlight', flight);
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
