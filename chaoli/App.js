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
import { ListItem, Header, Button, } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import MathView from 'react-native-math-view';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
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
    return (
        <>
          
          <Header
            placement="left"
            leftComponent={
                <Button
                  buttonStyle = {{ flex:1, width:50}}
                  icon={
                      <Icon
                        name="menu"
                        size={15}
                        color="white"
                      />
                  }
                  onPress = {() => navigation.dispatch(DrawerActions.openDrawer()) }
                />
            }
            centerComponent={{ text: 'Chaoli', style: { color: '#fff' } }}
          />

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
                  refreshing = { isLoading }
                  ItemSeparatorComponent={
                      Platform.OS !== 'android' &&
                          (({ highlighted }) => (
                            <View
                              style={[
                                  //style.separator,
                                  highlighted && { marginLeft: 0 }
                              ]}
                            />
                          ))
                  }
                  data={data}
                //keyExtractor={({ id }, index) => id}
                  renderItem={({ item, index, separators }) => (
                  <TouchableHighlight
                      //onPress={() => this._onPress(item)}
                      onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight}>
                    <View style={{ backgroundColor: 'white', flex:1, height:300 }}>
                      <Text style={{
                          marginVertical: 8,
                          marginHorizontal: 20,
                          fontSize: 20,
                          fontWeight: "bold"
                      }}>
                        {item.title}
                      </Text>
                      <Text style={{
                          marginHorizontal: 8,
                      }}>
                        { item.firstPost.replace(/\[([^\[\]]*)\]/g,"").replace(/\n(\n)*( )*(\n)*\n/g,"").slice(0,150) }...
                      </Text>
                      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{
                            marginVertical: 8,
                            textAlign: "left",
                            fontWeight: "bold"
                        }}>
                          楼主:{ item.startMember } 
                        </Text>
                        <Text style={{
                            marginVertical: 8,
                            textAlign: "right",
                            fontWeight: "bold"
                        }}>
                          更新:{ item.lastPostMember }
                        </Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                  )}
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
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen
              name = "Home"
              component = { HomeScreen }
              options = {{
                  headerTitle: 'Chaoli',
              }}
            />
            <Drawer.Screen
              name = "Setting"
              component = { SettingScreen }
            />
          </Drawer.Navigator>
        </NavigationContainer>
    );
}
