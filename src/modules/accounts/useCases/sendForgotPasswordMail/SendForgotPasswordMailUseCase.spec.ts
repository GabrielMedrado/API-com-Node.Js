import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { SendForgotPasswordMailUseCase } from '@modules/sendForgotPasswordMail/SendForgotPasswordMailUseCase';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/DateProvider/MailProvider/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe('Send Forgot Mail', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider,
        );
    });

    it('Should be able to send a forgot password mail to user', async () => {
        const sendMail = spyOn(mailProvider, 'sendMail');

        await usersRepositoryInMemory.create({
            driver_license: '798653',
            email: 'emaill@email.com',
            name: 'Lucas Fake',
            password: '1234',
        });

        await sendForgotPasswordMailUseCase.execute('emaill@email.com');

        expect(sendMail).toHaveBeenCalled();
    });

    it('Should not be able to send an email if user does not exists', async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute('ka@uj.com'),
        ).rejects.toEqual(new AppError('User does not exists!'));
    });

    it('Should be able to create an users token', async () => {
        const generateTokenMail = spyOn(
            usersTokensRepositoryInMemory,
            'create',
        );

        usersRepositoryInMemory.create({
            driver_license: '987654',
            email: 'emaill@email2.com',
            name: 'Pedro Fake',
            password: '1234',
        });

        await sendForgotPasswordMailUseCase.execute('emaill@email2.com');

        expect(generateTokenMail).toBeCalled();
    });
});
