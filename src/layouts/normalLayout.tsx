import { Nav } from "../Nav";
import { LayoutComponent } from "../route-loader";

export const normalLayout: LayoutComponent = (page) => {
  return (
    <div style={{ width: "100%" }}>
      normalLayout
      <Nav />
      <hr />
      <div>{page}</div>
    </div>
  );
};
