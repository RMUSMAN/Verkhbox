import {StyleSheet, Dimensions} from 'react-native';
import {BaseColor} from '../../../config';
const width = Dimensions.get('screen').width;
export default StyleSheet.create({
  optionModalBackground: {
    flex: 1,
    alignItems: 'center',
    margin: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  optionsModalWrapper: {
    backgroundColor: BaseColor.whiteColor,
    minHeight: 220,
    width: width - 40,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  dropDownItem: {
    borderBottomColor: '#F5F3F7',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    minHeight: 60,
  },
  actionRow:{
      flexDirection:'row',
      alignItems:'center',
      width:'100%',
      justifyContent:'flex-end',
      marginVertical:10,
      paddingHorizontal:20
  },
  
});
