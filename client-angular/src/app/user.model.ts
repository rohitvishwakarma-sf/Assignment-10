export enum Role {
    super_admin = "super_admin",
    admin = "admin",
    subscriber = "subscriber",
  }
export class User{
id!: number;
  firstname: string;
  middlename?: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  rolekey: Role;
  createdon?: string;
  modifiedon?: string;

  constructor(
      id: number,
    firstName: string,
    middleName: string = "middle",
    lastName: string,
    email: string,
    phone: string,
    rolekey: Role,
    address: string,
  ) {
      this.id = id;
      this.firstname = firstName;
      this.middlename = middleName;
      this.lastname = lastName;
      this.email = email;
      this.phone = phone;
      this.rolekey = rolekey;
      this.address = address;
      this.createdon="";
      this.modifiedon="";
    
  }

}