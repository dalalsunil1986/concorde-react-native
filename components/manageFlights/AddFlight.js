import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {FlightController} from "../../controller/FlightController";
import CityPicker from "./CityPicker";

export default class AddFlight extends React.Component {
    constructor(props) {
        super(props);

        this.flightController = new FlightController();

        this.state = {
            id: -1,
            source: "",
            destination: "",
            price: 0,
        };
    }

    async componentDidMount() {
        this.setState({
            loaded: true,
        });
    }

    componentWillUnmount() {
        this.setState({
            loaded: false,
        });
    }

    async _addFlight() {
        this.state.price = parseInt(this.state.price);
        const flight = this.state;
        await this.flightController.add(flight);
    }

    render() {
        if (!this.state.loaded) return null;
        return (
            <View style={styles.container}>
                <CityPicker selectedValue={this.state.source}
                            onValueChange={(value) => this.setState({source: value})}/>
                <CityPicker selectedValue={this.state.destination}
                            onValueChange={(value) => this.setState({destination: value})}/>
                <TextInput
                    style={styles.inputText}
                    value={`${this.state.price}`}
                    keyboardType='numeric'
                    onChangeText={(price) => this.setState({price})}
                />
                <Button
                    title="Add flight"
                    onPress={() => {
                        this._addFlight().then(() => {
                            this.props.navigation.goBack();
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
