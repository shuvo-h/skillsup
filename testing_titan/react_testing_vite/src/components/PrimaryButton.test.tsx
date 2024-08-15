import { render,screen } from "@testing-library/react";
import PrimaryButton from "./PrimaryButton";

describe("<PrimaryButton />",()=>{
    test('Should render correctly',()=>{
        render(<PrimaryButton />)
        const element = screen.getByText(/Click to Add/)

        expect(element).toBeInTheDocument()
    })
    test('Should render correctly with the action type if provided',()=>{
        render(<PrimaryButton actionType="Post" />)
        const element = screen.getByText(/Click to Post/)

        expect(element).toBeInTheDocument()
    })

})