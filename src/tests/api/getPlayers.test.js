import getPlayers from "../../api/getPlayers";

describe("Test the API Functions", () => {
  it("gets the correct players for given URL", async () => {
    const expectedResults = {
      first_name: "Stephen",
      fixture: {
        _members: ["112160"],
        _ref: "fixtures.id"
      },
      fppg: 47.94303797468354,
      id: "15475-9524",
      images: {
        default: {
          height: 200,
          url:
            "https://d17odppiik753x.cloudfront.net/playerimages/nba/9524.png",
          width: 200
        }
      }
    };

    const results = await getPlayers();

    expect(results["players"][0]).toEqual(expectedResults);
  });
});
