import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Aplique com @UseGuards(JwtAuthGuard) em qualquer controller/rota
// que deva exigir login.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
