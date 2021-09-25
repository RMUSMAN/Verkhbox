import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../Icon';
import Text from '../Text';
import styles from './styles';
const Error = ({message}) => {
  return (
    <View
      style={{
        maxWidth: '100%',
        marginTop: '5%',
        width:'100%'
      }}>
      <LinearGradient
        colors={['#FFA500', '#C5121B']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{borderRadius: 5}}>
        <View
          style={[styles.registerButtonStyle, {backgroundColor: '#FFF6F6'}]}>
          <Icon
            name="circle-thin"
            color="#E24A9A"
            iconFamily="FontAwesome"
            size={20}
            style={{marginRight: '3%'}}
          />
          <Text
            body2
            style={{
              marginTop: 5,
              color: '#EBC27E',
            }}>
            {message}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};
export default Error;
