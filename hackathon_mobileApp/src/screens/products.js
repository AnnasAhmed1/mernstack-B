// import React, {useEffect, useState} from 'react';
// import axios from 'axios';
// import firestore from '@react-native-firebase/firestore';
// import Icon from 'react-native-vector-icons/FontAwesome';

// import {
//   Image,
//   ScrollView,
//   Text,
//   View,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import {AppBar} from '@react-native-material/core';

// const Products = ({navigation, route}) => {
//   const [data, setData] = useState([]);
//   const userUid = 'ddsdsdsdsd';
//   const getData = async () => {
//     const url = 'https://fakestoreapi.com/products/';
//     try {
//       datac = await axios(url);
//       setData([...datac.data]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   let objToSend = {};

//   const setDataToCart = () => {
//     firestore()
//       .collection('Products')
//       .doc(userUid)
//       .set(objToSend)
//       .then(() => {
//         console.log('data added!', objToSend);
//       });
//   };
//   let title = '';

//   return (
//     <ScrollView>
//       <View style={productStyles.mainContainer}>
//         {data.length == 0 ? (
//           <Text>loading</Text>
//         ) : (
//           data.map((element, index) => {
//             {
//               title = element.title.split(' ');
//             }
//             return (
//               <TouchableOpacity
//                 onPress={() => {
//                   console.log('hitttt');
//                   navigation.navigate('ProductDetail', {element});
//                 }}
//                 key={index}
//                 style={productStyles.card}>
//                 <Image
//                   source={{uri: element.image}}
//                   style={productStyles.image}
//                 />
//                 <View style={productStyles.desc}>
//                   <Text style={productStyles.titleText}>
//                     {title[0] + ' ' + title[1] + ' ' + title[2]}
//                   </Text>
//                   <Text style={productStyles.price}>Rs.{element.price}</Text>
//                   <Icon size={20} style={productStyles.icon} name="cart-plus" />
//                   <TouchableOpacity
//                     onPress={() => {
//                       console.log(element, 'element');
//                       objToSend = element;
//                       setDataToCart();
//                     }}></TouchableOpacity>
//                 </View>
//               </TouchableOpacity>
//             );
//           })
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default Products;

// const productStyles = StyleSheet.create({
//   mainContainer: {
//     borderColor: 'white',
//     flex: 1,
//     backgroundColor: 'white',
//     justifyContent: 'space-between',
//     paddingHorizontal: '5%',
//     paddingVertical: '8%',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   card: {
//     alignItems: 'center',
//     width: '32%',
//     height: 180,
//     overflow: 'hidden',
//     marginBottom: 5,
//     shadowColor: '#DEDEDE',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.5,
//     shadowRadius: 4,

//     elevation: 2,
//   },
//   image: {
//     width: '100%',
//     height: 80,
//     resizeMode: 'contain',
//     marginVertical: 5,
//   },
//   desc: {
//     backgroundColor: '#F5F5F6',
//     width: '100%',
//     height: 100,
//     paddingVertical: 5,
//     position: 'relative',
//     paddingLeft: 10,
//     paddingRight: 20,
//   },
//   titleText: {
//     color: 'black',
//     fontSize: 15,
//     fontWeight: 500,
//     marginBottom: 2,
//   },
//   price: {
//     color: '#2D3F61',
//     fontSize: 17,
//     fontWeight: 600,
//     marginBottom: 2,
//   },
//   icon: {
//     position: 'absolute',
//     right: 10,
//     bottom: 15,
//   },
// });
