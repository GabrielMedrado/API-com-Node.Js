import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ListRentalsByUserUseController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserUseController();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);

rentalRoutes.post(
    '/devolution/:id',
    ensureAuthenticated,
    devolutionRentalController.handle,
);

rentalRoutes.get(
    '/user',
    ensureAuthenticated,
    listRentalsByUserController.handle,
);

export { rentalRoutes };
