import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {FlightController} from "../../controller/FlightController";

export default class EditFlight extends React.Component {
    constructor(props) {
        super(props);

        this.flightController = new FlightController();

        this.state = {
            id: -1,
            loaded: false,
        };

        if (this.props.navigation.state.params !== undefined) {
            this.state.id = this.props.navigation.state.params;
        }
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
                <View>
                    <TextInput
                        style={styles.inputText}
                        value={flight.source}
                        editable={false}
                        onChangeText={(source) => this.setState({source})}
                    />
                    <TextInput
                        style={styles.inputText}
                        value={flight.destination}
                        editable={false}
                        onChangeText={(destination) => this.setState({destination})}
                    />
                    <TextInput
                        style={styles.inputText}
                        value={`${flight.price}`}
                        keyboardType='numeric'
                        editable={false}
                        onChangeText={(price) => this.setState({price})}
                    />
                </View>
                <View>
                    <Button
                        title="Back"
                        onPress={() => {
                            this.props.navigation.goBack();
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
