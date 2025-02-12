export enum ContactGroup {
    FAMILY = 'FAMILY',
    FRIENDS = 'FRIENDS',
    WORK = 'WORK',
    OTHER = 'OTHER'
  }
  
  export interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    contactImage?: string;
    physicalAddress?: string;
    group: ContactGroup; // ✅ Uses the enum from the same file
    favorite: boolean;
    createdAt: Date;
  }
  