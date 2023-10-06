/**
 * Calcule la distance entre 2 points de coordonnées GPS
 * Les 2 paramètres de cette fonction sont des tableaux respectant le format [latitude, longitude]
 *
 * @param {Array} origin La latitude et la longitude du premier point
 * @param {Array} target La latitude et la longitude du second point
 * @return {int} La distance en km
 */
export function haversine(origin, target) {
  const [lat1, lon1] = origin;
  const [lat2, lon2] = target;

  const earthRadius = 6371; // Rayon de la Terre en kilomètres (approximatif)

  const lat1Rad = (Math.PI / 180) * lat1;
  const lon1Rad = (Math.PI / 180) * lon1;
  const lat2Rad = (Math.PI / 180) * lat2;
  const lon2Rad = (Math.PI / 180) * lon2;

  const dLat = lat2Rad - lat1Rad;
  const dLon = lon2Rad - lon1Rad;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;

  return distance;
}
