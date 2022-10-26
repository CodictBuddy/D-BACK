import { Injectable, HttpStatus } from '@nestjs/common';
// import { CustomLogger } from 'src/logger/customlogger.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppException } from './app-exception';
import { ISequence } from './schema/sequence.schema';
@Injectable()
export class SharedService {
  defaultLanguage = 'en';
  constructor(
    // private logger: CustomLogger,
    @InjectModel('sequence') private Sequence: Model<ISequence>,
  ) { }
  async createSequence(tenant: number, name: string, defaultValue: number) {
    await this.Sequence.create({ tenant, name, value: defaultValue });
  }

  random6DigitCodeGenerator(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async getNextNumber(sequenceName: string) {
    let seq = await this.Sequence.findOneAndUpdate(
      { name: sequenceName },
      { $inc: { value: 1 } },
      { new: true, upsert: true },
    );
    return `${seq.value}`;
  }
  processError(err: Error, context: string) {
    let code: HttpStatus, response;
    if (err instanceof AppException) {
      code = err.getCode();
      response = { code, message: err.getMessage() };
    } else {
      code = HttpStatus.INTERNAL_SERVER_ERROR;
      response = { code, message: 'Something went wrong' };
    }
    // this.logger.error(err, { label: context || 'Shared Module' });
    console.log('err', err);
    return { code, response };
  }
  mediaMapping(data, media, media_details) {
    data.forEach(ele => {
      this.accessByString(ele, media).forEach(m => {
        m['location'] = this.accessByString(ele, media_details).find(
          x => x._id.toString() == m.media_id.toString(),
        ).location;
      });
    });
    return data;
  }
  accessByString(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, ''); // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in o) {
        o = o[k];
      } else {
        return;
      }
    }
    return o;
  }

  processCondition(organization_code, user_id_1, user_id_2, type) {
    let filterObj = this.commonFilterObjectCreator(organization_code, type)
      .filterObj;
    const commFilter = this.commonFilterObjectCreator(organization_code, type)
      .commFilter;
    filterObj['$or'].push({
      ...commFilter,
      target_user_id: user_id_1,
      user_id: user_id_2,
    });
    filterObj['$or'].push({
      ...commFilter,
      target_user_id: user_id_2,
      user_id: user_id_1,
    });

    return filterObj;
  }

  returnUniqueRecords(data: string[]) {
    return [...new Set(data)]
  }
  processfetchMyRecordsCondition(
    organization_code,
    user_id,
    type?,
    vision = 'all',
  ) {
    let filterObj = this.commonFilterObjectCreator(organization_code, type)
      .filterObj;

    const commFilter = this.commonFilterObjectCreator(organization_code, type)
      .commFilter;

    filterObj['$or'].push({
      ...commFilter,
      target_user_id: user_id,
    });
    if (vision === 'all') {
      filterObj['$or'].push({
        ...commFilter,
        user_id: user_id,
      });
    }

    return filterObj;
  }

  commonFilterObjectCreator(organization_code, type?) {
    const commFilter = {
      organization_code,
    };
    if (type) {
      commFilter['type'] = type;
    }

    return {
      filterObj: {
        $or: [],
      },
      commFilter,
    };
  }
}
