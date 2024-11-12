import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Checkbox as CheckBox } from 'react-native-paper'
import { Icon } from 'react-native-elements';

export default function Checkbox({ checkvalue, ...props }) {
    return (
      <View style={styles.container}>
        <CheckBox
          checkedIcon={
            <Icon
              name="radio-button-checked"
              type="material"
              color="green"
              size={20}
              iconStyle={{ marginRight: 10 }}
            />
          }
          uncheckedIcon={
            <Icon
              name="radio-button-unchecked"
              type="material"
              color="grey"
              size={20}
              iconStyle={{ marginRight: 10 }}
            />
          }
          checked={checkvalue}
          {...props}
        />
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      width: 'auto',
      paddingStart:0,
      paddingEnd:0,
      marginVertical: 0,
    },
    input: {
      backgroundColor: '#fff',
      textAlign:"left" 
    },
    description: {
      fontSize: 13,
      color: '#fff',
      paddingTop: 8,
    },
    error: {
      fontSize: 13,
      color: 'red',
      paddingTop: 15,
    },
  })