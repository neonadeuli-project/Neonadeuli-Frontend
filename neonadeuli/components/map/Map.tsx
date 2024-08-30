'use client';

import { INITIAL_CENTER, INITIAL_ZOOM } from '@/store';
import { Coordinates, NaverMap } from '@/types/map';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

type Props = {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoad?: (map: NaverMap) => void;
};

export default function Map({
  mapId = 'map',
  initialCenter = INITIAL_CENTER,
  initialZoom = INITIAL_ZOOM,
  onLoad,
}: Props) {
  const mapRef = useRef<NaverMap | null>(null);
  const [isNaverLoaded, setIsNaverLoaded] = useState(false);
  const [marker, setMarker] = useState(null);

  const initializeMap = () => {
    if (!window.naver || !document.getElementById(mapId)) return;
    
    const mapOptions: naver.maps.MapOptions = {
      center: new window.naver.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: 16,
      scaleControl: false,
      mapDataControl: false,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
      },
      // draggable: false,
      logoControlOptions: {
        position: naver.maps.Position.TOP_LEFT,
      },
    };

    const map = new window.naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;

    if (onLoad) {
      onLoad(map);
    }
  };

  useEffect(() => {
    if (isNaverLoaded) {
      initializeMap();
    }
  }, [isNaverLoaded]);

  useEffect(() => {
    return () => {
    if (mapRef.current && typeof mapRef.current.destroy === 'function') {
      try {
        mapRef.current.destroy();
      } catch (error) {
        console.error("Error destroying map:", error);
      }
    }
  };
  }, []);

  const handleNaverLoaded = () => {
    setIsNaverLoaded(true);
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
        onReady={initializeMap}
        onLoad={handleNaverLoaded}
      />
      <div id={mapId} style={{ width: '100%', height: '250px' }} />
    </>
  );
}
