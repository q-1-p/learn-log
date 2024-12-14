import { Suspense } from "react";
import Content from "./Content";

export default function App() {
  return (
    <>
      <title data-testid="title">Hello Jest</title>
        <Content />
    </>
  );
}