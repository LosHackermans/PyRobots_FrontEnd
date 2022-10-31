import { render, screen, within, cleanup } from "@testing-library/react";
import ListMatches from "./ListMatches"
import axios from "axios"

jest.mock('axios');

const matchesTest = {
  "User_Games": [
    { 'id': 1, 'name': 'match1' },
    { 'id': 2, 'name': 'match2' },
    { 'id': 3, 'name': 'match3' }
  ],
  "Games_already_join": [
    { 'id': 4, 'name': 'match4' },
    { 'id': 5, 'name': 'match5' },
    { 'id': 6, 'name': 'match6' }
  ],
  "Games_To_Join": [
    { 'id': 7, 'name': 'match7' },
    { 'id': 8, 'name': 'match8' },
    { 'id': 9, 'name': 'match9' }
  ]
}

beforeEach(async () => {
  await axios.get.mockImplementation(() => Promise.resolve({ status: 200, data: matchesTest }));
})

afterEach(() => {
  cleanup();
});

describe("ListMatches tests", () => {
  it("should recive and show all created matches", async () => {
    render(<ListMatches/>);

    const { findByText } = within(screen.getByTestId('created_matches'));
    for (let i = 0; i < matchesTest.User_Games.length; i++) {
      expect(await findByText(matchesTest.User_Games[i].name)).toBeInTheDocument();
    }
  })

  it("should recive and show all joined matches", async () => {
    render(<ListMatches/>);

    const { findByText } = within(screen.getByTestId('joined_matches'));
    for (let i = 0; i < matchesTest.Games_already_join.length; i++) {
      expect(await findByText(matchesTest.Games_already_join[i].name)).toBeInTheDocument();
    }
  })

  it("should recive and show all joinable matches", async () => {
    render(<ListMatches/>);

    const { findByText } = within(screen.getByTestId('joinable_matches'));
    for (let i = 0; i < matchesTest.Games_To_Join.length; i++) {
      expect(await findByText(matchesTest.Games_To_Join[i].name)).toBeInTheDocument();
    }
  })
})