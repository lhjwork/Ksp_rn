import React from 'react';
import {View, StyleSheet} from 'react-native';
import Touchable from './Touchable';
import RowView from './Views/RowView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BoldLabelSubTitle, LabelNone} from './Labels';

const Agreement = ({text, index, isActive, onPress, DetailOpenPress}) => {
  return (
    <RowView
      style={{
        justifyContent: 'space-between',
        marginRight: 13,
        marginLeft: 16.5,
        borderBottomColor: index === 2 ? '#fff' : '#E5E5E5',
        borderBottomWidth: 1,
      }}>
      <RowView>
        <Touchable onPress={onPress}>
          {isActive === false ? (
            <Ionicons
              name={'checkmark-circle-outline'}
              size={15}
              style={styles.offSmallIcon}
            />
          ) : (
            <Ionicons
              name={'checkmark-circle'}
              size={15}
              style={styles.onSmallIcon}
            />
          )}
        </Touchable>

        <BoldLabelSubTitle text={text} style={styles.subTitleText} />
      </RowView>
      <Touchable DetailOpenPress={DetailOpenPress}>
        <LabelNone
          text={'[상세보기]'}
          style={{color: '#46A0BD', fontWeight: '700'}}
        />
      </Touchable>
    </RowView>
  );
};

export default Agreement;

const styles = StyleSheet.create({
  onSmallIcon: {
    color: '#46A0BD',
    paddingRight: 11.5,
  },
  offSmallIcon: {
    color: '#C4C4C4',
    paddingRight: 11.5,
  },
  subTitleText: {
    fontSize: 14,
    fontWeight: '400',
    paddingVertical: 17,
    color: '#555555',
  },
});
