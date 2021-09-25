// NavigationService.js

import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params = null) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}
function navigateToChild(parentRouteNam, childRouteName) {
  _navigator.dispatch(
    NavigationActions.navigate(
      parentRouteNam,
      {},
      NavigationActions.navigate({
        routeName: childRouteName
      })
    )
  )
}
function resetAndNavigate(routeName, index = 0, params = null) {
  _navigator.dispatch(
    StackActions.reset({
      index,
      actions: [NavigationActions.navigate({ routeName, params })],
    })
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  resetAndNavigate,
  navigateToChild
};