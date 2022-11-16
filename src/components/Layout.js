import React from 'react'
import { StyleSheet, View } from 'react-native'
import Content from './Content'
import Header from './Header'

const Layout = ({ title = '', layoutStyle, children, contentStyle }) => {
    return (
        <View style={[{ flex: 1 }, layoutStyle]}>
            <Header title={title} />
            <Content style={contentStyle}>
                { children }
            </Content>
        </View>
    )
}

export default Layout

const styles = StyleSheet.create({})