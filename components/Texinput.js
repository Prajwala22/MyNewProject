import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'

export default function TextInput({ errorText, description, ...props }) {
return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor='#483d8b'
        underlineColor="transparent"
        // mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingStart:0,
    paddingEnd:0,
    marginVertical: 0,
  },
  input: {
    backgroundColor: '#fff',
    textAlign:"left",
    width: '100%',
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