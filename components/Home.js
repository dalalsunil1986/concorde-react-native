import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {UserController} from "../controller/UserController";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.userController = new UserController();

        this.state = {
            username: "",
            password: "",
        }
    }

    render() {
        const user = this.userController.getUser();
        const haveUser = (user !== null);
        const isIbis = (haveUser && user.isIbis);
        return (
            <View>
                {!haveUser && <TextInput
                    style={styles.inputText}
                    onChangeText={(username) => this.setState({username})}
                />}
                {!haveUser && <TextInput
                    style={styles.inputText}
                    password={true}
                    onChangeText={(password) => this.setState({password})}
                />}
                {!haveUser && <Button
                    title="Sign in"
                    onPress={() => {
                        this.userController.authenticate(this.state.username, this.state.password)
                            .then((response) => this.forceUpdate())
                    }}
                />}
                {!haveUser && <Button
                    title="Sign in with Google"
                    onPress={() => {
                        this.userController.authenticateWithGoogle()
                            .then((response) => this.forceUpdate())
                    }}
                />}
                {haveUser && <Button
                    title="Log out"
                    onPress={() => {
                        this.userController.logout();
                        this.forceUpdate();
                    }}
                />}
                {haveUser && <Button
                    title="Flights"
                    onPress={() => {
                        this.props.navigation.navigate('Flights')
                    }}
                />}
                {isIbis && <Button
                    title="Manage flights"
                    onPress={() => {
                        this.props.navigation.navigate('ManageFlights')
                    }}
                />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputText: {
        textAlign: "center",
        width: 400,
        height: 50,
    }
});
