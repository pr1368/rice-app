import { Resolver } from "dns2";

const resolver = new Resolver({
  nameServers: ["1.1.1.1", "8.8.8.8"],
});

export default resolver;