export type ApplicationStatus = 
  | 'applied'
  | 'screening'
  | 'technical'
  | 'behavioral'
  | 'offer'
  | 'rejected'
  | 'accepted'
  | 'withdrawn';

export type WorkLocation = 'remote' | 'hybrid' | 'on-site';

export interface Contact {
  name: string;
  role: string;
  email?: string;
  phone?: string;
  notes?: string;
}

export interface Interview {
  id?: number;
  date: Date;
  type: 'screening' | 'technical' | 'behavioral' | 'final';
  interviewers: Contact[];
  notes?: string;
  feedback?: string;
}

export interface JobApplication {
  id?: number;
  company: string;
  role: string;
  location: string;
  workLocation: WorkLocation;
  status: ApplicationStatus;
  createdDate: string;
  lastEditedDate?: string;
  notes?: string;
  salary?: string;
  contact?: string;
  url?: string;
  contacts: Contact[];
  interviews: Interview[];
  technicalRequirements?: string[];
  nextSteps?: string;
} 