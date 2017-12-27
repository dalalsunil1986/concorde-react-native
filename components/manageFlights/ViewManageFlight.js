import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {FlightController} from "../../controller/FlightController";

export default class ViewManageFlight extends React.Component {
    constructor(props) {
        super(props);

        this.flightController = new FlightController();

        this.state = {
            id: this.props.id,
            loaded: false,
        };
    }

    async componentDidMount() {
        const flight = await this.flightController.get(this.state.id);
        if (flight !== null) {
            this.setState({
                flight,
                loaded: true,
            });
        }
    }

    componentWillUnmount() {
        this.setState({
            loaded: false,
        });
    }

    render() {
        if (!this.state.loaded) return null;
        const flight = this.state.flight;
        return (
            <View style={styles.container}>
                <Text>{flight.source} to {flight.destination}</Text>
                <Text>${flight.price}</Text>
                <Button
                    title="Manage"
                    onPress={() => {
                        this.props.navigation.navigate('EditFlight', {
                            id: flight.id,
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
        alignItems: 'center',
        padding: 30,
        margin: 2,
        alignSelf: 'stretch',
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    },
});
