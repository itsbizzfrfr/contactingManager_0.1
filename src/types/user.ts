export interface User {
  id: string;
  fullName: string;
  gender: string;
  city: string;
  institution: string;
  department: string;
  position: string;
  telephone: string;
  extension?: string;
  mobileNumbers: string[];
  emails: string[];
  createdAt: string;
}