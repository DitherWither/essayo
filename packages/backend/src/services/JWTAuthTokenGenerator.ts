import { AuthTokenGenerator } from "./AuthTokenGenerator";
import * as jwt from "jsonwebtoken";

export class JWTAuthTokenGenerator implements AuthTokenGenerator {
    private secretKey: string;

    constructor(secretKey: string) {
        this.secretKey = secretKey;
    }
    getUserId(token: string): string | null {
        try {
            const tok = jwt.verify(token, this.secretKey);
            if (typeof tok == "string") {
                return JSON.parse(tok).userId ?? null;
            } else {
                return null; // the token was invalid
            }
        } catch (e) {
            return null;
        }
    }

    createToken(userId: string): string {
        return jwt.sign({ userId }, this.secretKey);
    }
}
