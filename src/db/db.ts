import Dexie, { Table } from 'dexie';

import { JobApplication } from './types';

class JobApplicationsDatabase extends Dexie {
  jobApplications!: Table<JobApplication>;

  constructor() {
    super('JobApplicationsDatabase');
    this.version(1).stores({
      jobApplications: '++id, company, role, status, createdDate'
    });
  }

  async export(): Promise<Blob> {
    const data = await this.jobApplications.toArray();
    return new Blob([JSON.stringify(data)], { type: 'application/json' });
  }

  async import(blob: Blob): Promise<void> {
    const text = await blob.text();
    const data = JSON.parse(text) as JobApplication[];
    
    // Clear existing data
    await this.jobApplications.clear();
    
    // Import new data
    await this.jobApplications.bulkAdd(data);
  }
}

export const db = new JobApplicationsDatabase();

export const addApplication = async (application: Omit<JobApplication, 'id'>): Promise<number> => {
  return await db.jobApplications.add(application as JobApplication);
};

export const updateApplication = async (id: number, application: Partial<JobApplication>): Promise<void> => {
  await db.jobApplications.update(id, application);
};

export const deleteApplication = async (id: number): Promise<void> => {
  await db.jobApplications.delete(id);
};

export const getApplication = async (id: number): Promise<JobApplication | undefined> => {
  return await db.jobApplications.get(id);
};

export const getAllApplications = async (): Promise<JobApplication[]> => {
  return await db.jobApplications.toArray();
};

export const duplicateApplication = async (id: number): Promise<void> => {
  const app = await db.jobApplications.get(id);
  if (!app) throw new Error('Application not found');

  const newApp = {
    ...app,
    id: undefined,
    createdDate: new Date().toISOString(),
    lastEditedDate: undefined,
  };

  await db.jobApplications.add(newApp);
}; 