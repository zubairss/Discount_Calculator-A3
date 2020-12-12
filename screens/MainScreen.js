import React, { useState, useContext } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TextInput ,StatusBar, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const MainScreen = (props) => {
    const navigation = useNavigation();
    const [priceInputValue, setPriceInputValue ] = useState("");
    const [ discount, setDiscount ] = useState("");


    const handlePriceInput = (e) => {
       if(!( e[e.length-1] == "," || e[e.length-1] == "-" || e[e.length-1] == " " )){
           setPriceInputValue(e)
       }
    }

    const handleDiscount = (e) => {
        if(!(e > 100 || e[e.length-1] == "," || e[e.length-1] == "-" || e[e.length-1] == " ")) {
            setDiscount(e)
        }
    }

    const saveResults = () => {
        let originalPrice = priceInputValue;
        let discountedPrice =  originalPrice - ((discount / 100) * originalPrice);
        props.setCalculation(() => [...props.calculation, 
        {
            key: `${props.calculation.length + originalPrice + 9 + Math.floor(Math.random()*8)}`,
            originalPrice: originalPrice,
            discountedPrice: discountedPrice.toFixed(2),
            discountPercentage: discount
        }]);

        setPriceInputValue("");
        setDiscount("");
    }

    const saveButton = () => {
        if(!(priceInputValue == "" || discount == "")){
            return(
                <TouchableOpacity style={{width: 200, marginVertical: 30}}>
                     <Button 
                        title="Save Record"
                        onPress = {saveResults}
                     />
                 </TouchableOpacity>
            )
        } else {
            return(
                <TouchableOpacity style={{width: 200, marginVertical: 30}}>
                     <Button 
                        title="Save Record"
                        onPress = {saveResults}
                        disabled
                     />
                 </TouchableOpacity>
            )
        }
    }


    return(
        <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.historyButton}>
                    <Button title="History" 
                    onPress = { () => navigation.navigate('History') }
                    />
                 </TouchableOpacity>
                 
                 <View style={{display: "flex", flexDirection: "column", alignItems: "center", marginVertical: 20}}>
                     <Text style={{marginVertical: 10, fontWeight: 'bold', textTransform: 'uppercase', fontSize: 20}} >Original Price</Text>
                    <TextInput 
                        style = {styles.userInput}
                        keyboardType = "number-pad"
                        onChangeText = {handlePriceInput}
                        value = {priceInputValue}
                    />
                 </View>

                 <View style={{display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20}}>
                     <Text style={{marginVertical: 10, fontWeight: 'bold', textTransform: 'uppercase', fontSize: 20}} >Discount Percentage %</Text>
                    <TextInput 
                        style = {styles.userInput}
                        keyboardType = "number-pad"
                        onChangeText = {handleDiscount}
                        value = {discount}
                    />
                 </View>


                 <View style={{marginVertical: 20}}>
                    <Text style={{fontSize: 25}}><Text style={{fontWeight: 'bold', color: '#f4511e'}}>You Save: </Text>{(priceInputValue - (priceInputValue - ((discount / 100) * priceInputValue))).toFixed(2)} </Text>
                    <Text style={{fontSize: 25}}><Text style={{fontWeight: 'bold', color: '#f4511e'}}>Final Price: </Text>{(priceInputValue - ((discount / 100) * priceInputValue)).toFixed(2)} </Text>
                 </View>

                {saveButton()}

                <Text style={{fontWeight: 'bold', fontSize: 20}}>Zubair Shahid -- SP18-BCS-179</Text>

            </View>

                 

               
        </SafeAreaView>
        </>
    )    
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    historyButton: {
        alignSelf: 'flex-end',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    userInput: {
        width: 150,
        borderColor: 'gray',
        borderBottomWidth: 2,
        marginHorizontal: 10,
        textAlign: 'center',
        fontSize: 20
        
    }

});

export default MainScreen;