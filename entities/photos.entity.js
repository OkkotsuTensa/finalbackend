import { Entity } from "electrodb"; // ORM(Object relation mapping) // Adapter on adapter

import { client } from "../util/dbconnection.js";

const Photos = new Entity(
  {
    model: {
      entity: "Photos",
      version: "2",
      service: "PhotoService",
    },
    attributes: {
      photoId: {
        type: "string",
      },
      url: {
        type: "string",
      },
      description: {
        type: "string",
      },
      createdAt: {
        type: "string",
      },
      userName: {
        type: "string",
      },
      type: {
        type: "string",
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          facets: ["photoId"],
        },
        sk: {
          field: "sk",
          facets: [],
        },
      },
      
    },
    },
  { client, table: "Photos" }
);

export { Photos };
