import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Button
                    title="Flights"
                    onPress={() => {
                        navigate('Flights')
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
});
