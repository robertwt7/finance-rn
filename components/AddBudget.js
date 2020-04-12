import React, { Component } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";

export default class AddBudget extends Component {
	constructor() {
		super();
		this.state = {
			text: "",
		};
	}

	handleClick = () => {
		// TODO: Pass state text to the month list
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.viewInput}>
					<TextInput
						style={styles.input}
						placeholder="Add Budget Name"
						onChange={(text) => {
							this.setState({ text: text });
						}}
						defaultValue={this.state.text}
					/>
				</View>
				<View style={styles.viewButton}>
					<Button
						title="Add Budget"
						onPress={this.handleClick}
						style={styles.button}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 2,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
		fontSize: 20,
	},
	button: {
		textAlign: "right",
	},
	input: {
		height: 20,
		paddingLeft: 10,
	},
	viewInput: { flex: 4 },
	viewButton: { flex: 2 },
});
