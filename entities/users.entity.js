import { Entity } from "electrodb"; 

import { client } from "../util/dbconnection.js";

const Users = new Entity(
  {
    model: {
      entity: "Users",
      version: "1",
      service: "UsersService",
    },
    attributes: {
      userName: {
        type: "string",
        required: true,
      },
      password: {
        type: "string",
        required: true,
      },
      roleId: {
        type: "number",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          facets: ["userName"],
        },
        sk: {
          field: "sk",
          facets: [],
        },
      },
    },
  },
  { client, table: "Users" }
);

export { Users };
