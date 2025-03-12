import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Template = ({children, tittle}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>{tittle}</Text>
      </View>
      <View style={styles.body}>
            {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE600',
  },
  header: {
    backgroundColor: '#FFE600',
    padding: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'normal',
  },
  body: {
    backgroundColor: '#E7E7E7', 
    flex: 1, 
  },
});

export default Template;