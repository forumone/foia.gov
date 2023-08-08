const config = {
  stories: ["../js/stories/*.mdx", "../js/stories/*.stories.@(js|jsx|ts|tsx)"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../_site"],
  webpackFinal: async (config, { configType }) => {
    return config;
  },
};
export default config;
