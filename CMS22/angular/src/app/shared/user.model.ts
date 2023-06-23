
export class Users {
    UserID: number = 0;
    Username: string = '';
    Password: string = '';
    Email: string = '';
    Phonenumber: string = '';
    JobID: number = 0;
    JobRole: string = '';
  }
  
  export class Job {
    JobId: number = 0;
    JobRole: string = '';
  }

  export interface FormResponses{
    id:number;
    name:string;
    email:string;
    message:string;
  }
  