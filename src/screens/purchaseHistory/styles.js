import styled from 'styled-components/native';

export const ProductBox = styled.View`
  padding: 0px 20px 18px;
  background-color: #ffffff;
  border-radius: 5px;
  height: 218px;
  margin-bottom: 10px;
  elevation: 5;
`;
export const RowBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding-top: 12px;
`;
export const Date = styled.Text`
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
`;
export const DetailText = styled.Text`
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  color: #46a0bd;
  margin-right: 9.5px;
`;

export const RowBoxLine = styled(RowBox)`
  border-color: #e5e5e5;
  border-bottom-width: 1px;
  padding-bottom: 12px;
`;
export const ProductImage = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 10px;
  margin-right: 16px;
`;
export const SearchButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: #94d2e9;
  padding-vertical: 10px;
  margin-top: 14px;
`;
export const ProductName = styled.Text``;
export const Price = styled.Text``;
