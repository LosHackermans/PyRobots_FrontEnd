import { render, screen, cleanup } from "@testing-library/react";
import Results from "./Results";

afterEach(() => {
    cleanup();
});

describe("March results test", () => {
    it("Should print one winner", async () => {
        render(<Results results={[{User: "pepe1", Robot: "robot1"}]} />);
        const results = screen.getByText('Won');
        expect(results).toBeInTheDocument();
    });

    it("Should print tie", async () => {
        render(<Results results={[{User: "pepe1", Robot: "robot1"}, {User: "pepe2", Robot: "robot2"}]} />);
        const results = screen.getByText('Tie');
        expect(results).toBeInTheDocument();
    });
})