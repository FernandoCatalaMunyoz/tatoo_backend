export type TokenData = {
  userId: number;
  roleName: string;
  firtsName: string;
};

declare global {
  namespace Express {
    export interface Request {
      tokenData: TokenData;
    }
  }
}
