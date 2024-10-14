export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string
}

export interface DialogProps {
    isOpen: boolean;
    closeDialog: () => void;
}

// types.ts

export interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  }
  
  export interface TripDetails {
    name: string;
    description: string;
    quantity: number;
    price: number;
    imageSrc: string;
    subtotal: number;
    total: number;
  }
  
  export interface PaymentDetails {
    refNo: string;
    transId: string;
    status: string;
  }

  export interface Ipay88Payload {
    Amount: string;
    Currency: string;
    MerchantCode: string;
    RefNo: string;
    Quantity: number;
    SubTotal: number;
    Total: number;
    ProcessingFee: number;
  }
  
  export interface OrderDetails {
    userInfo: UserInfo;
    tripDetails: TripDetails;
    ipay88Payload: Ipay88Payload;
    paymentDetails: PaymentDetails;
  }