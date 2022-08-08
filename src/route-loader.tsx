import {
  DefaultGenerics,
  PartialGenerics,
  Route,
  RouteLoaders,
} from '@tanstack/react-location';

type PageModule<TGenerics extends PartialGenerics = DefaultGenerics> = {
  default: React.ComponentType<{}>;
  config: Partial<RouteLoaders<TGenerics>>;
};

const setRoute = (
  routes: Route[],
  paths: string[],
  onLeaf: (r: Route) => unknown
) => {
  const first = paths.shift();
  let route = routes.reverse().find((r) => r.path === first);
  !route && routes.push((route = { path: first }));

  if (paths.length === 0) {
    onLeaf(route);
  }

  if (paths.length) {
    route.children ??= [];
    setRoute(route.children, paths, onLeaf);
  }
};

const projectBasePath = '/src/pages/';
const pageFiles = import.meta.glob(['/src/pages/**/*.tsx', '!**/_*.tsx'], {
  eager: false,
});

const result = Object.entries(pageFiles)
  .map(
    ([key, module]) => [key.substring(projectBasePath.length), module] as const
  )
  .reduce((acc, [path, module]) => {
    setRoute(acc, path.split('/'), (route) => {
      route.path = route.path?.replace(/\.tsx$/, '');
      if (route.path === 'index') {
        route.path = '/';
      }
      route.import = async () => {
        const { default: Page, config } = (await module()) as PageModule;
        return {
          ...config,
          element: <Page />,
        } as RouteLoaders<any>;
      };
    });
    return acc;
  }, [] as Route[]);
console.log(result);

export default result;
