import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { getContext } from '@netlify/angular-runtime/context.mjs';

// Inicializa Angular App Engine
const angularAppEngine = new AngularAppEngine();

// Función principal que Netlify invocará para cada request
export async function netlifyAppEngineHandler(
  request: Request
): Promise<Response> {
  const context = getContext();

  // Ejemplo: endpoints API
  const url = new URL(request.url);
  if (url.pathname === '/api/hello') {
    return new Response(
      JSON.stringify({ message: 'Hola desde Netlify API!' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Renderiza la app Angular
  const result = await angularAppEngine.handle(request, context);

  // Si no hay resultado, devuelve 404
  return result || new Response('Not found', { status: 404 });
}

// Handler que Netlify Runtime requiere
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);
