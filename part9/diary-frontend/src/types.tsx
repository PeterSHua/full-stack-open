export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy'
}

export enum Visibility {
  Good = 'good',
  Poor = 'poor'
}

export interface Entry {
  id: number,
  date: string,
  weather: Weather,
  visibility: Visibility,
  comment: string
}

export type NewEntry = Omit<Entry, 'id'>;
