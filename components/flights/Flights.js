import React from 'react';
import {ListView, StyleSheet, Text, View} from 'react-native';
import ViewFlight from "./ViewFlight";
import {FlightController} from "../../controller/FlightController";

export default class Flights extends React.Component {
    constructor(props) {
        super(props);

        this.flightController = new FlightController();

        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.Id !== r2.Id});
        this.state = {
            loaded: false,
        }
    }

    async componentDidMount() {
        const flights = await this.flightController.getAll();
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.Id !== r2.Id});
        this.setState({
            dataSource: dataSource.cloneWithRows(flights),
            flights,
            loaded: true,
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
            <View>
                <ViewFlight id={flight.id} navigation={this.props.navigation}/>
            </View>
        );
    }

    render() {
        if (!this.state.loaded) return null;
        if (this.state.flights.length > 0) {
            return (
                <View>
                    <ListView dataSource={this.state.dataSource} renderRow={this._renderRow.bind(this)}/>
                </View>);

        } else {
            return (
                <View>
                    <Text>No flights.</Text>
                </View>);
        }
    }
}

const styles = StyleSheet.create({});
