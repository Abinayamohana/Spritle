import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

const SearchBar = ({ value, onChangeText }) => {


  return (
    <View style={[styles.container]}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeText}
        value={value}
        style={styles.searchbar}
        inputStyle={styles.input}
        iconColor="#6200ee"
      />
    </View>
  );
};

export default SearchBar;
const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    marginBottom: 15,
    elevation: 5,
  },
  searchbar: {
    borderRadius: 12,
    elevation: 4,
    backgroundColor: "#fff",
  },
  input: {
    fontSize: 16,
    color: "#333",
  },
});
