import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import { colors } from '../common/theme';
import  languageJSON  from '../common/language';
import { Currency } from '../common/CurrencySymbol';
import { Avatar, Box, Button, Image, Pressable, Text } from 'native-base';


export default class RideList extends React.Component {

    constructor(props) {
        super(props);
    }

    onPressButton(item, index) {
        const { onPressButton } = this.props;
        onPressButton(item, index)
    }

    //flatlist return function
    newData = ({ item, index }) => {
        const { onPressButton } = this.props;
        return (
            <TouchableOpacity style={styles.iconClickStyle} onPress={() => this.onPressButton(item, index)}>
                <Box flex={1} bg={'#fff'}>
       
            <Box
                bg={'#fff'} shadow={3} p={8} m={5}
                borderColor={'#fff'} borderWidth={1} borderRadius={8}
            >
                <Box
                    flexDir={'row'} mb={1}
                >
                    {/* avatar */}
                   
                    {/* info */}
                    <Box
                    >
                        <Box flexDir={'row'} alignItems={'center'}>
                            <Text
                                fontSize={15} fontWeight={'700'} lineHeight={28} color={'#a3a3a3'}
                                textTransform={'uppercase'}
                            >{item.requestTime}</Text>
                            <Box ml={3} mr={1} mt={1} w={1.5} h={1.5} bg={'#a3a3a3'} borderRadius={5} ></Box>
                            <Text
                                fontSize={15} fontWeight={'700'} lineHeight={28} color={'#a3a3a3'}
                                textTransform={'uppercase'}
                            >{item.bookingDate ? item.bookingDate : ''}</Text>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box flexDir={'row'} alignItems={'center'} my={2}>
                        <Box w={'10%'} mr={2} alignItems={'center'}>
                            <Image
                                source={require('../../assets/images/Layer21.png')}
                                alt={'money_icon'}
                            />
                        </Box>
                        <Text
                            fontSize={15} fontWeight={'400'} lineHeight={22} color={'#a3a3a3'}
                        >{item.pickup ? item.pickup.add : languageJSON.not_found_text}</Text>
                    </Box>
                    <Box flexDir={'row'} alignItems={'center'} my={2}>
                        {/* <Text
                            fontSize={15} fontWeight={'400'} lineHeight={22} color={'#a3a3a3'}
                        >Title</Text> */}
                        <Text
                            fontSize={15} fontWeight={'400'} lineHeight={22} color={'#a3a3a3'}
                        
                        >{item.title? item.title : item.description}</Text>
                    </Box>
                    <Box flexDir={'row'} alignItems={'center'} my={2}>
                        <Text
                            fontSize={15} fontWeight={'400'} lineHeight={22} color={'#a3a3a3'}
                        >Status</Text>
                        <Button
                            bg={'#F9DCF8'} ml={5} px={5}
                            
                            _text={{
                                color: '#B578B4',
                                fontSize: 12,
                                lineHeight: 15,
                                textAlign: 'center',
                                textTransform: 'uppercase'
                            }}
                            _pressed={{
                                bg: '#F9DCF8'
                            }}
                        
                        >{item.status}</Button>
                    </Box>
                  
                </Box>
            </Box>
        </Box>
              
              
             
            </TouchableOpacity>
        )
    }

    render() {
        const { data } = this.props

        return (
            <View style={styles.textView3}>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={data}
                    renderItem={this.newData}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 18,
    },
    fareStyle: {
        fontSize: 18,
        flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    offerStyle: {
        fontSize: 15,
        flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      color:"#A9A9A9"
    },
    carNoStyle: {
        marginLeft: 45,
        fontSize: 13,
        marginTop: 10
    },
    picupStyle: {
        flexDirection: 'row',
        marginBottom:10
    },
    picPlaceStyle: {
        color: colors.GREY.secondary
    },
    dropStyle: {
        flexDirection: 'row',
    },
    drpIconStyle: {
        color: colors.RED,
        fontSize: 20
    },
    dropPlaceStyle: {
        color: colors.GREY.secondary
    },
    greenDot: {
        alignSelf: 'center',
        borderRadius: 10,
        width: 10,
        height: 10,
        backgroundColor: colors.GREEN.default,
        marginBottom:10
    },
    redDot: {
        borderRadius: 10,
        width: 10,
        height: 10,
        backgroundColor: colors.RED

    },
    logoStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconClickStyle: {
        flex: 1,
        flexDirection: 'row'
    },
    flexViewStyle: {
        flex: 7,
        flexDirection: 'row',
        borderBottomColor: colors.GREY.secondary,
        borderBottomWidth: 1,
        marginTop: 10,
        marginLeft: 5
    },
    dateStyle: {
        fontFamily: 'Roboto-Bold',
        color: colors.GREY.default
    },
    offersStyle:{
        fontFamily: 'Roboto-Bold',
        color: colors.GREY.default,
        fontSize: 15
    },
    carNoStyle: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        marginTop: 8,
        color: colors.GREY.default
    },
    placeStyle: {
        marginLeft: 10,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        alignSelf: 'center'
    },
    textViewStyle: {
        marginTop: 10,
        marginBottom: 10
    },
    cancelImageStyle: {
        width: 50,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start'
        // marginRight: 20,
        // marginTop: 18,
    //     alignSelf:'flex-start',
    //    borderWidth:1,
    //    borderColor:colors.BLACK,
   
        
    },
    iconViewStyle: {
         marginTop: 10, marginLeft:10
    },
    textView1: {
        flex: 5
    },
    textView2: {
        flex: 2,
        textAlign: 'right', alignSelf: 'stretch'
       
    },
    textView3: {
        flex: 1
    },
    position: {
        marginTop: 20
    },
    textPosition: {
        alignSelf: 'center'
    },
    editIconContainer: {
         marginLeft:20
    }
});