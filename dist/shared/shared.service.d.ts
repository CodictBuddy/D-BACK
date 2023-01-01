import { HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { ISequence } from './schema/sequence.schema';
export declare class SharedService {
    private Sequence;
    defaultLanguage: string;
    constructor(Sequence: Model<ISequence>);
    createSequence(tenant: number, name: string, defaultValue: number): Promise<void>;
    random6DigitCodeGenerator(): number;
    getNextNumber(sequenceName: string): Promise<string>;
    processError(err: Error, context: string): {
        code: HttpStatus;
        response: any;
    };
    mediaMapping(data: any, media: any, media_details: any): any;
    accessByString(o: any, s: any): any;
    processCondition(organization_code: any, user_id_1: any, user_id_2: any, type: any): {
        $or: any[];
    };
    returnUniqueRecords(data: string[]): string[];
    processfetchMyRecordsCondition(organization_code: any, user_id: any, type?: any, vision?: string): {
        $or: any[];
    };
    commonFilterObjectCreator(organization_code: any, type?: any): {
        filterObj: {
            $or: any[];
        };
        commFilter: {
            organization_code: any;
        };
    };
}
