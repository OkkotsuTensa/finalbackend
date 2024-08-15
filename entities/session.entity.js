import { Entity } from "electrodb"; // ORM(Object relation mapping) // Adapter on adapter

import { client } from "../util/dbconnection.js";

const Session = new Entity(
  {
    model: {
      entity: "session",
      version: "1",
      service: "sessionService",
    },
    attributes: {
      userName: {
        type: "string",
        required: true,
      },
      token: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          facets: ["token"],
        },
        sk: {
          field: "sk",
          facets: [],
        },
      },
    },
  },
  { client, table: "session" }
);

export { Session };
