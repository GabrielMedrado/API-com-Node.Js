import auth from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { verify } from 'jsonwebtoken';
import { inject } from 'tsyringe';

class RefreshTokenUseCase {
    constructor(
        @inject('UsersTokenRepository')
        private usersTokensRepository: IUsersTokensRepository,
    ) {}
    execute(token: string) {
        verify(token, auth.secret_refresh_token);
    }
}

export { RefreshTokenUseCase };
