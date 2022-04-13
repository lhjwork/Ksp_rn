import React, {useEffect, useState} from 'react';

import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import HeaderCompnent from '../../components/HeaderCompnent';
import LinearGradient from 'react-native-linear-gradient';
import {
  BoldLabel16,
  BoldLabelSubTitle,
  BoldLabelTitle,
  NormalLabel14,
} from '../../components/Labels';
import {
  Date,
  DetailText,
  ProductBox,
  ProductImage,
  RowBox,
  RowBoxLine,
  SearchButton,
} from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DeliveryTrackingButton from '../../components/deliveryTrackingButton';
import api from '../../api';
import {config} from '../../constant';
import {useSelector} from 'react-redux';
import NoneScreen from '../noneScreen';

const PurchaseHistory = ({navigation}) => {
  const auth = useSelector(state => state.auth);
  const {sessionToken} = auth?.user;
  const [paymentList, setPaymentList] = useState([]);
  useEffect(() => {
    (async () => {
      let body = {sessionToken};
      try {
        const {data} = await api.post(
          'paymentselect/user',
          JSON.stringify(body),
          config,
        );
        setPaymentList(data?.paymentList);
        console.log(data?.paymentList);
      } catch (e) {
        console.log(e);
        console.log(e.response);
      }
    })();
  }, []);
  const renderList = data => {
    let {item} = data;
    return (
      <ProductBox>
        <RowBoxLine>
          <Date>{item?.createdAt}</Date>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DetailPurchaseHistory', item);
            }}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <DetailText>주문 상세보기</DetailText>
            <FontAwesome
              name={'angle-right'}
              size={10}
              color={'#46A0BD'}
              // style={styles.exclamationStyle}
            />
          </TouchableOpacity>
        </RowBoxLine>
        <RowBox>
          <ProductImage
            source={require('../../asssets/Data/testProduct.png')}
          />
          <View style={{flex: 1}}>
            <NormalLabel14
              style={{color: '#000', flex: 1}}
              text={`[${item?.brand}] ${item?.title}`}
            />
            <BoldLabel16
              text={item?.totalPrice.toLocaleString() + ' 원'}
              style={{color: '#000000'}}
            />
          </View>
        </RowBox>
        <DeliveryTrackingButton
          t_code={item?.deliveryCode}
          t_invoice={item?.invoiceNumber}
        />
      </ProductBox>
    );
  };
  return (
    <LinearGradient
      colors={['#91C7D6', '#CBE2DC']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 0.65}}
      style={{flex: 1}}>
      {paymentList.length === 0 ? (
        <View style={{paddingHorizontal: 24, flex: 1}}>
          <HeaderCompnent
            onPerssDrawer={() => navigation.openDrawer()}
            onPressLeftBtn={() => navigation.goBack()}
            style={{marginHorizontal: -24}}
          />
          <BoldLabelTitle text={'구매내역'} style={{marginTop: 27.5}} />
          <NoneScreen text={'앗!  구매내역이 존재하지 않습니다.'} />
        </View>
      ) : (
        <FlatList
          style={{paddingHorizontal: 24, flex: 1}}
          contentContainerStyle={{paddingBottom: 10}}
          data={paymentList}
          renderItem={renderList}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <>
              <HeaderCompnent
                onPerssDrawer={() => navigation.openDrawer()}
                onPressLeftBtn={() => navigation.goBack()}
                style={{marginHorizontal: -24}}
              />
              <BoldLabelTitle
                text={'구매내역'}
                style={{marginTop: 27.5, marginBottom: 30}}
              />
            </>
          }
        />
      )}
    </LinearGradient>
  );
};

export default PurchaseHistory;
