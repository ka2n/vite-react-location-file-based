import {
  DefaultGenerics,
  PartialGenerics,
  Route as RouteType,
  RouteLoaders,
} from "@tanstack/react-location";
import React from "react";

type Route = RouteType & {
  __config?: () => Promise<PageConfig>;
};

export type LayoutComponent = (page: React.ReactElement) => React.ReactElement;

export type PageConfig<TGenerics extends PartialGenerics = DefaultGenerics> =
  Omit<Partial<RouteLoaders<TGenerics>>, "element"> & {
    layout?: LayoutComponent;
  };

export type PageModule<TGenerics extends PartialGenerics = DefaultGenerics> = {
  default: React.ComponentType<{}>;
  config: PageConfig<TGenerics>;
};

const setRoute = (
  parent: Route,
  paths: string[],
  callbacks: {
    onLeaf: (r: Route, parent: Route) => unknown;
    onConfig: (r: Route) => unknown;
  }
) => {
  const first = paths.shift();
  const isLeaf = paths.length === 0;
  const isPage = first !== "_config.tsx";
  const routes = (parent.children ??= []) as Route[];
  let route = routes.reverse().find((r) => r.path === first);

  if (isPage) {
    !route &&
      routes.push(
        (route = {
          id: paths.join("/"),
          path: first,
          children: [],
        })
      );
    if (isLeaf) {
      callbacks.onLeaf(route, parent);
    } else {
      setRoute(route, paths, callbacks);
    }
  } else {
    callbacks.onConfig(parent);
  }
};

const projectBasePath = "/src/pages/";
const pageFiles = import.meta.glob(["/src/pages/**/*.tsx"], {
  eager: false,
});

const rootRoute = Object.entries(pageFiles)
  .map(
    ([key, module]) => [key.substring(projectBasePath.length), module] as const
  )
  .reduce(
    (acc, [path, module]) => {
      setRoute(acc, path.split("/"), {
        onConfig: (route) => {
          const configLoader = route.__config;
          console.log("config", route);
          route.__config = async () => {
            const configs = await Promise.all([
              configLoader ? configLoader() : Promise.resolve({}),
              (module() as Promise<PageModule>).then((m) => m.config),
            ]);
            return configs.reduce((acc, config) => ({ ...acc, ...config }), {});
          };
        },
        onLeaf: (route, parent) => {
          route.path = route.path?.replace(/\.tsx$/, "");
          if (route.path === "index") {
            route.path = "/";
          }
          route.import = async () => {
            const { default: Page, config: pageConfig = {} } =
              (await module()) as PageModule;

            const parentConfig = await parent.__config?.();
            const { layout = DefaultLayout, ...config } = {
              ...parentConfig,
              ...pageConfig,
            };

            return {
              ...config,
              element: layout(<Page />),
            };
          };
        },
      });
      return acc;
    },
    { id: "root" } as Route
  );

const DefaultLayout: LayoutComponent = (page) => <>{page}</>;

const routes = [rootRoute];
console.log(routes);

export default routes;
