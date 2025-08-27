/** @type { import('@storybook/react').Preview } */

import '../src/styles.scss';

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      // The `a` and `b` arguments in this function have a type of `import('@storybook/types').IndexEntry`. Remember that the function is executed in a JavaScript environment, so use JSDoc for IntelliSense to introspect it.
      storySort: (a, b) => {
        if(a.importPath.endsWith('.mdx') && b.importPath.endsWith('.mdx')) {
          return a.name.localeCompare(b.name)
        } else if(a.importPath.endsWith('.mdx') && !b.importPath.endsWith('.mdx')) {
          return -1
        } else if(!a.importPath.endsWith('.mdx') && b.importPath.endsWith('.mdx')) {
          return 1
        }
        else {
        //return a.name.localeCompare(b.name)
          -1
        }
      }
    },
  }
};

export default preview;
