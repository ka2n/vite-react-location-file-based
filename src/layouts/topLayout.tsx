import { Nav } from "../Nav";
import { LayoutComponent } from "../route-loader";

export const topLayout: LayoutComponent = (page) => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      topLayout
      <Nav />
      <hr />
      <div>{page}</div>
    </div>
  );
};
