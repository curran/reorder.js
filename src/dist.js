import { distance as distances } from './distance';

export function dist() {
  let distance = distances.euclidean;

  function dist(vectors) {
    const n = vectors.length;
    const distMatrix = [];

    for (let i = 0; i < n; i++) {
      const d = [];
      distMatrix[i] = d;
      for (let j = 0; j < n; j++) {
        if (j < i) {
          d.push(distMatrix[j][i]);
        } else if (i === j) {
          d.push(0);
        } else {
          d.push(distance(vectors[i], vectors[j]));
        }
      }
    }
    return distMatrix;
  }

  dist.distance = function (x) {
    if (!arguments.length) {
      return distance;
    }
    distance = x;
    return dist;
  };

  return dist;
}

export function distmax(distMatrix) {
  let max = 0;
  const n = distMatrix.length;

  for (let i = 0; i < n; i++) {
    const row = distMatrix[i];
    for (let j = i + 1; j < n; j++) {
      if (row[j] > max) {
        max = row[j];
      }
    }
  }

  return max;
}

export function distmin(distMatrix) {
  let min = Infinity;
  const n = distMatrix.length;

  for (let i = 0; i < n; i++) {
    const row = distMatrix[i];
    for (let j = i + 1; j < n; j++) {
      if (row[j] < min) {
        min = row[j];
      }
    }
  }

  return min;
}

export function dist_remove(dist, n, m = n + 1) {
  dist.splice(n, m - n);
  for (let i = dist.length; i-- > 0; ) {
    dist[i].splice(n, m - n);
  }
  return dist;
}
