export type GeoCoordinate = {
  latitude: number;
  longitude: number;
};

const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

export const getDistanceInMeters = (
  from: GeoCoordinate,
  to: GeoCoordinate,
): number => {
  const earthRadiusMeters = 6371000;
  const fromLatitude = degreesToRadians(from.latitude);
  const toLatitude = degreesToRadians(to.latitude);
  const latitudeDelta = degreesToRadians(to.latitude - from.latitude);
  const longitudeDelta = degreesToRadians(to.longitude - from.longitude);
  const haversine =
    Math.sin(latitudeDelta / 2) * Math.sin(latitudeDelta / 2) +
    Math.cos(fromLatitude) *
      Math.cos(toLatitude) *
      Math.sin(longitudeDelta / 2) *
      Math.sin(longitudeDelta / 2);

  return (
    earthRadiusMeters *
    2 *
    Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
  );
};
