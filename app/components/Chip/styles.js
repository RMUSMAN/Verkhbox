import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor, Typography, FontWeight} from '../../config';

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 20,
    minHeight: 30,

    borderRadius: 20,
    backgroundColor: 'yellow',
    justifyContent:'flex-end',
    marginHorizontal:5,
  },
  circle: {
    minWidth: 30,
    minHeight: 30,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    marginHorizontal:10,
  },
});

export default styles;
