import React from 'react';
import {Button, FlatList, StyleSheet, View} from 'react-native';
import ViewManageFlight from "./ViewManageFlight";
import {FlightController} from "../../controller/FlightController";
import {FlightService} from "../../service/FlightService";

export default class Flights extends React.Component {
    constructor(props) {
        super(props);

        this.flightController = new FlightController();

        this.state = {
            loaded: false,
        }
    }

    componentDidMount() {
        FlightService.getInstance().subscribe(this.update.bind(this));
        this.flightController.getAll()
            .then((flights) => {
                console.log(flights);
                this.setState({
                    flights,
                    loaded: true
                });
            })
    }

    _updateList() {
        this.setState({loaded: false});
        this.flightController.getAllFromAsyncStorage()
            .then((flights) => {
                console.log(flights);
                this.setState({
                    flights,
                    loaded: true
                });
            })
    }

    componentWillUnmount() {
        FlightService.getInstance().unsubscribe(this.update.bind(this));
        this.setState({
            loaded: false,
        });
    }

    update() {
        this._updateList()
    }

    _renderRow(item) {
        const flight = item.item;
        return (
            <ViewManageFlight id={flight.id} navigation={this.props.navigation}/>
        );
    }

    render() {
        if (!this.state.loaded) return null;
        return (
            <View>
                <Button
                    title="Add new flight"
                    onPress={() => {
                        this.props.navigation.navigate('AddFlight');
                    }}
                />
                {(this.state.flights.length > 0) &&
                <FlatList data={this.state.flights} extraData={this.state}
                          renderItem={this._renderRow.bind(this)}
                          keyExtractor={(item) => item.id}/>
                }
            </View>);
    }
}

const styles = StyleSheet.create({});
