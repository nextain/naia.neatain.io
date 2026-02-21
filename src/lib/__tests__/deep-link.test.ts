import test from "node:test";
import assert from "node:assert/strict";
import { buildNaiaAuthDeepLink } from "../deep-link";

test("builds base deep link with key and state", () => {
  const url = buildNaiaAuthDeepLink({ key: "gw-abc", state: "st-1" });
  assert.equal(url, "naia://auth?key=gw-abc&state=st-1");
});

test("builds discord deep link with normalized discord ids", () => {
  const url = buildNaiaAuthDeepLink({
    key: "gw-abc",
    state: "st-1",
    channel: "discord",
    discordUserId: "1473170396390883564",
  });

  assert.equal(
    url,
    "naia://auth?key=gw-abc&state=st-1&channel=discord&discord_user_id=1473170396390883564&user_id=1473170396390883564&discord_target=user%3A1473170396390883564",
  );
});

test("keeps explicit discord target when provided", () => {
  const url = buildNaiaAuthDeepLink({
    key: "gw-abc",
    channel: "discord",
    discordUserId: "1473170396390883564",
    discordTarget: "channel:1474553973405913290",
  });

  assert.equal(
    url,
    "naia://auth?key=gw-abc&channel=discord&discord_user_id=1473170396390883564&user_id=1473170396390883564&discord_target=channel%3A1474553973405913290",
  );
});
