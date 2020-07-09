import { applyMiddleware, compose, createStore } from 'redux';
import { getFirebase } from 'react-redux-firebase'

export const setSearchTerm = term => {
  return { type: 'SET_SEARCH_TERM', term }
}

export const setFilters = filters => {
  return { type: 'SET_FILTERS', filters }
}
