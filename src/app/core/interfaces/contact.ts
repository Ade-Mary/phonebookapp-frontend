export interface Contact {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
    imageUrl: string | null;
    address: string | null;
    group: string | null;
    isFavorite: boolean;
    createdAt: Date;
  }