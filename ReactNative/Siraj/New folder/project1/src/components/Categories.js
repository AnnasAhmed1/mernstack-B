import { Box, Button, Image } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

const Categories = ({ category , hideIcon}) => {
    return (
        <Box flexDir={'row'} alignItems={'center'} my={2}>
            {!hideIcon?
            (<Box w={'10%'} mr={2} alignItems={'center'}>
                <Image
                    source={require('../../assets/images/7148740_category_variety_random_shuffle_icon.png')}
                    alt={'money_icon'}
                />
            </Box>):null}
            <Box flexDir={'row'} alignItems={'center'}>
                {category.map((ctg, _ind) => {
                    return (
                        <Button
                            key={_ind}
                            bg={'#d1fae5'}
                            px={3} py={1} 
                            mr={2}
                            borderRadius={16}
                            _text={{
                                color: '#07d29a',
                                fontSize: 10,
                                textAlign: 'center'
                            }}
                            _pressed={{
                                bg: '#d1fae5'
                            }}
                        >{ctg}</Button>
                    )
                })}
            </Box>
        </Box>
    );
}

const styles = StyleSheet.create({})

export default Categories;
