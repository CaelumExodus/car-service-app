export interface User {
  userid: number;
  username: string;
  password: string;
  email?: string;
  phonenumber?: string;
  role: string;
}

export interface ServiceOrder {
  orderid: number;
  clientid: number;
  status: string;
  totalcost?: number;
  createddate: Date;
  completeddate?: Date;
}

export interface Part {
  partid: number;
  partname: string;
  partcategory?: string;
  quantityinstock: number;
  unitprice: number;
  supplier?: string;
}

export interface Invoice {
  invoiceid: number;
  orderid: number;
  clientid: number;
  amount: number;
  issuedate: Date;
  duedate?: Date;
  status: string;
}

export interface Complaint {
  complaintid: number;
  orderid: number;
  clientid: number;
  description: string;
  status: string;
  createddate: Date;
  resolveddate?: Date;
}

export interface Serviceorderpart {
  orderid: number;
  partid: number;
  quantity: number;
}
