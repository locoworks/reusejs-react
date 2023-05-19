import { MDXProvider } from "@mdx-js/react";
import { Heading } from "../components/Headings";

interface LayoutProps {
  children: React.ReactNode;
}

const components = {
  h1: Heading.H1,
  h2: Heading.H2,
};

function Layout({ children, ...props }: LayoutProps) {
  return (
    <div className="prose">
      <MDXProvider components={components}>
        <div className="no-styles">{children}</div>
      </MDXProvider>
    </div>
  );
}

export default Layout;
