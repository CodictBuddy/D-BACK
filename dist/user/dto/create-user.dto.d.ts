export declare class CreateUserDTO {
    first_name: Language[];
    last_name: Language[];
    designation: any;
    email: any;
    alternate_email: Email[];
    phone_number: any;
    alternate_phone_number: PhoneNumber[];
    address: any;
    roles: string[];
    date_of_birth: string;
    gender: any;
    account_verification: boolean;
    password_history: PasswordHistory[];
    about: Language[];
    media: Media[];
    password: string;
}
export declare class Language {
    description: string;
    language: string;
}
export declare class Email {
    type: string;
    email: string;
    visibility: string;
    addedOn: any;
    verification: boolean;
    verifiedOn: any;
}
export declare class PhoneNumber {
    type: string;
    country: string;
    ext: string;
    phone_number: string;
    visibility: string;
    addedOn: any;
    verification: boolean;
    verifiedOn: any;
}
export declare class Address {
    type: string;
    country: string;
    ext: string;
    phone_number: string;
    visibility: string;
    addedOn: any;
    verification: boolean;
    verifiedOn: any;
}
export declare class PasswordHistory {
    password: string;
    updatedOn: Date;
}
export declare class Media {
    type: string;
    visibility: string;
    media_id: any;
}
