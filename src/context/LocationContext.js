import React from 'react';

export const defaultLocationContext = {
  currentLocation: { latitude: 0, longitude: 0 },
};

const LocationContext = React.createContext(defaultLocationContext)

export const LocationProvider = LocationContext.Provider
export const LocationConsumer = LocationContext.Consumer

export default LocationContext;
