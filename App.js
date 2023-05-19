import React, { useState } from 'react';
import { View, ImageBackground,Image, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';

import { DatabaseConnection } from './conexao.js';

const db = DatabaseConnection.getConnection();


const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState('');


  //CRIA A TABELA DE USUARIOS
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), password VARCHAR(10))',
      [],
      (tx, result) => {
        console.log('Tabela "usuarios" criada com sucesso');
      },
      (tx, error) => {
        console.log(`Erro ao criar a tabela "usuarios": ${error.message}`);
      }
    );
  });

  const handleLogin = () => {
    // Implementar lógica de autenticação aqui
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const handleRegister = () => {
    // Implementar lógica de registro aqui
    console.log('Registering username:', username);
    console.log('Registering password:', password);
  };

    //FUNCAO QUE ADICIONA NO BANCO AS INFORMAÇÕES DE CADASTRO
    const adduser = () => {
      console.log(username, password);

      if (!username) {
        alert('Por favor preencha o nome !');  //VERIFICA SE O NOME NAO ESTA EM BRANCO
        return;
      }
      if (!password) {  //VERIFICA SE A SENHA NAO ESTA EM BRANCO
        alert('Por favor preencha a senha !');
        return;
      }
      // ABAIXO É A INSERÇÃO DE DADOS NO BANCO
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO users (name, password) VALUES (?,?)',
          [username, password],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              alert('Usuário Registrado com Sucesso !!!'),
                [
                  navigation.navigate('Login'),
                ],
                { cancelable: false };
            } else alert('Erro ao tentar Registrar o Usuário !!!');
          }
      );
    });
  };

    // FUNCAO PARA VALIDAR E LOGAR

    const entrar = () => {
      /* Ir para a tela principal sem opção de voltar
      navigation.reset({
          index:0,
          routes: [{name: "Principal"}]
      })
      */
      if (!username) {
        alert('Por favor, entre com email e senha.!');
        return;
      }
      if (!password) {
        alert('Por favor, entre com email e senha.!');
        return;
      }
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM users where name = ?',
          [username],
          (tx, results) => {
            var len = results.rows.length;
            console.log('len', len);
            if (len > 0) {
              const pass=results.rows.item(0).password;
              console.log(pass)
              if(username == results.rows.item(0).name & password == results.rows.item(0).password){
                console.log(results.rows.item(0).username);
                console.log(results.rows.item(0).password);
                alert('usuario logado!!')
              }else{
                alert('Usuário ou senha inválido!');
              }
            } else {
              alert('Usuário não cadastrado!');
            }
          }
        );
      });
    }

  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(Text) => setUsername(Text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(Text) => setPassword(Text)}
      />
      {isRegistering ? (
        <Button title="Enviar" onPress={adduser} />
      ) : (
        <Button title="Login" onPress={entrar} />
      )}
      <Text style={styles.textLink} onPress={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? ' Voltar' : 'Cadastre-se!'}
      </Text>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  imagemfundo: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: '100%',
},
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 12,
    paddingLeft: 8,
    backgroundColor: 'white',
  },
  textLink: {
    marginTop: 12,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;