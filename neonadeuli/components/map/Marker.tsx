import { useEffect, useRef } from 'react';
import type { Marker, NaverMap } from '@/types/map';

export default function Marker({ coordinates, map, icon, onClick }: Marker) {
  // const [marker, setMarker] = useState<naver.maps.Marker | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);

  useEffect(() => {
    if (!window.naver || !map || !coordinates) return;
    
    const createMarker = () => {
      if (markerRef.current) return;

      markerRef.current = new window.naver.maps.Marker({
        map: map,
        position: new window.naver.maps.LatLng(...coordinates),
        icon,
        clickable: true
      });

      if (onClick) {
        console.log('Adding click event listener to marker');
        window.naver.maps.Event.addListener(markerRef.current, 'click', () => {
          console.log('Marker clicked');
          onClick();
        });
      }
    };

    const destroyMarker = () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
    };

    createMarker();

    return () => {
      destroyMarker();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates, icon, map, onClick]);

  return null;
}
