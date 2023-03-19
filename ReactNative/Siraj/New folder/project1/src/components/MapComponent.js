import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {Platform, Image } from 'react-native';
import carImageIcon from '../../assets/images/available_car.jpg';
import redp from '../../assets/images/rsz_2red_pin.png';

const styles = [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#8cb1b9"
            }
        ]
    },
    // {
    //     "featureType": "all",
    //     "elementType": "geometry.fill",
    //     "stylers": [
    //         {
    //             "visibility": "on"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "administrative",
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //         {
    //             "color": "#01d298"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "administrative.locality",
    //     "elementType": "all",
    //     "stylers": [
    //         {
    //             "visibility": "on"
    //         },
    //         {
    //          "color": "#75a2ab"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "administrative.locality",
    //     "elementType": "geometry",
    //     "stylers": [
    //         {
    //             "visibility": "on"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "administrative.locality",
    //     "elementType": "geometry.fill",
    //     "stylers": [
    //         {
    //             "visibility": "on"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "administrative.locality",
    //     "elementType": "geometry.stroke",
    //     "stylers": [
    //         {
    //             "visibility": "on"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "administrative.locality",
    //     "elementType": "labels",
    //     "stylers": [
    //         {
    //             "visibility": "on"
    //         }
    //     ]
    // },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#FFFFFF"
            }
        ]
    },
    // {
    //     "featureType": "landscape.man_made",
    //     "elementType": "all",
    //     "stylers": [
    //         {
    //             "visibility": "off"
    //         },
    //         {
    //             "color": "#b6b6b6"
    //         }
    //     ]
    // },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#8cb1b9"
            }
        ]
    },
    // {
    //     "featureType": "landscape.natural.terrain",
    //     "elementType": "all",
    //     "stylers": [
    //         {
    //             "visibility": "off"
    //         },
    //         {
    //             "color": "#8cb1b9"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "poi",
    //     "elementType": "all",
    //     "stylers": [
    //         {
    //             "visibility": "on"
    //         }
    //     ]
    // },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#01d298"
            }
        ]
    },
    // {
    //     "featureType": "poi",
    //     "elementType": "geometry.fill",
    //     "stylers": [
    //         {
    //             "visibility": "on"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "poi",
    //     "elementType": "labels",
    //     "stylers": [
    //         {
    //             "visibility": "on"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "poi",
    //     "elementType": "labels.text",
    //     "stylers": [
    //         {
    //             "visibility": "on"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "poi",
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //         {
    //             "visibility": "on"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "poi.attraction",
    //     "elementType": "geometry",
    //     "stylers": [
    //         {
    //             "visibility": "off"
    //         },
    //         {
    //             "hue": "#8cb1b9"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "poi.attraction",
    //     "elementType": "geometry.fill",
    //     "stylers": [
    //         {
    //             "visibility": "on"
    //         },
    //         {
    //             "color": "#8cb1b9"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "poi.business",
    //     "elementType": "all",
    //     "stylers": [
    //         {
    //             "visibility": "on"
    //         },
    //         {
    //             "hue": "#ff0000"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "poi.government",
    //     "elementType": "all",
    //     "stylers": [
    //         {
    //             "visibility": "on"
    //         },
    //         {
    //             "hue": "#ff0000"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "poi.place_of_worship",
    //     "elementType": "all",
    //     "stylers": [
    //         {
    //             "visibility": "on"
    //         },
    //         {
    //             "hue": "#ff0000"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "poi.place_of_worship",
    //     "elementType": "geometry.fill",
    //     "stylers": [
    //         {
    //             "visibility": "on"
    //         },
    //         {
    //             "hue": "#ff0000"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "poi.school",
    //     "elementType": "all",
    //     "stylers": [
    //         {
    //             "visibility": "off"
    //         },
    //         {
    //             "hue": "#ff0000"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "poi.sports_complex",
    //     "elementType": "all",
    //     "stylers": [
    //         {
    //             "visibility": "on"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "road",
    //     "elementType": "all",
    //     "stylers": [
    //         {
    //             "saturation": -100
    //         },
    //         {
    //             "lightness": 45
    //         }
    //     ]
    // },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": "-22"
            },
            {
                "lightness": "30"
            },
            {
                "gamma": "2.26"
            },
            {
                "visibility": "on"
            },
            {
                "color": "#d5d8db"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#fad2b9"
            }
        ]
    },
    // {
    //     "featureType": "road.arterial",
    //     "elementType": "geometry.fill",
    //     "stylers": [
    //         {
    //             "visibility": "off"
    //         },
    //         {
    //             "color": "#ff0000"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "road.arterial",
    //     "elementType": "labels.icon",
    //     "stylers": [
    //         {
    //             "visibility": "off"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "transit",
    //     "elementType": "all",
    //     "stylers": [
    //         {
    //             "visibility": "off"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "water",
    //     "elementType": "all",
    //     "stylers": [
    //         {
    //             "color": "#01d298"
    //         },
    //         {
    //             "visibility": "on"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "water",
    //     "elementType": "geometry.fill",
    //     "stylers": [
    //         {
    //             "visibility": "on"
    //         },
    //         {
    //             "color": "#c0dfe7"
    //         }
    //     ]
    // }
]

export default class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
        
    render() {
    const { mapRegion, markerCord, mapStyle,nearby, onRegionChange, markerRef } = this.props;
       var showsUserLocation = Platform.OS=='ios'? true:false;
        return (
            <MapView
                provider={PROVIDER_GOOGLE}
                showsUserLocation={showsUserLocation}
                
                // {
                                // Platform.OS=='ios' ?
                                //     <ImageBackground source={require('../../assets/images/dash.png')}
                                //         style={styles.backgroundImage}
                                //         resizeMode= {Platform.OS=='ios'?'repeat':'stretch'}>
                                //     </ImageBackground>
                                //     :
                                //     <Dash style={styles.dashView}/>
                                // }
              
                customMapStyle = {styles}
                followUserLocation={true}
                loadingEnabled
                showsMyLocationButton={true}
                style={[mapStyle,{ marginBottom: this.state.marginBottom }]}
                region={mapRegion}
                onRegionChange={onRegionChange}
                onMapReady={() => this.setState({ marginBottom: 1 })}
        //          showsCompass={true}
        // toolbarEnabled={true}
        // zoomEnabled={true}
        // rotateEnabled={true}
            >
            
                <Marker.Animated
                    ref={markerRef}
                    coordinate={{latitude: markerCord.droplatitude?markerCord.droplatitude:markerCord.wherelatitude, longitude: markerCord.droplongitude?markerCord.droplongitude:markerCord.wherelongitude}}
                >
                 <Image
                            source={redp}
                            style={{height:40,width:40}}
                        />
                    </Marker.Animated>
             {nearby?nearby.map((item,index)=>{
                return (
                    <Marker.Animated
                    coordinate={{latitude: item.location?item.location.lat:0.00, longitude: item.location?item.location.lng:0.00}}
                    key = {index}
                    >
                 <Image
                            source={carImageIcon}
                            style={{height:40,width:40}}
                        />
                    </Marker.Animated>
                )
             })
            :null}
             
            </MapView>
        );
    }
}
