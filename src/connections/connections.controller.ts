import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetToken } from 'src/shared/decorator/getuser.decorator';
import { SharedService } from 'src/shared/shared.service';
import { UserToken } from 'src/user/dto/usertoken.dto';
import { ConnectionsService } from './connections.service';

@Controller(':organization_code/connections')
export class ConnectionsController {
  constructor(
    private connService: ConnectionsService,
    private sservice: SharedService,
  ) {}

  // 1. recieved connections

  @UseGuards(JwtAuthGuard)
  @Get(':view_type/:connection_type/:connection_status')
  async suggestions(
    @Res() res: any,
    @GetToken() token: UserToken,
    @Param('organization_code') organization,
    @Param('view_type') view_type,
    @Param('connection_status') connection_status,
    @Param('connection_type') connection_type,
  ) {
    try {
      let data = await this.connService.getConnectionList(
        +organization,
        token,
        connection_status,
        connection_type,
        +view_type,
      );
      return res.json(data);
    } catch (err) {
      const { code, response } = this.sservice.processError(
        err,
        this.constructor.name,
      );
      return res.status(code).send(response);
    }
  }
  //2. sent connections -done
  //3. connected users -done  // only need to work on population part
  //4. blocked users -done
  //5. single user connection status
  // 6.create conenction
  // 7.update connection
  // 8.remove connection
  //9. socket
  //10. push notifications
  // 11. mail trigger for new connection request
}
