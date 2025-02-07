// ================================================================================>> Third Party Library
// Decoder
import { jwtDecode } from "jwt-decode"

// ================================================================================>> Custom Library
import { User } from '../user/user.types';

interface TokenPayload {
    exp: number
    iat: number
    user: User;
}

export class AuthUtils {

    /**
     * Is token expired?
     *
     * @param token
     */
    static isTokenExpired(token: string): boolean {
        // Return if there is no token
        if (!token || token === '') {
            return true;
        }

        // Get the expiration exp
        const exp = this._getTokenExpirationDate(token);

        if (exp === null) {
            return true;
        }

        const expirationTime = exp * 1000; // Convert to milliseconds

        if (expirationTime < Date.now()) {
            // Token is expired
            return true;
        } else {
            // Token is still valid
            return false;
        }
    }

    private static _getTokenExpirationDate(token: string): number | null {

        // Get the decoded token
        const decodedToken: TokenPayload = jwtDecode(token);

        // Return if the decodedToken doesn't have an 'exp' field
        if (!decodedToken.hasOwnProperty('exp')) {
            return null;
        }

        return decodedToken.exp;
    }
}
