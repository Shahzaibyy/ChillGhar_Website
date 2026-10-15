export const CITIES = [
  { id: 'islamabad', name: 'Islamabad', status: 'Launching first', areas: ['F-6', 'F-7', 'F-8', 'F-10', 'F-11', 'G-9', 'G-10', 'G-11', 'G-13', 'E-11', 'I-8', 'I-10', 'PWD', 'Bahria Town', 'DHA', 'Chak Shahzad', 'Other'] },
  { id: 'rawalpindi', name: 'Rawalpindi', status: 'Launching first', areas: ['Saddar', 'Satellite Town', 'Chaklala', 'Bahria Town', 'DHA', 'Westridge', 'Adiala Road', 'Other'] },
  { id: 'lahore', name: 'Lahore', status: 'Next', areas: ['DHA', 'Gulberg', 'Johar Town', 'Model Town', 'Bahria Town', 'Askari', 'Other'] },
  { id: 'karachi', name: 'Karachi', status: 'Next', areas: ['DHA', 'Clifton', 'Gulshan-e-Iqbal', 'North Nazimabad', 'PECHS', 'Gulistan-e-Jauhar', 'Other'] },
  { id: 'peshawar', name: 'Peshawar', status: 'Waitlist', areas: ['University Town', 'Hayatabad', 'Saddar', 'Other'] },
  { id: 'faisalabad', name: 'Faisalabad', status: 'Waitlist', areas: ['Peoples Colony', 'Madina Town', 'Satiana Road', 'Other'] },
  { id: 'multan', name: 'Multan', status: 'Waitlist', areas: ['Cantt', 'Gulgasht', 'Bosan Road', 'Other'] },
];
export const cityById = (id) => CITIES.find((c) => c.id === id) || CITIES[0];
