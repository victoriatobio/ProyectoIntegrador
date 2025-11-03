import {React} from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

function Profile() {
  return (
    <View>
      <Text style={styles.titulo} >Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
      titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    }
});

export default Profile;