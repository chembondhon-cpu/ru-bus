export interface BusStop {
  id: string;
  name: string;
  location: string;
}

export interface Route {
  id: string;
  name: string;
  stops: string[];
  schedule: {
    timeFromCampus: string;
    timeFromDestination: string;
    type: 'Morning' | 'Afternoon' | 'Evening';
  }[];
}
