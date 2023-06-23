export interface Comment {
    id: number;
    name: string;
    email: string;
    content: string;
    file?: File; 
    fileURL?: string; 
  }