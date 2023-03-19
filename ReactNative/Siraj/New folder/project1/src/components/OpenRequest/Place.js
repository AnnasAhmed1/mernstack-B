import React, { Component } from "react";
import {
  Platform,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { colors } from "../../common/theme";
import RequestHeader from "./Header";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { google_map_key } from "../../common/key";
import { Icon } from "react-native-elements";

export default class Place extends Component {
  constructor(props) {
    super(props);

   // var header = "Service Delivery Address";
   var header = "Your Location";
    // if(this.props.isDating)
    //   header = "My Location";
    this.state = {
      place: {},
      listViewDisplayed: "auto",
      placesList: [],
      latitude: "",
      longitude: "",
      country: this.props.country,
      headerText: header
    };

    this.submit = this.submit.bind(this);
  }

  _getLocationAsync = async () => {
  
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
    }
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    if (location) {
      
      var pos = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      this.setState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (pos) {
        this.getDetailsBylatandLng(pos.latitude, pos.longitude)
      }
    }
  };


  getCountryDetailsByPlaceID(placeid){
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeid}&fields=name,rating,address_component,adr_address,business_status,formatted_address,geometry,icon,name,photo,place_id,plus_code,type,url,utc_offset,vicinity,formatted_phone_number,international_phone_number,opening_hours,website,price_level,rating,review,user_ratings_total&key=${google_map_key}`
    )
      .then((rs) => rs.json())
      .then((data) => {
      const country =this.getCountry(data.result)?.country;
      let place  = data.result;
      place.country = country;
      this.setState({country, country})
        this.props.onAdd(place);
        this.props.setLocationName(
          data.result.formatted_address ||
            data.result.description ||
            data.result.name
        );
         this.setState({
            place:data.result.place_id
          });
      });
  }
  

  getDetailsBylatandLng(latitude,longitude)
  {
    let latlng = latitude + "," + longitude;
    return fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        latlng +
        "&key=" +
        google_map_key
    )
      .then((response) => response.json())
      .then((responseJson) => {
       // console.log(getCountry(responseJson.results[0]));
        fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${responseJson.results[0].place_id}&fields=name,rating,address_component,adr_address,business_status,formatted_address,geometry,icon,name,photo,place_id,plus_code,type,url,utc_offset,vicinity,formatted_phone_number,international_phone_number,opening_hours,website,price_level,rating,review,user_ratings_total&key=${google_map_key}`
        )
          .then((rs) => rs.json())
          .then((data) => {
          const country =this.getCountry(data.result)?.country;
          let place  = data.result;
          place.country = country;
          this.setState({country, country})
            this.props.onAdd(place);
            this.props.setLocationName(
              data.result.formatted_address ||
                data.result.description ||
                data.result.name
            );
             this.setState({
                place:data.result.place_id
              });
          });
      });
  }

  onchangeOfText = (val) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${val}&key=${google_map_key}&types=geocode`
    )
      .then((res) => res.json())
      .then((data) => {
         console.log(val);
        this.setState({ placesList: data.predictions });
      });
  };

  submit() {
    //debugger
    this.props.onStepSubmit(this.state.place);
  }

  getCountry(adresses) {
   
  const address_components = adresses.address_components;
  let components = {country: undefined};
  try{
  address_components.map((value, index) => {
    value.types.map((value2, index2) => {
      components[value2] = value.long_name;
     // console.log( value2)
      if (value2==='country')
        components.country_id = value.short_name;
      if (value2==='administrative_area_level_1')
        components.state_code = value.short_name;
    })
  })
  return components;
}
catch{

}
 // console.log(components)

  }
  

  componentDidMount() {
    if (this.props.locationName) {
      return;
    }
    this._getLocationAsync();
  }



  goMap(data, details, from) {
    // let recipesCopy = JSON.parse(JSON.stringify(this.state.recipes))
    console.log(details);
    this.setState({ place: details });
    this.setState({ listViewDisplayed: false });
  
  }
  render() {
    return (
      <View>
        <RequestHeader
          headerText={this.state.headerText}
          subHeaderText=""
        ></RequestHeader>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={{ width: "90%", flexDirection: "row" }}>
            <TextInput
              ref={(e) => (this.textinput = e)}
              placeholder="Search"
              style={{ width: "90%", fontSize: 17 }}
              value={this.props.locationName}
              onChangeText={(val) => {
                this.onchangeOfText(val);
                this.props.setLocationName(val);
              }}
            />

            <TouchableOpacity
              onPress={() => {
                this.props.setLocationName("");

                this.setState({ place: undefined });
              }}
            >
              <Icon name="circle-with-cross" type="entypo" color="lightgray" />
            </TouchableOpacity>
          </View>

          {this.state.placesList.length == 0 ? (
            <View style={{ width: "90%", marginTop: 20 }}>
              <TouchableOpacity
                onPress={() => {
                  this.textinput.focus();
                  this.props.setLocationName("");
                }}
              >
                <Text>change</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <View style={{ width: "90%", marginTop: 20, fontSize:17 }}>
            {this.state.placesList.map((item, i) => (
              <TouchableOpacity
                onPress={() => {
                  console.log(item)
                  // const country =this.getCountry(item)?.country;
                  // alert(country)
                  // let place  = item;
                  // place.country = country;
                  //this.props.onAdd(place);
                
                  this.getCountryDetailsByPlaceID(item.place_id)
                  this.props.setLocationName(item.description);

                  this.setState({
                    placesList: [],
                    place:item.place_id
                  });
                }}
                key={i}
                style={{
                  color: '#9f9f9f',
                  backgroundColor: colors.WHITE,
                  fontSize:17,
                  marginTop: 10,
                  paddingTop: 10,
                }}
              >
                <Text style={{  fontSize:17 }}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* <GooglePlacesAutocomplete
          ref={(ref) => {
            this.place = ref;
          }}
          placeholder="Search"
          minLength={2} // minimum length of text to search
          autoFocus={true}
          returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed={this.state.listViewDisplayed} // true/false/undefined
          fetchDetails={true}
          renderDescription={(row) => row.description} // custom description render
          textInputProps={{ clearButtonMode: "while-editing" }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            this.goMap(data, details);
          }}
          value={this.state.place}
          getDefaultValue={() => ""}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: google_map_key,
            language: "en", // language of the results
            // types: '(cities)' // default: 'geocode'
            // components: "country:ng", // country name
          }}
          styles={{
            container: {
              marginTop:
                Platform.OS == "android" ? StatusBar.currentHeight : 44,
              backgroundColor: colors.WHITE,
            },
            textInputContainer: {
              width: "100%",
              backgroundColor: colors.WHITE,
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            description: {
              fontWeight: "bold",
            },
            listView: {
              color: colors.BLACK,
              backgroundColor: colors.WHITE,
              borderTopColor: colors.WHITE,
            },
            description: {
              color: colors.BLACK,
              //backgroundColor: colors.WHITE,
            },
            predefinedPlacesDescription: {
              color: colors.BLACK,
              backgroundColor: colors.WHITE,
            },
          }}
          renderDescription={(row) =>
            row.description || row.formatted_address || row.name
          }
          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="change"
          nearbyPlacesAPI="GoogleReverseGeocoding" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            key: google_map_key,
            language: "en",
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: "distance",
            types: "establishment",
          }}
          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        /> */}
      </View>
    );
  }
}