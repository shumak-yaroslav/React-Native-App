import React, { useState } from 'react';
import { Provider } from 'react-redux'
import { AppLoading } from 'expo'
import { bootstrap } from "./src/bootstrap";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from "./src/Screens/MainScreen";
import { PostScreen } from "./src/Screens/PostScreen";
import { CreateScreen } from "./src/Screens/CreateScreen";
import { SearchScreen } from "./src/Screens/SearchScreen";
import { THEME } from "./src/theme";
import store from './src/store/index'

const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [isReady, setIsReady] = useState(false)

  if (!isReady) {
      return (
          <AppLoading
              startAsync={bootstrap}
              onFinish={() => setIsReady(true)}
              onError={err => console.log(err)}/>
      )

  }


  return (
      <Provider store={store}>
          <NavigationContainer>
              <Stack.Navigator>
                  <Stack.Screen
                      name="Todo App"
                      component={MainScreen}
                      options={{
                          headerStyle: {
                              backgroundColor: THEME.MAIN_COLOR
                          },
                          headerTintColor: '#fff',
                      }}
                  />
                  <Stack.Screen
                      name="Task"
                      component={PostScreen}
                      options={{
                          headerStyle: {
                              backgroundColor: THEME.MAIN_COLOR
                          },
                          headerTintColor: '#fff'
                      }}
                  />
                  <Stack.Screen
                      name="Create"
                      component={CreateScreen}
                      options={{
                          headerStyle: {
                              backgroundColor: THEME.MAIN_COLOR
                          },
                          headerTintColor: '#fff'
                      }}
                  />
                  <Stack.Screen
                      name="Search"
                      component={SearchScreen}
                      options={{
                          headerStyle: {
                              backgroundColor: THEME.MAIN_COLOR
                          },
                          headerTintColor: '#fff'
                      }}
                  />
              </Stack.Navigator>
          </NavigationContainer>
      </Provider>
  )
}


