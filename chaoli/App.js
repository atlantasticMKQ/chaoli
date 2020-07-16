import 'react-native-gesture-handler';

import * as React from 'react';
import { View, Text, ActivityIndicator, ScrollView, FlatList, SafeAreaView, TouchableOpacity,
         TouchableHighlight, } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { ListItem, Header, Button, Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import MathView from 'react-native-math-view';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function MainItem({ title, group, pin, firstpost, published, freshed, atime, length, labels, navigation })
{
    return(
        <View style={{ flex:1, flexDirection: 'column',}}>
          <View style={{ flex:2, flexDirection: 'row', padding:15,}}>
            {
                pin?
                <Icon
                  name='anchor'
                  size={ 20 }
                />:
                <View/>
            }
            {
                labels[0]=='featured'?
                <Icon
                  name='diamond'
                  size={ 20 }
                />:
                labels[1]=='featured'?
                <Icon
                  name='diamond'
                  size={ 20 }
                />:
                <View/>
            }
            <Text
              style={{ fontSize:20, fontWeight:'bold', paddingRight:15}}
            >  { title }</Text>
          </View>
          <View style={{ flex:2, flexDirection: 'row', paddingLeft:15, paddingRight:15}}>
            <Text style={{ color:'grey' }}>
              { firstpost
                .replace(/\[([^\[\]]*)\]/g,"")
                .substring(0,firstpost.indexOf('\n'))==''?
                firstpost
                .replace(/\[([^\[\]]*)\]/g,""):
                firstpost
                .replace(/\[([^\[\]]*)\]/g,"")
                .substring(0,firstpost.indexOf('\n')).lenght<200?
                firstpost
                .replace(/\[([^\[\]]*)\]/g,""):
                firstpost
                .replace(/\[([^\[\]]*)\]/g,"")
                .substring(0,firstpost.indexOf('\n'))
              }</Text>
          </View>
          <View style={{ flex:2, flexDirection: 'row'}}>
            <View style={{ flex:1, flexDirection: 'column', padding:15}}>
              <Button
                title={
                    group=='8'?"技术":
                    group=='5'?"物理":
                    group=='6'?"化学":
                    group=='28'?"公告":
                    group=='34'?"社科":
                    group=='4'?"数学":
                    group=='43'?"辑录":
                    group=='40'?"语言":
                    group
                }
                type='outline'
                buttonStyle={
                    group=='8'?"blue":
                    group=='5'?"green":
                    group=='6'?"red":
                    group=='28'?"grey":
                    group=='34'?"grey":
                    group=='4'?"yellow":
                    group=='43'?"black":
                    group=='40'?"pule":
                    group
                }
              />
            </View>
            <View style={{ flex:3, flexDirection: 'column', padding:15}}>
              <Text>{ published } 发表了本帖</Text>
              <Text>{ freshed } 更新于 { atime }</Text>
            </View>
            <View style={{ flex:1, flexDirection: 'column', paddingTop:15}}>
              <Text style={{ fontSize:25, color:'grey'}}>{ length }</Text>
            </View>
          </View>
        </View>
    );
}
function HomeScreen({ navigation })
{
    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        fetch('https://chaoli.club/index.php/conversations/index.json')
            .then((response) => response.json())
            .then((json) => setData(json.results))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);
    const renderItem = ({ item, navigation, separators }) => (
        <MainItem
          title={ item.title }
          group={ item.channelId }
          pin={ item.sticky=="1" }
          firstpost={ item.firstPost }
          published={ item.startMember }
          freshed={ item.lastPostMember }
          atime={ item.lastPostTime }
          length={ item.countPosts }
          labels={ item.labels }
          navigation={ navigation }
        />
    );
    const itemSeparator = () => (
      <Divider style={{ backgroundColor: 'grey' }} />  
    );
    return (
        <>
          <View>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList
                  onRefresh = { ()=> {
                      setLoading(true);
                      fetch('https://chaoli.club/index.php/conversations/index.json')
                          .then((response) => response.json())
                          .then((json) => setData(json.results))
                          .catch((error) => console.error(error))
                          .finally(() => setLoading(false));
                  }}
                  keyExtractor={item => item.conversationId}
                  refreshing = { isLoading }
                  data={data}
                  renderItem={ renderItem }
                  ItemSeparatorComponent={ itemSeparator }
                />
            )}
          </View>
        </>
    );
}
function ItemScreen({ navigation, item })
{
    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        fetch('https://chaoli.club/index.php/conversations/index.json/'+item.conversationId)
            .then((response) => response.json())
            .then((json) => setData(json.results))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);
    const renderItem = ({ item, navigation, separators }) => (
        <MainItem
          title={ item.title }
          group={ item.channelId }
          pin={ item.sticky=="1" }
          firstpost={ item.firstPost }
          published={ item.startMember }
          freshed={ item.lastPostMember }
          atime={ item.lastPostTime }
          length={ item.countPosts }
          labels={ item.labels }
          navigation={ navigation }
            />
    );
    const itemSeparator = () => (
      <Divider style={{ backgroundColor: 'grey' }} />  
    );
    return (
        <>
          <View>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList
                  onRefresh = { ()=> {
                      setLoading(true);
                      fetch('https://chaoli.club/index.php/conversations/index.json')
                          .then((response) => response.json())
                          .then((json) => setData(json.results))
                          .catch((error) => console.error(error))
                          .finally(() => setLoading(false));
                  }}
                  keyExtractor={item => item.conversationId}
                  refreshing = { isLoading }
                  data={data}
                  renderItem={ renderItem }
                  ItemSeparatorComponent={ itemSeparator }
                />
            )}
          </View>
        </>
    );
}

function SettingScreen({ navigation })
{
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Setting Screen</Text>
        </View>
    );
}
export default function App()
{
    return(
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name = "Home"
              component = { HomeScreen }
              options = {{
                  headerTitle: 'Chaoli',
              }}
            />
            <Stack.Screen
              name = "Item"
              component = { ItemScreen }
              options = {{
                  headerTitle: 'Item',
              }}
            />
            <Stack.Screen
              name = "Setting"
              component = { SettingScreen }
            />
          </Stack.Navigator>
        </NavigationContainer>
    );
}
