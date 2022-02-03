import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
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

const ShoppingMall = ({navigation}) => {
  console.log('ddddd');
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <ScrollView>
        <HeaderCompnent onPerssDrawer={() => navigation.openDrawer()} />

        <ContainerStyled>
          <View style={{marginHorizontal: 30}}>
            <BoldLabelTitle text={'코나 쇼핑몰'} style={{marginTop: 27.5}} />
            <BoldLabelSubTitle
              text={'TOTAL PORTFOLIL VALUE'}
              style={{marginTop: 13}}
            />
          </View>
          <View style={styles.adverBanner}></View>
          <View style={{marginHorizontal: 30}}>
            <FlatList
              data={ShoppingMallData}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.id + index.toString()}
              numColumns={3}
              renderItem={({item, index}) => {
                console.log(item);
                return (
                  <ColumnView>
                    <View
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        backgroundColor: '#fff',
                        marginLeft: index % 3 === 0 ? 0 : 37,
                      }}>
                      <Image />
                    </View>
                    <LabelNone
                      style={{
                        marginLeft: index % 3 === 0 ? 0 : 37,
                        marginTop: 9.61,
                        marginBottom: 26.63,
                      }}
                      text={'dddd'}
                    />
                  </ColumnView>
                );
              }}
            />

            <LinearGradient
              colors={['#91C7D6', '#CBE2DC']}
              style={{
                height: 40,
                justifyContent: 'center',
                marginTop: 40.41,
                marginBottom: 30,
              }}>
              <Touchable
                style={{
                  height: 38,
                  backgroundColor: '#fff',
                  marginHorizontal: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <LabelNone
                  text={'코나 쇼핑몰 홈페이지 바로가기'}
                  style={{color: '#555555', fontSize: 12, Lineheight: 17.38}}
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
    height: SCREEN_HEIGHT * 0.15,
    backgroundColor: '#c4c4c4',
    marginTop: 24,
    marginBottom: 57,
  },
  adContentsColumn: {marginTop: 57},
});
