import React from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';

const ProductDetail = ({navigation, route}) => {
  console.log(route.params, 'props');
  const {title, description, image, price} = route.params.element;

  return (
    <View style={productDetail.mainContainer}>
      <Text style={productDetail.heading}>{title}</Text>
      <Image style={productDetail.image} source={{uri: image}} />
      <Text style={productDetail.text}>Description: {description}</Text>
      <Text style={productDetail.price}>PKR {price}/- only</Text>
      <Button title="ADD TO CART" />
    </View>
  );
};

export default ProductDetail;

const productDetail = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    height: '100%',
    paddingHorizontal: '5%',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginVertical: 15,
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    color: 'black',
    fontSize: 18,
  },
  price: {
    color: '#F85606',
    fontSize: 20,
    marginVertical: 10,
  },
});
