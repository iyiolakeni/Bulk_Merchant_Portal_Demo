export interface PosRequest {
    [key: string]: any;
    RequestId: string;
    officer_name: string;
    MerchantID: string;
    No_of_POS_terminal: string;
    location_of_terminal: string;
    contact_person: string;
    contact_mobile_no: string;
    category_of_merchant_business: string;
    bank: string;
    Account_No: number;
    card_type: string;
    status: string;
    Notes: string;
    suppportingDocuments: string;
    updatedAt: string;
    createdAt: string;
    ApprovedBy: string;
    AdditionalNotes: string;
  }