import { AuthTokenGenerator } from "./AuthTokenGenerator";
export declare class JWTAuthTokenGenerator implements AuthTokenGenerator {
    private secretKey;
    constructor(secretKey: string);
    getUserId(token: string): string | null;
    createToken(userId: string): string;
}
//# sourceMappingURL=JWTAuthTokenGenerator.d.ts.map