import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      loading: false,
      error: "",
    };
  }

  addComment() {
    const postId = this.props.route.params.postId;

    if (this.state.comment === "") {
      this.setState({ error: "El comentario no puede estar vacío." });
    } 
    else {
      this.setState({ loading: true, error: "" });

      const nuevoComentario = {
        user: auth.currentUser.email,
        text: this.state.comment,
        createdAt: Date.now(),
      };

      db.collection("posts")
        .doc(postId)
        .update({
          comentarios: firebase.firestore.FieldValue.arrayUnion(nuevoComentario),
        })
        .then(() => {
          this.setState({
            comment: "",
            loading: false,
            error: "",
          });
          console.log("Comentario agregado!");
        })
        .catch(() => {
          this.setState({
            error: "Hubo un problema al publicar el comentario.",
            loading: false,
          });
        });
    }
  }

  render() {  
    return (
      <View>
        <Text>Agregar comentario</Text>

        <TextInput
          placeholder="Escribí tu comentario..."
          value={this.state.comment}
          onChangeText={(text) => this.setState({ comment: text })}
        />

        <Text>{this.state.error}</Text>

        {this.state.loading ? (
          <ActivityIndicator color="#1DA1F2" />
        ) : (
          <Pressable  onPress={() => this.addComment()}>
            <Text>Publicar comentario</Text>
          </Pressable>
        )}
      </View>
    );
  }
}


export default Comments;