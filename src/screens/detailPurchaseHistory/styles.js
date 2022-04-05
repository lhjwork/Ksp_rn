import styled from 'styled-components/native';

export const Title = styled.Text`
  flex: 1;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  color: #000000;
  border-bottom-width: 1px;
  border-color: #c4c4c4;
  padding-bottom: 10px;
`;
export const ProductImage = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 10px;
  margin-right: 16px;
`;
export const ProductTitle = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  width: 60px;
`;

export const ProductTitleBlack = styled(ProductTitle)`
  color: #000000;
`;
export const Subtitle = styled(ProductTitle)`
  color: #000000;
  flex: 1;
  margin-left: 24px;
`;
export const SubtitleGray = styled(Subtitle)`
  color: #777777;
`;
export const Reply = styled.Image`
  width: 4px;
  height: 4px;
  margin-right: 5px;
`;
