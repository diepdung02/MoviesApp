// Trong RootNavigator hoặc bất kỳ nơi nào bạn xác định navigator chính
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainNav" component={MainNav} /> {/* Đảm bảo rằng MainNav nằm trong một Screen của Navigator */}
        {/* Các màn hình khác nếu cần */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
