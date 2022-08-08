import { topLayout } from "../layouts/topLayout";
import { PageConfig } from "../route-loader";

const TopPage = () => {
  return <div>Top</div>;
};

export const config: PageConfig = {
  layout: topLayout,
};

export default TopPage;
