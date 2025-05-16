import useMap from '@/hooks/use-map';
import {useRef, useEffect} from 'react';
import 'leaflet/dist/leaflet.css';
import {Marker, Icon, layerGroup} from 'leaflet';
import {useAppSelector} from '@/hooks';
import {OfferListItem, City} from '@/types/offers';
import {getOfferId} from '@/store/user-action/selectors';
import {
  URL_MARKER_DEFAULT,
  URL_MARKER_CURRENT
} from '@/constants';

interface MapProps {
  points?: OfferListItem[];
  startPoint: City;
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

export default function Map({points, startPoint}: MapProps) {
  const selectedPointId = useAppSelector(getOfferId);

  const mapRef = useRef(null);
  const map = useMap(mapRef, startPoint);

  useEffect(() => {
    if (map) {
      map.setView([
        startPoint.location.latitude,
        startPoint.location.longitude
      ], startPoint.location.zoom);
    }
  }, [map, startPoint]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      points?.forEach(({id, location}) => {
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
