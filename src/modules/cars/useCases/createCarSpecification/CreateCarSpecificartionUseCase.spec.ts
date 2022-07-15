import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecification: CreateCarSpecificationUseCase

describe (" Create Car Specification ", () => {

    beforeEach(() => {
        createCarSpecification = new CreateCarSpecificationUseCase();
    })

    it( "Should be able to add a new specification to the car", async () => {
        await createCarSpecification.execute()
    } )
})