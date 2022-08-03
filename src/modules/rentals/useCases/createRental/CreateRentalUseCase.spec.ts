import { CreateRentalUseCase } from "./CreateRentalUseCase";


let createRentalUseCase: CreateRentalUseCase;



describe ("Create Rental", () => {
    beforeEach(() => {
        createRentalUseCase = new CreateRentalUseCase()
    });

    it ("Should be able to create a new rental", async () => {

        await createRentalUseCase.execute()
    })
})