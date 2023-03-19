/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';



/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */


const App: () => Node = () => {


  return (
    <>
      <ScrollView>

        <View style={{
          backgroundColor: 'black',
          width: "100%",
          height: "100%",
          // flex: 1,
          // justifyContent: "center",
          alignItems: "center"
        }
        }>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center"
            }} >
            <Text style={{ textAlign: "center", color: 'red', fontWeight: 'bold', fontSize: 25, padding: "5%" }}>INSTANT PAY</Text>


            {/* <Text style={{ color: "white" }}>Hello World</Text> */}
            < View style={{ position: 'relative' }}>
              <Image source={require('./Assets/cloud.png')} />
            </View>
            <View style={{ position: 'absolute' }}>
              <Image source={require('./Assets/spark.png')} />
            </View>
          </View>


        </View >

        <TouchableOpacity style={{ color: "white", width: "50%", backgroundColor: "#4D5DFA", marginTop: 10 }}>
          <Text style={{ textAlign: "center", color: 'red', fontWeight: 'bold', fontSize: 25, padding: "5%" }}>INSTANT PAY</Text>
        </TouchableOpacity>
      </ScrollView>

    </>


  );
};



export default App;
