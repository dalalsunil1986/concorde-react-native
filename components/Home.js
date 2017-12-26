import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Button
                    title="Flights"
                    onPress={() => {
                        this.props.navigation.navigate('Flights')
                    }}
                />
                <Button
                    title="Manage flights"
                    onPress={() => {
                        this.props.navigation.navigate('ManageFlights')
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({});
