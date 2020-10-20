import React from "react";
import { render } from "@testing-library/react";

import TaskOverview from "../../components/TaskOverview";
// TODO:  cover all reducer actions
// Open Question : how to best test Components like the overview, without a lot of duplicate tests

test
("Load initially", ()=>{
    //TODO: Mock API conection here jest.mock() with module that handles API connection
    const {getByLabelText, getByText} = render(<TaskOverview/>)
    const loadingText = getByText("loading")
    expect(loadingText).toBeInTheDocument();
    

})