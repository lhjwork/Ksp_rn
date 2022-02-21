import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderCompnent from '../../components/HeaderCompnent';
import Touchable from '../../components/Touchable';
import LinearGradient from 'react-native-linear-gradient';
import ContainerGradient from '../../components/Containers/ContainerGradient';
import {
  BoldLabelSubTitle,
  BoldLabelTitle,
  LabelNone,
} from '../../components/Labels';
import {ContainerStyled} from '../../components/StyledComponents/StyledComponents';

import {ShoppingMallData} from '../../asssets/Data/Data';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants';
import ColumnView from '../../components/Views/Column';
import RowView from '../../components/Views/RowView';

const ShoppingMall = ({navigation}) => {
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <ScrollView>
        <HeaderCompnent
          onPerssDrawer={() => navigation.openDrawer()}
          onPressLeftBtn={() => navigation.goBack()}
        />

        <ContainerStyled>
          <View style={{marginHorizontal: 30}}>
            <BoldLabelTitle text={'코나 쇼핑몰'} style={{marginTop: 27.5}} />
            <BoldLabelSubTitle
              text={'TOTAL PORTFOLIL VALUE'}
              style={{marginTop: 13}}
            />
          </View>
          <Touchable onPress={() => navigation.navigate('Calendar')}>
            <View style={styles.adverBanner}>
              <Image
                source={require('../../asssets/images/ShoppingMall/main_attend_img.png')}
                resizeMode="contain"
                style={{width: '100%', height: SCREEN_HEIGHT * 0.15}}
              />
            </View>
          </Touchable>

          <View style={{marginHorizontal: 30}}>
            <RowView
              style={{
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              {ShoppingMallData.map((item, index) => (
                <Touchable
                  key={index}
                  onPress={() => Alert.alert('준비중입니다.')}
                  style={{marginLeft: index % 3 === 0 ? 0 : 37}}>
                  <ColumnView style={{flexWrap: 'wrap'}}>
                    <Image
                      style={{
                        width: 80,
                        height: 80,
                      }}
                      source={item.path}
                    />

                    <LabelNone
                      style={{
                        marginTop: 9.61,
                        marginBottom: 26.63,
                        fontSize: 14,
                        color: '#fff',
                        lineHeight: 17,
                      }}
                      text={item.title}
                    />
                  </ColumnView>
                </Touchable>
              ))}
            </RowView>

            {/* <FlatList
              data={ShoppingMallData}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.id + index.toString()}
              numColumns={3}
              renderItem={({item, index}) => {
                return (
                  <ColumnView>
                    <Touchable onPress={() => Alert.alert('준비중입니다.')}>
                      <Image
                        style={{
                          width: 80,
                          height: 80,
                          marginLeft: index % 3 === 0 ? 0 : 37,
                        }}
                        source={item.path}
                      />
                    </Touchable>
                    <LabelNone
                      style={{
                        marginLeft: index % 3 === 0 ? 0 : 37,
                        marginTop: 9.61,
                        marginBottom: 26.63,
                        fontSize: 14,
                        color: '#fff',
                        lineHeight: 17,
                      }}
                      text={item.title}
                    />
                  </ColumnView>
                );
              }}
            /> */}

            <LinearGradient
              colors={['#91C7D6', '#CBE2DC']}
              style={styles.shoppingBox}>
              <Touchable style={styles.shoppingButton}>
                <LabelNone
                  text={'코나 쇼핑몰 홈페이지 바로가기'}
                  style={styles.shoppingText}
                />
              </Touchable>
            </LinearGradient>
          </View>
        </ContainerStyled>
      </ScrollView>
    </LinearGradient>
  );
};

export default ShoppingMall;

const styles = StyleSheet.create({
  adverBanner: {
    // height: SCREEN_HEIGHT * 0.15,
    marginTop: 24,
    marginBottom: 57,
  },
  adContentsColumn: {marginTop: 57},
  shoppingBox: {
    height: 40,
    justifyContent: 'center',
    marginTop: 40.41,
    marginBottom: 30,
  },
  shoppingButton: {
    height: 38,
    backgroundColor: '#fff',
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shoppingText: {color: '#555555', fontSize: 12, lineHeight: 17},
});
