import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, FlatList, Button, TouchableOpacity } from 'react-native';
import { Dimensions } from "react-native";


const History = (props) => {

    const [isDeleting, setIsDeleting] = useState(false);

    const deleteItem = (i) => {
       props.setCalculation(() => props.calculation.filter( (item) => {
            return item.key != i;
       }

       ));
    }

    const handler = () => {
        setIsDeleting(true);
    }

    const confirmHistoryDelete = (
        <View style = {styles.historyDeleteConfirm}>
            <View style={{padding: 20, backgroundColor: 'white'}}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>Are you Sure?</Text>
                <View style={{display: 'flex', flexDirection: 'column'}}>
                    <TouchableOpacity style={{marginVertical: 10}}>
                        <Button title="Yes" onPress={() =>{
                            props.setCalculation([]);
                            setIsDeleting(false);
                        }}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Button title="No" onPress={() => {
                            setIsDeleting(false);
                        }}/>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </View>
    )

    return(
        <>
       
       {isDeleting?confirmHistoryDelete:<></>}

        <StatusBar barStyle="light-content" />
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity style={{marginVertical: 20, alignSelf: 'flex-end'}}>
                    <Button title="Clear History" onPress={handler}/>
                </TouchableOpacity>
                <View style={styles.table}>
                    <View style={styles.row}>
                        <Text style={{...styles.item, fontWeight: "bold"}}>Original Price</Text>
                        <Text style={{...styles.item, fontWeight: "bold", width: 10}}>-</Text>
                        <Text style={{...styles.item, fontWeight: "bold"}}>Discount%</Text>
                        <Text style={{...styles.item, fontWeight: "bold", width: 15}}>=</Text>
                        <Text style={{...styles.item, fontWeight: "bold"}}>Final Price</Text>
                    </View>

                    <ScrollView>
                        { props.calculation.map(( item ) => {
                            return(
                                <View style={styles.row} key={item.key}>
                                <TouchableOpacity style={{position: 'absolute', width: 30}}>
                                    <Button title="x" onPress = { () => deleteItem(item.key) }/>
                                </TouchableOpacity>
                                <Text style={styles.item}>{item.originalPrice}</Text>
                                <Text style={{...styles.item, fontWeight: "bold", width: 10}}>-</Text>
                                <Text style={styles.item}>{item.discountPercentage}</Text>
                                <Text style={{...styles.item, fontWeight: "bold", width: 15}}>=</Text>
                                <Text style={styles.item}>{item.discountedPrice}</Text>
                            </View>
                            )
                        }) }
                    </ScrollView>

                </View>

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
        padding: 20
    },
    table: {
        display: 'flex',
        flexDirection: 'column'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 7
    },
    item: {
        // padding: 5,
        fontSize: 18,
        width: 110,
        textAlign: 'center'
    },

    historyDeleteConfirm: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(1,1,1, 0.8)',
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

});

export default History;