import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

function Drawer() {
  const [subListView, setSubListView] = useState();
  const navigation = useNavigation();

  const [itemList, setItemList] = useState([
    {
      value: 'Home',
      subList: false,
      action: 'Home',
    },
    {
      value: 'Tax Calculator 2020-21',
      subList: false,
      action: 'Tax Calculator',
    },
    {
      value: 'Tax Calculator 2021-22',
      subList: false,
      action: 'Tax Calculator',
    },
    {
      value: 'Tax Slabs 2021-22',
      subList: false,
      action: 'TaxSlabs2021',
    },
    {
      value: 'Documents',
      subList: false,
      action: 'Documents',
    },
    {
      value: 'Useful Links',
      subList: false,
      action: 'UsefulLinks',
    },
    {
      value: 'Inquiry',
      subList: false,
      action: 'Inquiry',
    },
    {
      value: 'Rate Us',
      subList: false,
      action: 'RateUs',
    },
    {
      value: 'Share App',
      subList: false,
      action: 'ShareApp',
    },
    {
      value: 'Disclaimer',
      subList: false,
      action: 'Disclaimer',
    },
  ]);
  const [subItemList, setSubItemList] = useState([
    {
      value: '- Salaried',
      action: 'Salaried',
    },
    {
      value: '- Non Salaried',
      action: 'NonSalaried',
    },
    {
      value: '- Rental Income',
      action: 'RentalIncome',
    },
    {
      value: '- Capital Gain',
      action: 'CapitalGain',
    },
  ]);
  const SubItems = () => {
    return (
      <FlatList
        data={subItemList}
        renderItem={item => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate(item.item.action)}
              style={styles.subItemContainer}>
              <Text style={styles.subItemText}>{item.item.value}</Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const Item = ({title, index}) => (
    <>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          if (index == 2 || index == 1) {
            title.subList = !title.subList;
            setItemList([...itemList]);
          } else {
            navigation.navigate(title.action);
            // setItemList([...itemList]);
            console.log(title);
          }
        }}>
        <Text style={styles.itemText}>{title.value}</Text>
      </TouchableOpacity>
      {title.subList ? <SubItems /> : ''}
    </>
  );
  return (
    <View style={styles.drawer}>
      <Icon.Button
        name="user"
        size={100}
        color="#2D3F61"
        backgroundColor="#F1F3F4"
        style={{
          flexDirection: 'column',
          marginBottom: 20,
        }}>
        <Text style={styles.text}>USER NAME</Text>
        <Text style={styles.text}>username@gmail.com</Text>
      </Icon.Button>
      <View
        style={{
          height: 20,
        }}></View>
      <FlatList
        data={itemList}
        renderItem={item => {
          return <Item title={item.item} index={item.index} />;
        }}
      />
    </View>
  );
}

export default Drawer;

const styles = StyleSheet.create({
  drawer: {
    height: '100%',
    backgroundColor: '#2D3F61',
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
  itemContainer: {
    borderBottomColor: '#ffff',
    borderBottomWidth: 2,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  itemText: {
    color: '#ffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subItemContainer: {
    borderBottomColor: '#2D3F61',
    backgroundColor: 'white',
    borderBottomWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  subItemText: {
    color: '#2D3F61',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
