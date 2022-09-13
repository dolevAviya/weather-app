export interface LocationResult {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: {
    ID: string;
    LocalizedName: string;
  },
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
  }
}

export interface FiveDaysWeather {
  Headline: {
    EffectiveDate: string;
    EffectiveEpochDate: number;
    Severity: number,
    Text: string;
    Category: string;
    EndDate: string | null;
    EndEpochDate: string | null;
    MobileLink: string;
    Link: string;
  },
  DailyForecasts: DailyForecasts[]
}

export interface CurrentWeatherExtension {
  key: string,
  weather: CurrentWeather
}

export interface CurrentWeather {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: string | null;
  LocalSource?: LocalSource;
  IsDayTime: boolean;
  Temperature: {
    Metric: Temperature
    Imperial: Temperature
  },
  MobileLink: string;
  Link: string;
}

export interface WishListItem {
  id: string;
  name: string
}

interface DailyForecasts {
  Date: string;
  EpochDate: number,
  Temperature: {
    Minimum: Temperature
    Maximum: Temperature
  },
  Day: WeatherDetails;
  Night: WeatherDetails;
  Sources: string[];
  MobileLink: string;
  Link: string;

}

interface Temperature {
  Value: number;
  Unit: "C" | "F";
  UnitType: 17 | 18;
}

interface WeatherDetails {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  LocalSource: LocalSource
}

interface LocalSource {
  Id?: number;
  Name: string;
  WeatherCode?: string;
}
