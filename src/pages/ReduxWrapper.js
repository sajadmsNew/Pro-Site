import React from "react"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import reducers from "../reducer"
import ReduxThunk from "redux-thunk"
 
const createReduxStore = () =>
  createStore(reducers, {}, applyMiddleware(ReduxThunk))

export default ({ element }) => (
  <Provider store={createReduxStore()}>{element}</Provider>
)
 