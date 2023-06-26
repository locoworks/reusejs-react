import Image from "next/image";
import React from "react";
import Sidebar from "./Sidebar";
// import extractToc from "remark-extract-toc";
// import { read } from "to-vfile";
// import { remark } from "remark";
// import remarkToc from "remark-toc";

interface TocNode {
  depth: number;
  value: string;
  children: TocNode[];
}

interface SiteWrapperProps {
  children: React.ReactNode;
  toc?: TocNode[];
}

const renderToC = (toc: TocNode[]) => {
  return toc.map((node) => {
    if (node.value.includes("title") && node.value.includes("author")) return;
    const link = (
      <a href={`#${node.value.toLowerCase().split(" ").join("-")}`}>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap hover:underline">
          {node.value}
        </p>
      </a>
    );
    switch (node.depth) {
      case 1:
        return (
          <li className="text-md font-light " key={"ele" + node.value}>
            {link}
          </li>
        );
      case 2:
        return (
          <li className="text-md font-light" key={"ele" + node.value}>
            {link}
          </li>
        );
      case 3:
        return (
          <li className="text-md font-light ml-4" key={"ele" + node.value}>
            {link}
          </li>
        );
      case 4:
        return (
          <li className="text-md font-light ml-6" key={"ele" + node.value}>
            {link}
          </li>
        );
      case 5:
        return (
          <li className="text-md font-light ml-8" key={"ele" + node.value}>
            {link}
          </li>
        );
      case 6:
        return (
          <li className="text-md font-light ml-10" key={"ele" + node.value}>
            {link}
          </li>
        );
      default:
        return (
          <li className="text-md font-light ml" key={"ele" + node.value}>
            {link}
          </li>
        );
    }
  });
};

export default function SiteWrapper({ children, toc }: SiteWrapperProps) {
  // console.log(">>>>>", toc);

  const content = `What is Lorem Ipsum?
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
  
  Why do we use it?
  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
  
  
  Where does it come from?
  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
  
  The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`;

  return (
    <main className="h-screen">
      {/* <div>This will be the home site for docs</div> */}
      <div className="z-10 h-[6%] flex items-center py-4 pl-10 pr-4 justify-between border border-[#5501BF36] bg-white">
        <label className="text-lg text-[#5501BF]">
          <span className="font-bold">LOCO</span>WORKS
        </label>
        <div className="flex gap-x-10">
          {/* <Link href={"https://github.com/locoworks"}> */}
          {/* <GitHubIcon /> */}
          {/* </Link> */}
        </div>
      </div>
      <div className="flex h-[94%]">
        <div className="hidden md:flex md:flex-col w-[20%] h-full border-r border-[#5501BF36] px-2 pt-10">
          <Sidebar />
        </div>
        <div className="w-full md:w-[58%] overflow-scroll px-2">{children}</div>
        <div className="hidden md:flex w-[22%] bg-[#b99cdc36] flex-col px-2 pt-10">
          <label className="font-bold text-md">Table of Contents</label>
          <ul className="ml-2 list-image-[`#`]">{toc && renderToC(toc)}</ul>
        </div>
      </div>
    </main>
  );
}
