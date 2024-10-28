import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';

const db = SQLite.openDatabaseAsync('test.db');

export default function App() {
  const [table, setTable] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "PRAGMA foreign_keys = ON;",
        [],
        () => console.log('Foreign keys turned on'),
        (tx, e) => console.warn('Error turning on foreign keys:', e)
      );

      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);",
        [],
        () => console.log('Table users is created'),
        (tx, e) => console.warn('Error creating table users:', e)
      );
    });
  }, []);

  const addUser = () => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO users (name) VALUES (?);",
        ['John Doe'],
        () => {
          console.log('User added');
          fetchUsers(); // Fetch users after adding
        },
        (tx, e) => console.warn('Insert error:', e)
      );
    });
  };

  const fetchUsers = () => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM users;",
        [],
        (_, { rows }) => {
          setTable(rows._array); // Update state with results
        },
        (tx, e) => console.warn('Select error:', e)
      );
    });
  };

  useEffect(() => {
    addUser(); // Add a user on initial load
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello Boss</Text>
      <Text>{JSON.stringify(table)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
