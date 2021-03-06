/**
 * @fileoverview Description
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

class Util {
  static normalizeAngle(angle) {
    while (angle < 0) {
      // eslint-disable-next-line no-param-reassign
      angle += Util.TAU
    }
    return angle % Util.TAU
  }

  static bound(value, min, max) {
    if (value < min) {
      return min
    } else if (value > max) {
      return max
    }
    return value
  }

  static getSign(value) {
    if (value > 0) {
      return 1
    } else if (value < 0) {
      return -1
    }
    return 0
  }

  static random(min, max) {
    return Math.random() * (max - min) + min
  }

  static randomInt(min, max) {
    return Math.round(Util.random(min, max))
  }
}

Util.TAU = 2 * Math.PI

module.exports = Util
