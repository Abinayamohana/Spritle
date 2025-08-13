import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native';


export default function Gradient({children}) {
  return (
    <LinearGradient
    colors={ ['#f4b6e7ff', '#5B86E5']} // default colors
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradient]}>
      {children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  }
})