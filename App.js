import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';

import uniq from 'lodash/uniq';
import upperCase from 'lodash/upperCase';

import commonColor from './commonColor';

export default function App() {

  const defaultColorKeys = Object.keys(commonColor);
  let colorCategories = uniq(defaultColorKeys.map(colorKey => colorKey.replace(/[\d]+/g, '').replace('A', '')))
  colorCategories = colorCategories.map(colorKey => {
    const colorArray = [];
    defaultColorKeys.forEach(item => {
      if (item.includes(colorKey)) {
        colorArray.push({ label: item, value: commonColor[item] });
      }
    });
    return { colorKey, colorArray };
  });

  renderColorItem = colorItem => (
    <View style={styles.colorContent}>
      {
        colorItem.colorArray.map(item => {
          return (
            <View key={item.label} style={{ ...styles.singleColorItem }}>
              <Text style={{ marginBottom: 4 }}>{item.label}: {item.value}</Text>
              <View style={{ backgroundColor: item.value, width: '100%', height: 40 }}></View>
            </View>
          )
        })
      }
      <View style={{ ...styles.emptyItem, ...styles.singleColorItem }}></View>
      <View style={{ ...styles.emptyItem, ...styles.singleColorItem }}></View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {
        colorCategories.map(colorItem => {
          return (
            <View key={colorItem.colorKey}>
              <Text style={styles.sectionTitle}>{upperCase(colorItem.colorKey)}</Text>
              {renderColorItem(colorItem)}
            </View>
          );
        })
      }
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  colorContent: {
    flexDirection: 'row',
    alignItems: 'stretch',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  singleColorItem: {
    width: '24%',
    marginRight: 2,
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: 'center',
  },
  emptyItem: {
    height: 1,
  },
});
