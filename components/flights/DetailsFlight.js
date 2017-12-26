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

    static navigationOptions = {
        title: 'Details flight',
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <TextInput
                        style={styles.inputText}
                        value={this.state.source}
                        editable={false}
                        onChangeText={(source) => this.setState({source})}
                    />
                    <TextInput
                        style={styles.inputText}
                        value={this.state.destination}
                        editable={false}
                        onChangeText={(destination) => this.setState({destination})}
                    />
                    <TextInput
                        style={styles.inputText}
                        value={`${this.state.price}`}
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
