import React from 'react'
import { Button, Text, View } from 'react-native'

const News = ({navigation}) => {
  return (
    <View>
        <Text>News</Text>
        <Button onPress={e => navigation.navigate('Home')} title="To Home" />
    </View>
  )
}

export default News;