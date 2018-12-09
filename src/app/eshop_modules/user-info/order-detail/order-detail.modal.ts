export class OrderDetail {
  ListOrderDetail: Element[];
  Id: number;
  IdUser: number;
  CreateDate: Date;
  CustomerMessgase: string;
  Status: boolean;
  TotalAmount: number;
}

export class Element {
  Id: string;
  IdOrder: string;
  IdCategories: string;
  CreateDate: string;
  NameProduct: string;
  Image: string;
  MoreImage: string;
  Warranty: string;
  Quantity: string;
  Price: string;
  Amount: string;
  PromotionPrice: string;
  Content: string;
}
