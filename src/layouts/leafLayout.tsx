import { Nav } from "../Nav";
import { LayoutComponent } from "../route-loader";

export const leafLayout: LayoutComponent = (page) => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      leafLayout
      <Nav />
      <hr />
      <div>{page}</div>
    </div>
  );
};
