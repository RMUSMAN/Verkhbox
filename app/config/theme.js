import {StyleSheet} from 'react-native';
import {BaseColor} from './color';

/**
 * Common basic style defines
 */
export const BaseStyle = StyleSheet.create({
  tabBar: {
    borderTopColor: BaseColor.lightGrey,
    borderTopWidth: 1,
    backgroundColor: 'white',
    shadowOffset: {height: 0, width: 0},
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    height: 70,
    fontFamily:'Poppins-Regular',
    
    
  },
  bodyPaddingDefault: {
    paddingHorizontal: 20,
  },
  bodyMarginDefault: {
    marginHorizontal: 20,
  },
  textInput: {
    height: 44,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    justifyContent: 'center',
  },
  textInputWithIcon: {
    minHeight: 44,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
  },
  iconInputContainer: {
    borderRadius: 5,
    width: '100%',
    backgroundColor: BaseColor.fieldColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  safeAreaView: {
    flex: 1,
  },
  whiteHeader: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    backgroundColor: 'white',
  },
});
