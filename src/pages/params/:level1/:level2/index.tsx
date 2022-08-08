import { useMatch } from '@tanstack/react-location';
import { Nav } from '../../../../Nav';

const NestedParamsPage = () => {
  const match = useMatch();
  return (
    <div>
      <strong>pages/params/:level1/level2/index.tsx</strong>
      <br />

      <code>{JSON.stringify(match.params)}</code>

      <hr />
      <Nav />
    </div>
  );
};

export default NestedParamsPage;
