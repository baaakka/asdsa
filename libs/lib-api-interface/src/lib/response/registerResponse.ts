import { ResponseEnvelope } from '.';
import { AuthenticationModel } from '../model';

export interface RegisterResponseBody extends ResponseEnvelope {
  data?: AuthenticationModel;
}
