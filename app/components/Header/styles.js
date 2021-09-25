import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseStyle} from '../../config';

export default StyleSheet.create({
  contain: {height: 45, flexDirection: 'row', alignItems: 'center'},
  contentLeft: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    width: 60,
  },
  contentCenter: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  contentRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 20,
    height: '100%',
  },
  contentRightSecond: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    height: '100%',
  },
  right: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  titleImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginTop: 5,
    marginRight:5
  },
});
