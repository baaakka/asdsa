export type TokenOptions = {
    exp?: number;
    data: TokenPayload;
  };
  
  export type TokenData = {
    exp: number;
    iat: number;
    data: TokenPayload;
  };
  
  export type TokenPayload = {
    // user id
    id: string;
    // email
    e: string;
    // role
    r: string;
    // organization id
    o?: number;
  };
  