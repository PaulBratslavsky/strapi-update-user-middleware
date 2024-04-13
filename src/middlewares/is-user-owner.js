"use strict";

/**
 * `is-user-owner` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info("In is-user-owner middleware.");

    console.log("ctx.state", ctx.state);

    if (!ctx.state?.user) {
      strapi.log.error("You are not authenticated.");
      return ctx.badRequest("You are not authenticated.");
    }

    const params = ctx.params;
    const currentUserId = ctx.state?.user?.id;
    const requestedUserId = params?.id;

    console.log("currentUserId", Number(currentUserId));
    console.log("requestedUserId", Number(requestedUserId));

    if (!requestedUserId) {
      strapi.log.error("Missing user ID.");
      return ctx.badRequest("Missing or invalid user ID.");
    }

    if (Number(currentUserId) !== Number(requestedUserId)) {
      return ctx.unauthorized("You are not authorized to perform this action.");
    }

    await next();
  };
};

/*

// Check if the requested user ID is missing or invalid.
    if (!requestedUserId) {
      strapi.log.error("Missing or invalid user ID in request parameters.");
      ctx.response.status = 400; // Bad Request
      ctx.body = {
        error: "Invalid Request",
        code: "INVALID_USER_ID",
        message: "Missing or invalid user ID provided."
      };
      return;
    }

    // Check if the current user is not the owner of the requested resource.
    if (currentUserId !== requestedUserId) {
      strapi.log.warn(`Unauthorized access attempt by user ${currentUserId}.`);
      ctx.response.status = 403; // Forbidden
      ctx.body = {
        error: "Unauthorized",
        code: "NOT_OWNER",
        message: "You are not authorized to perform this action on this resource."
      };
      return;
    }


*/
