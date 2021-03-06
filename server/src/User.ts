export enum Role {
  super_admin = "super_admin",
  admin = "admin",
  subscriber = "subscriber",
}
export class User {
  id!: number;
  firstname!: string;
  middlename?: string;
  lastname!: string;
  email!: string;
  phone!: string;
  address!: string;
  rolekey!: Role;
  createdon!: string;
  modifiedon!: string;
}
