import React from 'react';
import {Button, ListView, ScrollView, StyleSheet, Text, View} from 'react-native';
import ViewManageFlight from "./ViewManageFlight";

export default class Flights extends React.Component {
    constructor(props) {
        super(props);

        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.Id !== r2.Id});
        this.state = {
            dataSource: dataSource.cloneWithRows(global.flights)
        }
    }

    renderRow(flight) {
        return (
            <View>
                <ViewManageFlight flight={flight} navigation={this.props.navigation}/>
            </View>
        );
    }

    static navigationOptions = {
        title: 'Manage flights',
    };

    render() {
        return (
            <View>
                <Button
                    title="Add new flight"
                    onPress={() => {
                        this.props.navigation.navigate('AddFlight');
                    }}
                />
                <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}/>
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
