import {useRef, useEffect} from 'react';
import {Marker, Icon, layerGroup} from 'leaflet';
import useMap from '@/hooks/use-map';
import {OfferListItem, City} from '@/types/offers';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '@/constants';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  points: OfferListItem[];
  startPoint: City;
  selectedPointId?: string;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

export default function Map({points, startPoint, selectedPointId}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, startPoint);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      points.forEach(({id, location}) => {
        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude,
        });

        marker
          .setIcon(
            id === selectedPointId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPointId]);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}
