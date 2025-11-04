import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, Pressable } from 'react-native';

class PostComments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comentario: "",
    };
  }

  onSubmit() {
    console.log('Comentario:', this.state.comentario);
  }

  render() {
    return (
      <View>
        <Text style={styles.titulo}>Crea un nuevo post</Text>

        <TextInput
          keyboardType="default"
          placeholder="Crea un nuevo Post..."
          onChangeText={text => this.setState({ comentario: text })}
          value={this.state.comentario}
        />

        <Pressable onPress={() => this.onSubmit()}>
          <Text>Submit</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  }
});

export default PostComments;
