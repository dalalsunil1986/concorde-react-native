import React from 'react';
import {Picker} from "react-native";

export default class CityPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: this.props.selectedValue,
        };
    }

    render() {
        return (
            <Picker selectedValue={this.state.city} onValueChange={(itemValue, itemIndex) => {
                this.props.onValueChange(itemValue);
                this.setState({city: itemValue});
            }}>
                <Picker.Item label="" value=""/>
                <Picker.Item label="Cluj-Napoca" value="Cluj-Napoca"/>
                <Picker.Item label="Bucharest" value="Bucharest"/>
                <Picker.Item label="Budapest" value="Budapest"/>
                <Picker.Item label="London" value="London"/>
                <Picker.Item label="Paris" value="Paris"/>
                <Picker.Item label="Berlin" value="Berlin"/>
            </Picker>
        );
    }
}