import Image from "next/image";
import React from "react";
// import Sidebar from "@/components/support/Sidebar";
import SiteWrapper from "@/components/support/SiteWrapper";

export default function Home() {
  const toc = [
    {
      depth: 2,
      value: "Reuse Component Library Documentation",
      children: [],
    },
    {
      depth: 3,
      value: "Get Started",
      children: [],
    },
    {
      depth: 3,
      value: "Available Components",
      children: [],
    },
    {
      depth: 3,
      value: "Documentation and Examples",
      children: [],
    },
    {
      depth: 3,
      value: "Contributing",
      children: [],
    },
    {
      depth: 3,
      value: "Support",
      children: [],
    },
  ];

  return (
    <SiteWrapper toc={toc}>
      <div className="px-4 mb-10">
        <h1
          className="text-3xl font-bold mt-6"
          id="reuse-component-library-documentation"
        >
          Reuse Component Library Documentation
        </h1>
        <p className="mt-3">
          Welcome to the documentation for the Reuse Component Library! Reuse is
          a collection of reusable React components designed to enhance your web
          development experience. Each component in the library is published
          individually, allowing you to pick and choose the ones you need for
          your projects.
        </p>
        <h1 className="text-2xl font-bold mt-6 " id="get-started">
          Get Started
        </h1>
        <p className="mt-3">
          To start using the Reuse Component Library, you can simply install the
          desired components from npm. Each component has its own npm package
          with the naming convention{" "}
          <span className="font-bold">{`@locoworks/reusejs-react-<component-name>`}</span>
          . You can install them using npm or yarn:
        </p>
        <pre className="w-full bg-[#1f2937] rounded px-2 py-4 mt-4">
          <code className=" text-white">{`npm install @locoworks/reusejs-react-<component-name>`}</code>
        </pre>
        <p>or</p>
        <pre className="w-full bg-[#1f2937] rounded px-2 py-4 mt-4">
          <code className=" text-white">{`yarn add @locoworks/reusejs-react-<component-name>`}</code>
        </pre>
        <p>
          Once installed, you can import and use the components in your React
          application.
        </p>
        <h2 className="text-2xl font-bold mt-5" id="available-components">
          Available Components
        </h2>
        <p>
          The Reuse Component Library offers a wide range of components to cater
          to various UI needs. Some of the key components available in the
          library are:
        </p>
        <ul className="home-list px-4 mt-2">
          <li>Button</li>
          <li>Input</li>
          <li>Input-Group</li>
          <li>OTP-Input</li>
          <li>Select-Dropdown</li>
        </ul>
        <h2 className="mt-5 text-2xl font-bold" id="documentation-and-examples">
          Documentation and Examples
        </h2>
        <p className="mt-3">
          In the documentation, you will find detailed information about each
          component, including usage examples, props, and customization options.
          We strive to provide clear and concise documentation to make it easier
          for you to integrate Reuse components into your projects.
        </p>
        <p className="mt-3">
          Additionally, you can explore the examples section to see live demos
          of the components in action. These examples will help you understand
          how to utilize the components effectively and demonstrate their
          versatility.
        </p>
        <h2 className="mt-5 text-2xl font-bold" id="contributing">
          Contributing
        </h2>
        <p className="mt-3">
          Reuse is an open-source project, and we welcome contributions from the
          community. If you encounter any issues, have suggestions for
          improvements, or want to contribute code, please visit our GitHub
          repository. We appreciate your support in making Reuse even better.
        </p>
        <h2 className="mt-5 text-2xl font-bold" id="support">
          Support
        </h2>
        <p className="mt-3">
          If you need any assistance or have any questions related to the Reuse
          Component Library, you can reach out to our support team or join our
          community forum. We are here to help and ensure a smooth experience
          for you.
        </p>
        <p className="mt-3">
          Thank you for choosing the Reuse Component Library! We hope it
          simplifies your development process and helps you build amazing
          applications. Happy coding!
        </p>
      </div>
    </SiteWrapper>
  );
}
