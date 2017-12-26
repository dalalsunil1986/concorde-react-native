import React from 'react';
import {Button, ListView, StyleSheet, View} from 'react-native';
import ViewManageFlight from "./ViewManageFlight";
import {FlightController} from "../../controller/FlightController";

export default class Flights extends React.Component {
    constructor(props) {
        super(props);

        this.flightController = new FlightController();

        const flights = this.flightController.getAll();
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.Id !== r2.Id});
        this.state = {
            dataSource: dataSource.cloneWithRows(flights)
        }
    }

    renderRow(flight) {
        return (
            <View>
                <ViewManageFlight id={flight.id} navigation={this.props.navigation}/>
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

const styles = StyleSheet.create({});
