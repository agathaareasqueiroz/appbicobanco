import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

import { DatabaseConnection } from './conexao.js';

const db = DatabaseConnection.getConnection();


export default function ProfilesScreen() {

const profiles = ['Pedreiro', 'Gesseiro', 'Ladrilheiro', 'Pintor', 'Armador'];


return (

 <View style={styles.container}>

 <View>

 <Text style={styles.title}>Perfis dos Profissionais</Text>

 </View>

<View style={styles.profilesContainer}>

{profiles.map((profile, index) => (

 <View key={index} style={styles.profileItem}>

 <Text style={styles.profileText}>{profile}</Text>

</View>

))}

 </View>

<View style={styles.contactContainer}>

<Text style={styles.contactText}>Para nos contratar, nos envie um e-mail:</Text>

<Text style={styles.emailText}>constregis@gmail.com</Text>

</View>

 </View>

 );

}




const styles = StyleSheet.create({

container: {

flex: 1,

backgroundColor: '#38a69d',

alignItems: 'center',

justifyContent: 'center',

 },

title: {

fontSize: 20,

fontWeight: 'bold',

marginVertical: 10,

color: '#fff',

 },

profilesContainer: {

marginTop: 20,

flexDirection: 'row',

flexWrap: 'wrap',

justifyContent: 'center',

 },

profileItem: {

width: 100,

height: 100,

backgroundColor: '#ccc',

margin: 10,

justifyContent: 'center',

alignItems: 'center',

borderRadius: 5,

 },

profileText: {

fontSize: 16,

fontWeight: 'bold',

textAlign: 'center',

},

contactContainer: {

marginTop: 20,

alignItems: 'center',

 },

contactText: {

fontSize: 16,

marginBottom: 5,

color: '#fff',

 },

emailText: {

fontSize: 16,

fontWeight: 'bold',

color: '#fff',

 },

});