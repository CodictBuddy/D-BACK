export declare class AddUserDTO {
    first_name: Language;
    last_name: Language;
    user_name: string;
    user_designation: string;
    user_department: string[];
    user_groups: any;
    user_location: string;
    user_email: Email;
    alternate_email: Email[];
    user_phone_number: PhoneNumber;
    alternate_phone_number: PhoneNumber[];
    user_address: any;
    user_role: string[];
    user_dob: string;
    user_gender: string;
    user_about: Language[];
    user_media: Media[];
    password: string;
}
export declare class Language {
    description: string;
    language: string;
}
export declare class Email {
    email: string;
}
export declare class PhoneNumber {
    country: string;
    ext: string;
    phone_number: string;
}
export declare class Address {
    type: string;
    country: string;
    address_line_one: string;
    address_line_two: string;
    city: string;
    state: string;
    pincode: string;
}
export declare class Media {
    type: string;
    visibility: string;
    media_id: any;
}
