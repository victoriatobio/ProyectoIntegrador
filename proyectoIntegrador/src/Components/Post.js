import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Post extends Component {
  render() {
    return (
      <View style={styles.card} >
        <Text style={styles.owner} >{this.props.postData.owner}</Text>
        <Text style={styles.description} >{this.props.postData.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E6ECF0',
  },
  owner: {
    color: '#1DA1F2',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#14171A',
    marginBottom: 5,
  }
});


export default Post;
