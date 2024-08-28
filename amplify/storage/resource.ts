import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "Polaroid_Storage",
  isDefault: true,
  access: (allow) => ({
    "polaroid_picture/{entity_id}/*": [allow.entity("identity").to(["read", "write", "delete"])],
  }),
});
