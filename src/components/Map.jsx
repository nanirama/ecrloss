/* eslint-disable max-len, no-underscore-dangle */
import React, { useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import styled from '@emotion/styled';
import { getCenterAndZoom } from '../utils/map';
import LocationContext from '../context/LocationContext';

// This wrapper must be positioned relative for the map to be able to lay itself out properly
const Wrapper = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  position: relative;
  flex: 1 0 auto;
`;

const Map = ({
  token,
  width,
  height,
  zoom,
  center,
  bounds,
  padding,
  styles,
  sources,
  layers,
  minZoom,
  maxZoom,
  showNavControl,
  onLocationClick,
}) => {
  if (!token) {
    console.error(
      'ERROR: Mapbox token is required in gatsby-config.js siteMetadata'
    );
  }
  const { longitude, latitude } = useContext(LocationContext);

  const mapNode = useRef(null);

  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [longitude, latitude], zoom: 15 });
    }
  }, [longitude, latitude]);


  useEffect(() => {
    let mapCenter = center;
    let mapZoom = zoom;

    if (bounds && bounds.length === 4) {
      const { center: boundsCenter, zoom: boundsZoom } = getCenterAndZoom(
        mapNode.current,
        bounds,
        padding
      );
      mapCenter = boundsCenter;
      mapZoom = boundsZoom;
    }

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: mapNode.current,
      style: `mapbox://styles/mapbox/${styles[2]}`,
      center: mapCenter,
      zoom: mapZoom,
      minZoom,
      maxZoom,
    });
    mapRef.current = map;
    window.map = map;

    if (showNavControl) {
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }

    map.on('load', () => {
      map.loadImage('/marker.png', (error, image) => {
        if (error) throw error;
        map.addImage('pin', image);
      });

      // add sources
      Object.entries(sources).forEach(([id, source]) => {
        map.addSource(id, source);
      });

      // add layers
      layers.forEach((layer) => {
        map.addLayer(layer);
      });

      map.flyTo({ center: [longitude, latitude], zoom: 15 });
    });

    function flyToStore(currentFeature) {
      map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 15,
      });
    }
    return () => {
      map.remove();
    };
  }, []);

  return (
    <Wrapper width={width} height={height}>
      <div ref={mapNode} style={{ width: '100%', height: '100%' }} />
    </Wrapper>
  );
};

Map.propTypes = {
  token: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
  bounds: PropTypes.arrayOf(PropTypes.number),
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  styles: PropTypes.arrayOf(PropTypes.string),
  padding: PropTypes.number,
  sources: PropTypes.object,
  layers: PropTypes.arrayOf(PropTypes.object),
  showNavControl: PropTypes.bool,
  onLocationClick: PropTypes.func,
};

Map.defaultProps = {
  width: 'auto',
  height: '100%',
  center: [0, 0],
  zoom: 0,
  bounds: null,
  minZoom: 0,
  maxZoom: 24,
  styles: ['light-v9', 'dark-v9', 'streets-v11'],
  padding: 0.1, // padding around bounds as a proportion
  sources: {},
  layers: [],
  showNavControl: false,
  onLocationClick: () => {},
};

export default Map;
