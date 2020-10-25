import React from "react";
import { render } from "@testing-library/react";
import {apiService} from "../../services/mockedApiService"
import {mocked} from "ts-jest/utils"

import TaskOverview from "../../components/TaskOverview";
import { undoneTask } from "../../fixtures/taskFixtures";
// TODO:  cover all reducer actions

jest.mock("../../services/mockedApiService")

test
("Load initially", async ()=>{
    
    mocked(apiService).get.mockResolvedValue([undoneTask]);

    const {findByLabelText, getByText} = render(<TaskOverview/>)
    // TODO: check if skeleton gets rendered
    //const loadingText = getByText("...loading")
    // expect(loadingText).toBeInTheDocument();
    await findByLabelText(undoneTask.name)
    expect(mocked(apiService).get).toBeCalledTimes(1);
})