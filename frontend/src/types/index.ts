export interface UnitConversion {
  units: string[];
  conversions: Record<string, number>;
}

export interface UnitData {
  [key: string]: UnitConversion;
}