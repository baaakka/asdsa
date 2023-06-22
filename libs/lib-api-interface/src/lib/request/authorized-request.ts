import { Role } from '../model';
import { Request } from 'typescript-openapi-router';
import { IRequestOpts } from 'typescript-openapi-router/dist/router/request-opts';

type AuthorizedRequestExtra = {
  extra: {
    userId: string;
    role: Role;
    email: string;
  };
};

export type AuthorizedRequestOpts<T> = IRequestOpts<T> & AuthorizedRequestExtra;

export class AuthorizedRequest<T = any> extends Request<T> {
  override extra: {
    userId: string;
    role: Role;
    email: string;
  };

  constructor(opts: AuthorizedRequestOpts<T>) {
    super(opts);
    this.extra = opts.extra;
  }
}
