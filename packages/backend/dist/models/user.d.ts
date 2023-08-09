/**
 * User that can be stored/retrieved from the table
 *
 * The password must be hashed, or set to null, if it is
 * to be hidden for security reasons
 */
export interface User {
    userId: string;
    fullName: string;
    email: string;
    password: string | undefined;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * Replaces password with null, to be sent to the client
 * @param user user to be mutated
 */
export declare function removePassword(user: User): User;
export interface CreateUser {
    fullName: string;
    email: string;
    password: string;
}
export declare enum UserCreateError {
    EmailAlreadyExists = 0,
    DatabaseAccessError = 1
}
export interface UsersTable {
    /**
     * Get a list of all users
     *
     * Should call `removePassword` on all users before
     * sending to client
     */
    getAll(): Promise<User[]>;
    /**
     * Gets a single user by the uuid
     *
     * Should call `removePassword` before sending to
     * client
     *
     * returns null if doesn't exist
     *
     * @param userId uuid of the user
     */
    getById(userId: string): Promise<User | null>;
    /**
     * Get a single user by the email
     *
     * Should call `removePassword` before sending to
     * client
     *
     * returns null if doesn't exist
     *
     * @param email email address of the user
     */
    getByEmail(email: string): Promise<User | null>;
    /**
     * Creates a new email in database
     *
     * Internally hashes the password, and inserts it into database
     *
     * Returns the newly created user, Should call `removePassword`
     * before sending to client
     *
     * @param user user to be created
     */
    createNew(user: CreateUser): Promise<{
        user: User | null;
        error: UserCreateError | null;
    }>;
}
//# sourceMappingURL=user.d.ts.map