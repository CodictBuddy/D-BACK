import { Controller } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { ConnectionsService } from './connections.service';

@Controller(':organization_code/connections')
export class ConnectionsController {
  constructor(
    private connService: ConnectionsService,
    private sservice: SharedService,
  ) {}

  // 1. recieved connections
  //2. sent connections
  //3. connected users
  //4. blocked users
  //5. single user connection status
  //6. socket
  //7. push notifications
  // 8. mail trigger for new connection request
}
