import { RouteDefinition } from '~/interfaces/routes';
import { ROUTE_DEFINITIONS } from '~/configs/routesDefinitions';

export function findRouteDefinition(path: string): RouteDefinition | undefined {
  const basePath = path.split('?')[0];
  const segments = basePath.split('/').filter(Boolean); // filtra partes vazias

  for (const [, definition] of Object.entries(ROUTE_DEFINITIONS)) {
    const defSegments = definition.path.split('/').filter(Boolean);

    if (defSegments.length === segments.length) {
      let match = true;
      for (let i = 0; i < defSegments.length; i++) {
        if (defSegments[i].startsWith(':')) {
          continue;
        }
        if (defSegments[i] !== segments[i]) {
          match = false;
          break;
        }
      }
      if (match) {
        return definition;
      }
    }
  }
  return undefined;
}
