import {check} from "./input_checks.mjs";

const given = "3305";
let ans;
// ans = await check.not_null(given);
// ans = await check.length(given, 32);
ans = await check.type(given, "integer");

console.log("the evaluation is = ", ans);