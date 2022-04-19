import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView, Text, View} from 'react-native';
import HeaderCompnent from '../../components/HeaderCompnent';
import {ContainerStyled} from '../../components/StyledComponents/StyledComponents';
import {
  BoldLabel14,
  BoldLabel16,
  BoldLabel18,
  BoldLabelSubTitle,
  BoldLabelTitle,
  NormalLabel14,
} from '../../components/Labels';
import RowView from '../../components/Views/RowView';
import {
  ProductTitle,
  ProductTitleBlack,
  Reply,
  Subtitle,
  SubtitleGray,
  Title,
  Union,
} from './styles';
import {ProductImage, SearchButton} from '../purchaseHistory/styles';
import DeliveryTrackingButton from '../../components/deliveryTrackingButton';
import {SCREEN_WIDTH} from '../../constants';
import {PhoneNumberConvert} from '../../utils';
import {DrawerActions} from '@react-navigation/native';

const DetailPurchaseHistory = ({navigation, route}) => {
  let {params} = route;
  console.log(navigation);
  return (
    <LinearGradient
      colors={['#91C7D6', '#CBE2DC']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 0.15}}
      style={{flex: 1}}>
      <HeaderCompnent
        onPerssDrawer={() => navigation.openDrawer()}
        onPressLeftBtn={() => navigation.goBack()}
      />
      <ContainerStyled>
        <BoldLabelTitle
          text={'주문내역 상세'}
          style={{marginTop: 27.5, marginHorizontal: 30, marginBottom: 55}}
        />
        <ScrollView
          contentContainerStyle={{paddingBottom: 28}}
          style={{
            backgroundColor: '#fff',
            elevation: 3,
            flex: 1,
          }}>
          <RowView
            style={{
              height: 55,
              backgroundColor: '#F9F9F9',
              justifyContent: 'space-between',
              paddingHorizontal: 24,
            }}>
            <NormalLabel14 text={'주문 일자'} style={{color: '#000'}} />
            <NormalLabel14 text={params?.createdAt} style={{color: '#000'}} />
          </RowView>
          <View style={{paddingHorizontal: 24}}>
            <Title style={{marginTop: 26}}>상품 정보</Title>
            <RowView style={{marginTop: 14}}>
              <ProductImage
                source={require('../../asssets/Data/testProduct.png')}
              />
              <View style={{flex: 1}}>
                <NormalLabel14
                  style={{color: '#000', flex: 1}}
                  text={`[${params?.brand}] ${params?.title}`}
                />
                <NormalLabel14
                  text={params?.price?.toLocaleString() + ' 원'}
                  style={{color: '#000000'}}
                />
              </View>
            </RowView>
            <Title style={{marginTop: 50}}>배송지 정보</Title>
            <RowView style={{marginBottom: 25, marginTop: 22}}>
              <ProductTitle>받는분</ProductTitle>
              <Subtitle>{params?.receiver}</Subtitle>
            </RowView>
            <RowView style={{marginBottom: 25}}>
              <ProductTitle>연락처</ProductTitle>
              <Subtitle>{PhoneNumberConvert(params?.phoneNumber)}</Subtitle>
            </RowView>
            <RowView style={{marginBottom: 25, alignItems: 'flex-start'}}>
              <ProductTitle>배송지</ProductTitle>
              <Subtitle>{params?.address}</Subtitle>
            </RowView>
            <RowView>
              <ProductTitle>요청사항</ProductTitle>
              <Subtitle>1층 경비실에 맡겨주세요.</Subtitle>
            </RowView>
            <Title style={{marginTop: 50}}>결제 정보</Title>
            <RowView style={{marginTop: 25}}>
              <ProductTitleBlack>상품가격</ProductTitleBlack>
              <Subtitle style={{textAlign: 'right', color: '#000000'}}>
                {params?.price?.toLocaleString() + ' 원'}
              </Subtitle>
            </RowView>
            <RowView style={{marginVertical: 10}}>
              <Reply
                source={require('../../asssets/images/reply.png')}
                resizeMode={'contain'}
              />
              <ProductTitle>배송비</ProductTitle>
              <SubtitleGray style={{textAlign: 'right'}}>
                {params?.shippingFee === null
                  ? '무료배송'
                  : params?.shippingFee?.toLocaleString() + ' 원'}
              </SubtitleGray>
            </RowView>
            <RowView
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#C4C4C4',
                paddingBottom: 30,
                marginBottom: 27,
              }}>
              <Reply
                source={require('../../asssets/images/reply.png')}
                resizeMode={'contain'}
              />
              <ProductTitle style={{width: 'auto'}}>포인트사용</ProductTitle>
              <SubtitleGray style={{textAlign: 'right'}}>
                {'- ' + params?.usedPoint?.toLocaleString() + ' KSP'}
              </SubtitleGray>
            </RowView>

            <RowView style={{marginBottom: 17}}>
              <NormalLabel14
                text={'최종 결제금액'}
                style={{width: 'auto', color: '#000'}}
              />
              <BoldLabel18
                text={params?.totalPrice?.toLocaleString() + ' 원'}
                style={{flex: 1, textAlign: 'right', color: '#46A0BD'}}
              />
            </RowView>
            <RowView>
              <ProductTitle style={{width: 'auto'}}>적립 포인트</ProductTitle>
              <Subtitle style={{textAlign: 'right'}}>
                {params?.awardPoint?.toLocaleString() + ' KSP'}
              </Subtitle>
            </RowView>
            <DeliveryTrackingButton
              style={{marginTop: 39}}
              t_code={params?.deliveryCode}
              t_invoice={params?.invoiceNumber}
            />
            {/*<SearchButton*/}
            {/*  style={{marginTop: 39}}*/}
            {/*  onPress={() => {*/}
            {/*    navigation.navigate('DeliveryTracking');*/}
            {/*  }}>*/}
            {/*  <BoldLabelSubTitle*/}
            {/*    text={'배송 조회'}*/}
            {/*    style={{textAlign: 'center', color: '#94D2E9'}}*/}
            {/*  />*/}
            {/*</SearchButton>*/}
          </View>
        </ScrollView>
      </ContainerStyled>
    </LinearGradient>
  );
};

export default DetailPurchaseHistory;
