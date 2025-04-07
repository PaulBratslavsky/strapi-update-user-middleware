'use strict';

module.exports = {
  register({ strapi }) {
    const userRoutes = strapi.plugins["users-permissions"].routes["content-api"].routes;
    const isUserOwnerMiddleware = "global::is-user-owner";

    const findOneUser = userRoutes.findIndex(
      (route) => route.handler === "user.findOne" && route.method === "GET"
    )

    const findUpdateUser = userRoutes.findIndex(
      (route) => route.handler === "user.update" && route.method === "PUT"
    );

    function initializeRoute(routes, index) {
      routes[index].config.middlewares = routes[index].config.middlewares || [];
      routes[index].config.policies = routes[index].config.policies || [];
    }
    

    if (findOneUser >= 0) {
      initializeRoute(userRoutes, findOneUser);
      userRoutes[findOneUser].config.middlewares.push(isUserOwnerMiddleware);
    }

    if (findUpdateUser >= 0) {
      initializeRoute(userRoutes, findUpdateUser);
      userRoutes[findUpdateUser].config.middlewares.push(isUserOwnerMiddleware);
    }

    console.log(userRoutes[findOneUser], "userRoutes[findUser]")
    console.log(userRoutes[findUpdateUser], "userRoutes[findUpdateUser]")
  },


  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
