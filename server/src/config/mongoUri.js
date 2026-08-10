import { Resolver } from "dns2";

const resolver = new Resolver({
  nameServers: ["1.1.1.1", "8.8.8.8"],
});

export const getMongoUri = async () => {
  const srv = await resolver.resolve(
    "_mongodb._tcp.cluster0.gqv1dl8.mongodb.net",
    "SRV"
  );

  console.log(srv);

  return process.env.MONGO_URI;
};