<View className="link-bottom">
<View className="container">
  <View className="row">
    <View className="col-lg-12 col-xs-12 col-sm-12">
      <ul>
        <li><a href="#"><Image src="img/Icon - Category.png" alt="" /></a></li>
        <li><a href="#"><Image src="img/Icon - Description.png" alt="" /></a></li>
        <li className="active"><a href="#"><Image src="img/Icon - Time.png" alt="" /></a></li>
        <li><a href="#"><Image src="img/Icon - 24 - Pin.png" alt="" /></a></li>
        <li><a href="#"><Image src="img/Icon - Price.png" alt="" /></a></li>
      </ul>
    </View>	
  </View>	
</View>	
<a href="#" className="tick-new">
  <View className="tableRow">
    <View className="tableCell">
      <img src="img/Icon  - Check.png" alt="" />
    </View>
  </View>
</a>
</View>


<ScrollView style={styles.scrollViewStyle}>
{/* <View style={styles.logo}>
    <Image source={require('../../assets/images/logo.png')} />
</View> */}
<KeyboardAvoidingView behavior={Platform.OS=='ios'?"padding":"padding"} style={styles.form}> 
    <View style={styles.containerStyle}>
        <Text style={styles.headerStyle}>{languageJSON.open_request_title}</Text>
        <View style={styles.newViewStyle}>
<View style={styles.myViewStyle}>
    <View style={styles.iconViewStyle}>
        <Icon
            name='envelope-letter'
            type='simple-line-icon'
            color={colors.GREY.btnPrimary}
            size={30}
        />
        <Text style={styles.emailStyle}>{languageJSON.request_title_placeholder}</Text>
        
    </View>
    <View>
    <Input
                ref={input => (this.fnameInput = input)}
                editable={true}
                underlineColorAndroid={colors.TRANSPARENT}
                placeholder={languageJSON.first_name_placeholder}
                placeholderTextColor={colors.GREY.secondary}
                value={this.state.fname}
                keyboardType={'email-address'}
                inputStyle={styles.inputTextStyle}
                onChangeText={(text)=>{this.setState({fname: text})}}
                errorMessage={this.state.fnameValid ? null : languageJSON.first_name_blank_error}
                secureTextEntry={false}
                blurOnSubmit={true}
                onSubmitEditing={() => { this.validateFirstName(); this.lnameInput.focus()}}
                errorStyle={styles.errorMessageStyle}
                inputContainerStyle={styles.inputContainerStyle}
                containerStyle={styles.textInputStyle}
            />
    </View>

</View>

<View style={styles.myViewStyle}>
    <View style={styles.iconViewStyle}>
        <Icon
            name='envelope-letter'
            type='simple-line-icon'
            color={colors.GREY.btnPrimary}
            size={30}
        />
        <Text style={styles.emailStyle}>{languageJSON.request_title_placeholder}</Text>
        
    </View>
    <View>
    <Dropdown

data={data}
/>
    </View>

</View>


<View style={styles.myViewStyle}>
    <View style={styles.iconViewStyle}>
        <Icon
            name='globe'
            type='simple-line-icon'
            color={colors.GREY.btnPrimary}
        />
        <Text style={styles.text1}>{languageJSON.location_lebel}</Text>
    </View>
    <View style={{flex:1}}>
        <Text style={styles.text2}>{this.state.tempAddress}</Text>
    </View>
    <View>
    <TouchableOpacity onPress={()=>{navigate('Search',{from:"where",whereText:this.state.whereText,dropText:'',old:'' , back: "openRequest"});}} style={styles.contentStyle}>
<View style={styles.textIconStyle}>
<Text numberOfLines={1} style={styles.textStyle}>{this.state.whereText}</Text>
    <Icon
        name='gps-fixed'
        color={colors.WHITE}
        size={23}
        containerStyle={{flex:1}}
    />
</View>
</TouchableOpacity>
    </View>
</View>

<View style={styles.myViewStyle}>
    <View style={styles.iconViewStyle}>
        <Icon
            name='globe'
            type='simple-line-icon'
            color={colors.GREY.btnPrimary}
        />
        <Text style={styles.text1}>{languageJSON.request_details_lebel}</Text>
    </View>
    <View style={{flex:1}}>
        <Text style={styles.text2}>{this.state.tempAddress}</Text>
    </View>
    <View>
  
    </View>
</View>

<View style={styles.myViewStyle}>

<StepIndicator
customStyles={customStyles}
currentPosition={this.state.currentPosition}
labels={labels}
/>
</View>
</View>

<View style={styles.buttonContainer}>
            <Button
                onPress={()=>{this.onPressRegister()}}
                title={languageJSON.open_request_button}
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.registerButton}
            />
        </View> 
        <View style={styles.gapView}/>
    </View>
</KeyboardAvoidingView>
</ScrollView>
