import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderCompnent from '../../components/HeaderCompnent';
import {BoldLabel14, BoldLabelTitle} from '../../components/Labels';
import RowView from '../../components/Views/RowView';

import {SCREEN_HEIGHT} from '../../constants';
import api from '../../api';
import {config} from '../../constant';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import {useIsFocused} from '@react-navigation/native';

const ScannHistory = ({navigation}) => {
  const auth = useSelector(state => state.auth);
  const {sessionToken} = auth?.user;
  const [scanHistory, setScanHistory] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      let body = {sessionToken};
      try {
        const {data} = await api.post(
          'scanhistory',
          JSON.stringify(body),
          config,
        );
        setScanHistory(data?.result);
      } catch (e) {
        console.log(e);
        console.log(e.response);
      }
    })();
  }, [isFocused]);
  return (
    <LinearGradient
      colors={['#91C7D6', '#CBE2DC']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 0.15}}
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <HeaderCompnent
            onPerssDrawer={() => navigation.openDrawer()}
            onPressLeftBtn={() => navigation.goBack()}
          />

          <BoldLabelTitle
            text={'스캔 히스토리'}
            style={{marginTop: 27.5, marginHorizontal: 30, marginBottom: 55}}
          />
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              height: SCREEN_HEIGHT * 0.85,
            }}>
            <ScrollView
              nestedScrollEnabled={true}
              contentContainerStyle={{paddingBottom: 30}}>
              {scanHistory?.map((menu, index) => (
                <RowView style={styles.tableDataBox} key={index}>
                  <View>
                    <BoldLabel14 text={menu?.title} style={styles.title} />
                    <BoldLabel14
                      text={dayjs(menu?.Date).format('YY.MM.DD')}
                      style={styles.subTitle}
                    />
                  </View>
                  <BoldLabel14
                    text={'+ ' + menu?.amount.toLocaleString()}
                    style={styles.point}
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
    paddingVertical: 14,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
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
  },
  title: {
    fontWeight: '400',
    color: '#555',
    lineHeight: 20,
  },
  subTitle: {
    fontSize: 12,
    lineHeight: 17,
    color: '#C4C4C4',
    marginTop: 13,
  },
  point: {
    fontSize: 14,
    lineHeight: 20,
    color: '#46A0BD',
  },
});
