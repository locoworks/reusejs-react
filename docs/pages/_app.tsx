import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MDXProvider } from "@mdx-js/react";
import { CodeProcessor } from "@locoworks/reusejs-react-code-preview";

export default function App({ Component, pageProps }: any) {
  const components: any = {
    pre: (props: any) => {
      if (props.children?.props?.children?.includes("[TO-SPLIT]")) {
        return CodeProcessor(props?.children?.props?.children);
      } else {
        return (
          <pre>
            <code>{props.children}</code>
          </pre>
        );
      }
    },
  };

  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}
