export interface User {
  id: number;
  uid: string;
  name: string;
  username: string;
  primary_contact: string;
  date_of_birth: Date;
  avatar: string;
  address: {
    city: string;
    street_name: string;
    zip_code: string;
    state: string;
    country: string;
  }
}