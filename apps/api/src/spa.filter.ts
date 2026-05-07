import { ExceptionFilter, Catch, NotFoundException, ArgumentsHost } from '@nestjs/common';
import { join } from 'path';

@Catch(NotFoundException)
export class SpaFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const req = host.switchToHttp().getRequest();
    const res = host.switchToHttp().getResponse();
    const path: string = req.path;

    // Let real 404s through for API and asset paths
    if (path.startsWith('/api') || path.startsWith('/socket.io') || /\.\w+$/.test(path)) {
      res.status(404).json(exception.getResponse());
      return;
    }

    // SPA fallback — serve index.html for all client-side routes
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  }
}
