import React from "react";
import { Button } from "../ui/button";
// Ensure this path is correct

const Home = () => {
  return (
    <div>
      {/* Corrected variant prop */}
      <div>hello</div>
      <Button variant="default">Click me</Button>
    </div>
  );
};

export default Home;
