import { Route } from './types';

export const routes: Route[] = [
  {
    id: '1',
    name: 'Court Route',
    stops: ['Talaimari', 'Shaheed Minar', 'Hadir Mor', 'Alupatti', 'Saheb Bazar', 'Sonadighi Mor', 'Sadar Hospital', 'Fire Service', 'Mission Hospital', 'DC Office', 'Court'],
    schedule: [
      { timeFromCampus: '08:05 AM', timeFromDestination: '08:35 AM', type: 'Morning' },
      { timeFromCampus: '09:10 AM', timeFromDestination: '09:35 AM', type: 'Morning' },
      { timeFromCampus: '01:10 PM', timeFromDestination: '01:35 PM', type: 'Afternoon' },
      { timeFromCampus: '05:15 PM', timeFromDestination: '05:35 PM', type: 'Evening' },
    ],
  },
  {
    id: '2',
    name: 'Upashahar Route',
    stops: ['TB Hospital', 'Moffat Mor', 'Sabur Mor', 'Tikapara Eidgah', 'Mohammadpur School', 'Kelapara', 'Doshla Mor', 'Relocation (West Gate)', 'Kamaruzzaman Chottor', 'Nagar Bhavan', 'Kallyan', 'Kaysar Memorial', 'Upashahar', 'New Market', 'Sadiqvona'],
    schedule: [
      { timeFromCampus: '08:05 AM', timeFromDestination: '08:35 AM', type: 'Morning' },
      { timeFromCampus: '09:10 AM', timeFromDestination: '09:35 AM', type: 'Morning' },
      { timeFromCampus: '01:10 PM', timeFromDestination: '01:35 PM', type: 'Afternoon' },
      { timeFromCampus: '05:15 PM', timeFromDestination: '05:35 PM', type: 'Evening' },
    ],
  },
  {
    id: '3',
    name: 'Lakshmipur Route',
    stops: ['Madina Market', 'Adarsha School', 'Madrasa Mor', 'Jahangir Sarani', 'Relocation (East Gate)', 'Relocation (West Gate)', 'Kamaruzzaman Chottor', 'Nagar Bhavan', 'Kallyan', 'Kallyan', 'Medical College', 'TB Hospital', 'Lakshmipur'],
    schedule: [
      { timeFromCampus: '08:05 AM', timeFromDestination: '08:35 AM', type: 'Morning' },
      { timeFromCampus: '09:10 AM', timeFromDestination: '09:35 AM', type: 'Morning' },
      { timeFromCampus: '01:10 PM', timeFromDestination: '01:35 PM', type: 'Afternoon' },
      { timeFromCampus: '05:15 PM', timeFromDestination: '05:35 PM', type: 'Evening' },
    ],
  },
  {
    id: '4',
    name: 'Padar Aabashik Route',
    stops: ['Adarsh School', 'Para Aabashik Post Office', 'Hazrat Mor', 'Paramount School', 'Choto Bon-gram Masjid'],
    schedule: [
      { timeFromCampus: '08:05 AM', timeFromDestination: '08:35 AM', type: 'Morning' },
      { timeFromCampus: '09:10 AM', timeFromDestination: '09:35 AM', type: 'Morning' },
      { timeFromCampus: '01:10 PM', timeFromDestination: '01:35 PM', type: 'Afternoon' },
      { timeFromCampus: '05:15 PM', timeFromDestination: '05:35 PM', type: 'Evening' },
    ],
  },
  {
    id: '5',
    name: 'Bihas Route',
    stops: ['Binodpur Gate', 'Mirjapur School', 'Bihas'],
    schedule: [
      { timeFromCampus: '08:05 AM', timeFromDestination: '08:35 AM', type: 'Morning' },
      { timeFromCampus: '09:10 AM', timeFromDestination: '09:35 AM', type: 'Morning' },
      { timeFromCampus: '01:10 PM', timeFromDestination: '01:35 PM', type: 'Afternoon' },
      { timeFromCampus: '05:15 PM', timeFromDestination: '05:35 PM', type: 'Evening' },
    ],
  },
  {
    id: '6',
    name: 'Somshadipur Route',
    stops: ['Binodpur Gate', 'Mirjapur School', 'Bihas', 'Maskata Dighi', 'Dewan Para', 'Kaitakhali', 'Somshadipur'],
    schedule: [
      { timeFromCampus: '08:05 AM', timeFromDestination: '08:35 AM', type: 'Morning' },
      { timeFromCampus: '09:10 AM', timeFromDestination: '09:35 AM', type: 'Morning' },
      { timeFromCampus: '01:10 PM', timeFromDestination: '01:35 PM', type: 'Afternoon' },
      { timeFromCampus: '05:15 PM', timeFromDestination: '05:35 PM', type: 'Evening' },
    ],
  },
  {
    id: '7',
    name: 'Nodapara Route',
    stops: ['Adarsh School', 'Madrasa Mor', 'Jahangir Sarani', 'Relocation (West Gate)', 'Gymnasium', 'Shalbagan', 'BiDiBi Center', 'Alif-Lam-Mim Industry', 'Aleker Mor', 'Nodapara', 'Amchtor'],
    schedule: [
      { timeFromCampus: '08:05 AM', timeFromDestination: '08:35 AM', type: 'Morning' },
      { timeFromCampus: '09:10 AM', timeFromDestination: '09:35 AM', type: 'Morning' },
      { timeFromCampus: '01:10 PM', timeFromDestination: '01:35 PM', type: 'Afternoon' },
      { timeFromCampus: '05:15 PM', timeFromDestination: '05:35 PM', type: 'Evening' },
    ],
  },
  {
    id: '8',
    name: 'Nohata Route',
    stops: ['Alif Lam Mim Industry', 'Thana Mor', 'Nowapara', 'Textile Mor', 'Sontoshpur', 'Baya', 'Nohata'],
    schedule: [
      { timeFromCampus: '08:05 AM', timeFromDestination: '08:35 AM', type: 'Morning' },
      { timeFromCampus: '09:10 AM', timeFromDestination: '09:35 AM', type: 'Morning' },
      { timeFromCampus: '01:10 PM', timeFromDestination: '01:35 PM', type: 'Afternoon' },
      { timeFromCampus: '05:15 PM', timeFromDestination: '05:35 PM', type: 'Evening' },
    ],
  },
  {
    id: '9',
    name: 'Alokar Mor Route',
    stops: ['Adarsh School', 'Kamaruzzaman Chottor', 'New Market', 'Alokar Mor'],
    schedule: [
      { timeFromCampus: '08:05 AM', timeFromDestination: '08:35 AM', type: 'Morning' },
      { timeFromCampus: '09:10 AM', timeFromDestination: '09:35 AM', type: 'Morning' },
      { timeFromCampus: '01:10 PM', timeFromDestination: '01:35 PM', type: 'Afternoon' },
      { timeFromCampus: '05:15 PM', timeFromDestination: '05:35 PM', type: 'Evening' },
    ],
  },
  {
    id: '10',
    name: 'Hariyan/Dhopada Route',
    stops: ['Mirjapur Primary School', 'Dewan Para', 'Kaitakhali', 'Nodapara', 'Dhopada'],
    schedule: [
      { timeFromCampus: '08:05 AM', timeFromDestination: '08:35 AM', type: 'Morning' },
      { timeFromCampus: '09:10 AM', timeFromDestination: '09:35 AM', type: 'Morning' },
      { timeFromCampus: '01:10 PM', timeFromDestination: '01:35 PM', type: 'Afternoon' },
      { timeFromCampus: '05:15 PM', timeFromDestination: '05:35 PM', type: 'Evening' },
    ],
  },
  {
    id: '11',
    name: 'Kashiyadala Route',
    stops: ['Bahrampur', 'Dlapada', 'Eidgah Mor', 'Court Station', 'Dhaktutia Mor', 'Rajpaka', 'Kashiyadala'],
    schedule: [
      { timeFromCampus: '08:05 AM', timeFromDestination: '08:35 AM', type: 'Morning' },
      { timeFromCampus: '09:10 AM', timeFromDestination: '09:35 AM', type: 'Morning' },
      { timeFromCampus: '01:10 PM', timeFromDestination: '01:35 PM', type: 'Afternoon' },
      { timeFromCampus: '05:15 PM', timeFromDestination: '05:35 PM', type: 'Evening' },
    ],
  },
];
