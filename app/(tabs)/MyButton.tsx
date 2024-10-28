import { View, Text, StyleSheet, Platform, Button } from 'react-native'
import React from 'react'

export default function  MyButton () {

    const styles = StyleSheet.create({
        container: {
            flex:1,
            ...Platform.select({
            ios: {
                backgroundColor:'blue',
            },
            android: {
                backgroundColor:'green',
            },
            default: {
                backgroundColor:'red',
            }
            })
        }
    });


  return (
    <Button style ={styles.backgroundColor} title='click'/>
  );
};
parseInt(Platform.version)


