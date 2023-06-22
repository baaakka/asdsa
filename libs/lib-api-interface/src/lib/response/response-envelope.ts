import { Envelope } from 'typescript-openapi-router';
import { ApiErrorModel } from '../model';

export class ResponseEnvelope implements Envelope {
  errors?: ApiErrorModel[];
}
