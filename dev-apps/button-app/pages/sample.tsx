import React from "react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import fs from "fs";
import MDX from "../components/sample.mdx";
import matter from "gray-matter";

export interface Props {
  frontmatter: any;
  content: any;
}

const Sample: React.FC<Props> = ({ frontmatter, content }) => {
  // console.log("Front matter for tha page to use>>>", frontmatter);
  // console.log("This is content>>>>", content);
  // console.log("This is MDX>>>>>", MDX);

  return (
    <div className="prose">
      <MDX />
    </div>
  );
};

export async function getStaticProps() {
  const mdxSource = fs.readFileSync("components/sample.mdx", "utf8");
  const { data, content } = matter(mdxSource);

  return {
    props: {
      frontmatter: data,
      content: content,
    },
  };
}

export default Sample;
