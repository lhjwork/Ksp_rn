import React from 'react';

import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderCompnent from '../../components/HeaderCompnent';
import LinearGradient from 'react-native-linear-gradient';
import {
  BoldLabel16,
  BoldLabelSubTitle,
  BoldLabelTitle,
} from '../../components/Labels';
import {
  Date,
  DetailText,
  Image,
  ProductBox,
  ProductImage,
  RowBox,
  RowBoxLine,
  SearchButton,
} from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const {width, height} = Dimensions.get('window');
const PurchaseHistory = ({navigation}) => {
  const renderList = () => {
    return (
      <ProductBox>
        <RowBoxLine>
          <Date>2022.04.23</Date>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DetailPurchaseHistory');
            }}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <DetailText>주문 상세보기</DetailText>
            <FontAwesome5
              name={'angle-right'}
              size={10}
              color={'#46A0BD'}
              // style={styles.exclamationStyle}
            />
          </TouchableOpacity>
        </RowBoxLine>
        <RowBox>
          <ProductImage
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpI0AXNwNk6USPik9Z6g1o95HI--bHI1kc2aXtXbT6ofg2wBOHdSDu_VdXSFKrn7LAFSs&usqp=CAU',
            }}
          />
          <View style={{flex: 1}}>
            <BoldLabelSubTitle
              style={{color: '#000', flex: 1}}
              text={
                '옵션 추가 시 회원 앱애 연동 잘됨 옵션 추가 시 회원 앱애 연동 잘됨'
              }
            />
            <BoldLabel16 text={'$256,00'} style={{color: '#000000'}} />
          </View>
        </RowBox>
        <SearchButton
          onPress={() => {
            navigation.navigate('DeliveryTracking');
          }}>
          <BoldLabelSubTitle
            text={'배송 조회'}
            style={{textAlign: 'center', color: '#94D2E9'}}
          />
        </SearchButton>
      </ProductBox>
    );
  };
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <ScrollView>
        <HeaderCompnent
          onPerssDrawer={() => navigation.openDrawer()}
          onPressLeftBtn={() => navigation.goBack()}
        />
        <View style={{marginHorizontal: 24, flex: 1}}>
          <BoldLabelTitle
            text={'구매내역'}
            style={{marginTop: 27.5, marginBottom: 30}}
          />
          <FlatList
            data={[1, 2, 3]}
            renderItem={renderList}
            keyExtractor={(item, index) => index.toString()}
          />
          {/*<ProductBox>*/}
          {/*  <RowBoxLine>*/}
          {/*    <Date>2022.04.23</Date>*/}
          {/*    <TouchableOpacity*/}
          {/*      style={{flexDirection: 'row', alignItems: 'center'}}>*/}
          {/*      <DetailText>주문 상세보기</DetailText>*/}
          {/*      <FontAwesome5*/}
          {/*        name={'angle-right'}*/}
          {/*        size={10}*/}
          {/*        color={'#46A0BD'}*/}
          {/*        // style={styles.exclamationStyle}*/}
          {/*      />*/}
          {/*    </TouchableOpacity>*/}
          {/*  </RowBoxLine>*/}
          {/*  <RowBox>*/}
          {/*    <ProductImage*/}
          {/*      source={{*/}
          {/*        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpI0AXNwNk6USPik9Z6g1o95HI--bHI1kc2aXtXbT6ofg2wBOHdSDu_VdXSFKrn7LAFSs&usqp=CAU',*/}
          {/*      }}*/}
          {/*    />*/}
          {/*    <View style={{flex: 1}}>*/}
          {/*      <BoldLabelSubTitle*/}
          {/*        style={{color: '#000', flex: 1}}*/}
          {/*        text={*/}
          {/*          '옵션 추가 시 회원 앱애 연동 잘됨 옵션 추가 시 회원 앱애 연동 잘됨'*/}
          {/*        }*/}
          {/*      />*/}
          {/*      <BoldLabel16 text={'$256,00'} style={{color: '#000000'}} />*/}
          {/*    </View>*/}
          {/*  </RowBox>*/}
          {/*  <SearchButton*/}
          {/*    onPress={() => {*/}
          {/*      navigation.navigate('DeliveryTracking');*/}
          {/*    }}>*/}
          {/*    <BoldLabelSubTitle*/}
          {/*      text={'배송 조회'}*/}
          {/*      style={{textAlign: 'center', color: '#94D2E9'}}*/}
          {/*    />*/}
          {/*  </SearchButton>*/}
          {/*</ProductBox>*/}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default PurchaseHistory;
