import React, {useCallback, useRef} from 'react';
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
import ToastMsg from '../../components/toastMsg';

const DetailPurchaseHistory = ({navigation, route}) => {
  let {params} = route;
  const toastRef = useRef(null);
  const showToast = useCallback(() => {}, []);
  const showToastMsg = () => {
    showToast();
  };

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
            <NormalLabel14 style={{color: '#000'}} />
            <NormalLabel14 text={params?.createdAt} style={{color: '#000'}} />
          </RowView>
          <View style={{paddingHorizontal: 24}}>
            <Title style={{marginTop: 26}}>Product info</Title>
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
                  text={params?.price?.toLocaleString()}
                  style={{color: '#000000'}}
                />
              </View>
            </RowView>
            <Title style={{marginTop: 50}}>shipping info</Title>
            <RowView style={{marginBottom: 25, marginTop: 22}}>
              <Subtitle>{params?.receiver}</Subtitle>
            </RowView>
            <RowView style={{marginBottom: 25}}>
              <Subtitle>{PhoneNumberConvert(params?.phoneNumber)}</Subtitle>
            </RowView>
            <RowView style={{marginBottom: 25, alignItems: 'flex-start'}}>
              <Subtitle>{params?.address}</Subtitle>
            </RowView>
            <RowView>
              <Subtitle>{params?.memo}</Subtitle>
            </RowView>

            <RowView style={{marginTop: 25}}>
              <Subtitle style={{textAlign: 'right', color: '#000000'}}>
                {params?.price?.toLocaleString()}
              </Subtitle>
            </RowView>
            <RowView style={{marginVertical: 10}}>
              <Reply
                source={require('../../asssets/images/reply.png')}
                resizeMode={'contain'}
              />
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

              <SubtitleGray style={{textAlign: 'right'}}>
                {'- ' + params?.usedPoint?.toLocaleString() + ' KSP'}
              </SubtitleGray>
            </RowView>

            <RowView style={{marginBottom: 17}}>
              <NormalLabel14 style={{width: 'auto', color: '#000'}} />
              <BoldLabel18
                text={params?.totalPrice?.toLocaleString() + ' 원'}
                style={{flex: 1, textAlign: 'right', color: '#46A0BD'}}
              />
            </RowView>
            <RowView>
              <Subtitle style={{textAlign: 'right'}}>
                {params?.awardPoint?.toLocaleString() + ' KSP'}
              </Subtitle>
            </RowView>
            <DeliveryTrackingButton
              style={{marginTop: 39}}
              t_code={params?.deliveryCode}
              t_invoice={params?.invoiceNumber}
              showToastMsg={showToastMsg}
            />
          </View>
        </ScrollView>
        <View>
          <ToastMsg ref={toastRef} />
        </View>
      </ContainerStyled>
    </LinearGradient>
  );
};

export default DetailPurchaseHistory;
