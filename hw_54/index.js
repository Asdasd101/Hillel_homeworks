import { isProductionMode } from "./config.js";
import { getUserGreeting } from "./greeting.js";

console.log(isProductionMode());
console.log(getUserGreeting());