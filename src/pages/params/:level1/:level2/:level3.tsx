import { useMatch } from '@tanstack/react-location';
import { Nav } from '../../../../Nav';

const NestedPageParamsPage = () => {
  const match = useMatch();
  return (
    <div>
      <strong>pages/params/:level1/:level2/:level3.tsx</strong>
      <br />

      <code>{JSON.stringify(match.params)}</code>
      <hr />
      <Nav />
    </div>
  );
};

export default NestedPageParamsPage;
