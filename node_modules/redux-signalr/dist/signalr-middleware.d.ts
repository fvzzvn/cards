import { SignalMiddleware, MiddlewareConfig } from './types';
declare const signal: ({ callbacks, onStart, connection, shouldConnectionStartImmediately, }: MiddlewareConfig) => SignalMiddleware;
export default signal;
