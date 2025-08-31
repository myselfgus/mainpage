export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface Location {
  id: string;
  name: string;
  serviceArea: string;
  whatsapp: string;
  whatsappLink: string;
}

export interface LocationData {
  guarulhos: Location;
  saoJose: Location;
}
