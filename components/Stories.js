import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import React from 'react'

const Stories = () => {
  return (
      <View style={{ marginBottom: 13,marginTop: 10 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>

              <View style={{ alignItems: 'center', }}>
                  <View style={{ marginLeft: 10, marginRight: 10 }}>
                      <View style={{ width: 65, height: 65, backgroundColor: 'white', borderRadius: 50, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "black", }}>
                          <Image style={styles.story} source={{ uri: 'https://lh3.googleusercontent.com/a-/AFdZucp-DpvRFsOhhrfN3AGspMsAFGVyRxoC4i2478xbbQ=s96-c' }} />

                      </View>
                      <Text>{"Elon Musk".length > 10 ? "Elon Musk".slice(0, 10).toLowerCase() + '...' : "Elon Musk".toLowerCase()}</Text>
                  </View>


              </View>
              <View style={{ alignItems: 'center', }}>
                  <View>
                      <View style={{ width: 65, height: 65, backgroundColor: 'white', borderRadius: 50, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "black" }}>
                          <Image style={styles.story} source={{ uri: 'https://lh3.googleusercontent.com/a/AItbvmkT2lmJgdoVXm1Lr5jaN18CA2nBP0Am7SK3n1A=s96-c' }} />

                      </View>
                      <Text>{"Anish Das".length > 10 ? "Anish Das".slice(0, 10).toLowerCase() + '...' : "Anish Das".toLowerCase()}</Text>
                  </View>


              </View>


          </ScrollView>

      </View>
  )
}

const styles = StyleSheet.create({
    story: {
        width: 55,
        height: 55,
        borderRadius: 50,
        marginLeft: 6,
        marginRight: 6,
    },

});

export default Stories