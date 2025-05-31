export const unitData= {
    'Distance': {
    units: ['m', 'km', 'cm', 'mm', 'ft', 'inch'],
    conversions: {
      'm': 1,        // 基準単位
      'km': 1000,
      'cm': 0.01,
      'mm': 0.001,
      'ft': 0.3048,
      'inch': 0.0254
    }
  },
  'Data Size': {
    units: ['B', 'KB', 'MB', 'GB', 'TB'],
    conversions: {
      'B': 1,        // 基準単位
      'KB': 1024,
      'MB': 1024 * 1024,
      'GB': 1024 * 1024 * 1024,
      'TB': 1024 * 1024 * 1024 * 1024
    }
  },
  'Weight': {
    units: ['g', 'kg', 'lb', 'oz'],
    conversions: {
      'g': 1,        // 基準単位
      'kg': 1000,
      'lb': 453.592,
      'oz': 28.3495
    }
  },
  'Time': {
    units: ['s', 'min', 'h', 'day'],
    conversions: {
      's': 1,        // 基準単位
      'min': 60,
      'h': 3600,
      'day': 86400
    }
  },
  'Transfer Rate': {
    units: ['bps', 'Kbps', 'Mbps', 'Gbps'],
    conversions: {
      'bps': 1,      // 基準単位
      'Kbps': 1000,
      'Mbps': 1000000,
      'Gbps': 1000000000
    }
  },
  'Temperature': {
    units: ['C', 'F', 'K'],
    conversions: {
      'C': 1,        // 基準単位（特殊な変換が必要）
      'F': 1,        // 温度は特別な計算式が必要
      'K': 1
    }
  },
  'Volume': {
    units: ['L', 'mL', 'gal', 'qt'],
    conversions: {
      'L': 1,        // 基準単位
      'mL': 0.001,
      'gal': 3.78541,
      'qt': 0.946353
    }
  },
  'Velocity': {
    units: ['m/s', 'km/h', 'mph', 'ft/s'],
    conversions: {
      'm/s': 1,      // 基準単位
      'km/h': 0.277778,
      'mph': 0.44704,
      'ft/s': 0.3048
    }
  },
  'Accelerate': {
    units: ['m/s²', 'ft/s²', 'g'],
    conversions: {
      'm/s²': 1,     // 基準単位
      'ft/s²': 0.3048,
      'g': 9.80665
    }
  }
};