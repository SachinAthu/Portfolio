import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    table: ({ children, ...rest }) => (
      <div className="article-table-wrapper">
        <table {...rest}>{children}</table>
      </div>
    ),
    ...components,
  };
}
