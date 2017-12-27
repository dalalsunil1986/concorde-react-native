import React from 'react';
import {Button, ListView, StyleSheet, Text, View} from 'react-native';
import ViewManageFlight from "./ViewManageFlight";
import {FlightController} from "../../controller/FlightController";

export default class Flights extends React.Component {
    constructor(props) {
        super(props);

        this.flightController = new FlightController();

        this.state = {
            loaded: false,
        }
    }

    async componentDidMount() {
        await this._updateList();
        this.setState({
            loaded: true,
        });
    }

    async _updateList() {
        const flights = await this.flightController.getAll();
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.Id !== r2.Id});
        this.setState({
            dataSource: dataSource.cloneWithRows(flights),
            flights,
        });
    }

    async shouldComponentUpdate() {
        const flights = await this.flightController.getAll();
        return flights !== this.state.flights;
    }

    componentWillUnmount() {
        this.setState({
            loaded: false,
        });
    }

    _renderRow(flight) {
        return (
            <ViewManageFlight id={flight.id} navigation={this.props.navigation}/>
        );
    }

    render() {
        if (!this.state.loaded) return null;
        if (this.state.flights.length > 0) {
            return (
                <View>
                    <Button
                        title="Add new flight"
                        onPress={() => {
                            this.props.navigation.navigate('AddFlight');
                        }}
                    />
                    <ListView dataSource={this.state.dataSource} renderRow={this._renderRow.bind(this)}/>
                </View>);

        } else {
            return (
                <View>
                    <Button
                        title="Add new flight"
                        onPress={() => {
                            this.props.navigation.navigate('AddFlight');
                        }}
                    />
                    <Text>No flights.</Text>
                </View>);
        }
    }
}

const styles = StyleSheet.create({});
