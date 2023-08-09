export interface AuthTokenGenerator {
    createToken(userId: string): string;
    /**
     * Gets the userid from the token
     * 
     * returns null if is invalid
     * 
     * @param token the token to get the userid of
     */
    getUserId(token: string): string | null;
}
