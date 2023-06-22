import { ResponseEnvelope } from '.';
import { UserModel } from '../model/userModel';

export interface GetMeResponseBody extends ResponseEnvelope {
  data?: UserModel;
}
