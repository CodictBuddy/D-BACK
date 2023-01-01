import { SharedService } from 'src/shared/shared.service';
import { UtilsService } from './utils.service';
import { MediaService } from 'src/media/media.service';
import { UserToken } from 'src/user/dto/usertoken.dto';
import { Itypes } from './common interfaces/interfaces';
export declare class UtilsController {
    private readonly utilsS;
    private readonly sservice;
    private readonly mediaService;
    constructor(utilsS: UtilsService, sservice: SharedService, mediaService: MediaService);
    create(file: any, token: UserToken, res: any, organization_code: any, type: Itypes): Promise<any>;
    deleteFile(body: {
        public_id: string;
    }, res: any, token: UserToken, organization_code: any): Promise<any>;
}
