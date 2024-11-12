import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'

export default function Button({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && { backgroundColor: theme.colors.secondary },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    width: '50%',
    borderRadius: 20,
    alignSelf:'center',
    paddingVertical: 5,
    backgroundColor: '#7966FF',
    elevation: 0,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 18,
    color: '#fff', 
  },
})
