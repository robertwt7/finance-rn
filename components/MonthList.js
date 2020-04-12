import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export default class MonthList extends Component {
	constructor() {
		super();
		this.state = {
			name: "January",
		};
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>Month: {this.state.name}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: "center",
		justifyContent: "center",
	},

	text: {
		textAlign: "center",
		padding: 1,
		fontSize: 20,
	},
});
