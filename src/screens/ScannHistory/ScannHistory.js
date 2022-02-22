import React from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderCompnent from '../../components/HeaderCompnent';
import {BoldLabel14, BoldLabelTitle} from '../../components/Labels';
import RowView from '../../components/Views/RowView';

import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../constants';

const Data = [
  {id: 1, date: '22.01.03', amount: '12,000', brand: 'PRADA'},
  {id: 2, date: '22.01.03', amount: '30,000', brand: 'PRADA'},
  {id: 3, date: '22.01.03', amount: '10,000', brand: 'PRADA'},
  {id: 4, date: '22.01.03', amount: '7,000', brand: 'PRADA'},
  {id: 5, date: '22.01.03', amount: '500', brand: 'muimui'},
  {id: 6, date: '22.01.03', amount: '30,000', brand: '영화쿠'},
  {id: 7, date: '22.01.03', amount: '30,000', brand: 'PRADA'},
];

const ScannHistory = ({navigation}) => {
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <HeaderCompnent
            onPerssDrawer={() => navigation.openDrawer()}
            onPressLeftBtn={() => navigation.goBack()}
          />
          <View style={{marginHorizontal: 24, flex: 1}}>
            <BoldLabelTitle text={'스캔 히스토리'} style={{marginTop: 27.5}} />
          </View>
          <RowView style={styles.tableTitleBox}>
            <BoldLabel14 text={'날짜'} style={styles.tableTitleText1} />
            <BoldLabel14 text={'금액'} style={styles.tableTitleText1} />
            <BoldLabel14 text={'브랜스'} style={styles.tableTitleText1} />
          </RowView>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              height: SCREEN_HEIGHT * 0.85,
            }}>
            <ScrollView nestedScrollEnabled={true}>
              {Data.map((menu, index) => (
                <RowView style={styles.tableDataBox}>
                  <BoldLabel14
                    text={menu?.date}
                    style={styles.tableTitleData1}
                  />
                  <BoldLabel14
                    text={menu?.amount}
                    style={styles.tableTitleData1}
                  />
                  <BoldLabel14
                    text={menu?.brand}
                    style={styles.tableTitleData1}
                  />
                </RowView>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ScannHistory;

const styles = StyleSheet.create({
  tableDataBox: {
    marginHorizontal: 24,
    paddingVertical: 10,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
  tableTitleBox: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    backgroundColor: '#EBEDEE',
    paddingVertical: 10,
    marginTop: 55,
  },
  tableTitleText1: {
    fontWeight: '700',
    color: '#46A0BD',
    lineHeight: 19,

    textAlign: 'center',
    flex: 1,
  },

  tableTitleData1: {
    fontWeight: '400',
    color: '#555',
    lineHeight: 19,
    textAlign: 'center',
    flex: 1,
  },
});
