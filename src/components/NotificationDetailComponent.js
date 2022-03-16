import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BoldLabel14, LabelNone} from './Labels';
import Touchable from './Touchable';
import RowView from './Views/RowView';

const NotificationDetailComponent = ({outStyle, text, date, onPress}) => {
  return (
    <View
      style={{
        height: 76,
        marginHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        ...outStyle,
      }}>
      <Touchable onPress={onPress}>
        <RowView style={{paddingTop: 20}}>
          <View style={styles.bar} />
          <BoldLabel14 text={text} style={{color: '#555'}} />
        </RowView>
        <LabelNone text={date} style={styles.date} />
      </Touchable>
    </View>
  );
};

export default NotificationDetailComponent;

const styles = StyleSheet.create({
  date: {textAlign: 'right', marginTop: 9, color: '#46A0BD'},
  bar: {
    backgroundColor: '#46A0BD',
    width: 5,
    height: 12,
    marginRight: 10,
  },
});
