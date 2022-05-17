import React, {useCallback, useState} from 'react';
import {View, StyleSheet, FlatList, Image, Linking} from 'react-native';
import HeaderCompnent from '../../components/HeaderCompnent';
import Touchable from '../../components/Touchable';
import LinearGradient from 'react-native-linear-gradient';
import {
  BoldLabelSubTitle,
  BoldLabelTitle,
  LabelNone,
} from '../../components/Labels';
import {ContainerStyled} from '../../components/StyledComponents/StyledComponents';

import {HOMEPAGE_URL, ShoppingMallData} from '../../asssets/Data/Data';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants';
import ColumnView from '../../components/Views/Column';

const ShoppingMall = ({navigation}) => {
  const openURL = () => {
    Linking.openURL(HOMEPAGE_URL);
  };
  const renderItem = useCallback(({item, index}) => {
    let indexValue = (index + 1) % 3;
    let justifyContentValue =
      indexValue === 1
        ? 'flex-start'
        : indexValue === 2
        ? 'center'
        : 'flex-end';
    return (
      <Touchable
        style={{
          width: (SCREEN_WIDTH - 60) / 3,
          alignItems: justifyContentValue,
        }}
        onPress={() => {
          if (item?.url) {
            navigation.navigate('ShoppingWebView', {item});
          }
        }}>
        <ColumnView>
          <Image
            style={{
              width: SCREEN_WIDTH * 0.22,
              height: SCREEN_WIDTH * 0.22,
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
    );
  }, []);

  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <ContainerStyled>
        <FlatList
          keyExtractor={(item, index) => index}
          data={ShoppingMallData}
          renderItem={renderItem}
          numColumns={3}
          ListHeaderComponentStyle={{marginHorizontal: -30}}
          ListFooterComponentStyle={{marginHorizontal: -6}}
          contentContainerStyle={{
            paddingHorizontal: 30,
            // justifyContent: 'space-between',
          }}
          ListFooterComponent={
            <LinearGradient
              colors={['#91C7D6', '#CBE2DC']}
              style={styles.shoppingBox}>
              <Touchable
                style={styles.shoppingButton}
                onPress={() => {
                  openURL();
                }}>
                <LabelNone style={styles.shoppingText} />
              </Touchable>
            </LinearGradient>
          }
          ListHeaderComponent={
            <>
              <HeaderCompnent onPerssDrawer={() => navigation.openDrawer()} />
              <View style={{marginHorizontal: 30}}>
                <BoldLabelTitle style={{marginTop: 27.5}} />
                <BoldLabelSubTitle
                  text={'TOTAL PORTFOLIO VALUE'}
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
            </>
          }
        />
      </ContainerStyled>
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
