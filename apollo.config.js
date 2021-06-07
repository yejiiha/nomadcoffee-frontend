module.exports = {
  client: {
    include: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "nomadcoffee-backend",
      url: "https://yejiiha-nomadcoffee-backend.herokuapp.com/graphql",
    },
  },
};
