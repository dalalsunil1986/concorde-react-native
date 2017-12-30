import React from 'react';
import {FlightController} from "../../controller/FlightController";
import {Text, View, StyleSheet} from "react-native";
import {StockLine} from 'react-native-pathjs-charts';

export default class DetailsFlightGraph extends React.Component {
    constructor(props) {
        super(props);

        this.flightController = new FlightController();

        this.state = {
            id: this.props.id,
            loaded: false,
        };
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
        let prices = [];
        prices.push({"x": 0, "y": 0});
        for (let i = 0; i < flight.allPrices.length; ++i) {
            prices.push({"x": i + 1, "y": flight.allPrices[i]});
        }
        const data = [prices];

        let options = {
            width: 300,
            height: 250,
            color: '#2980B9',
            margin: {
                top: 10,
                left: 35,
                bottom: 30,
                right: 10
            },
            animate: {
                type: 'delayed',
                duration: 200
            },
            axisX: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom',
                tickValues: [],
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#34495E'
                }
            },
            axisY: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'left',
                tickValues: [],
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#34495E'
                }
            }
        }

        return (
            <View>
                <StockLine
                    data={data}
                    options={options}
                    xKey="x"
                    yKey="y"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: 200,
        height: 200,
    }
});
