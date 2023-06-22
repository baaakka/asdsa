import { ResponseEnvelope } from '.';
import { AuthenticationModel } from '../model';

export interface LoginResponseBody extends ResponseEnvelope {
  data?: AuthenticationModel;
}
