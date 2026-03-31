// Model barrel export - import all models from a single entry point
// Usage: import { User, Module, Question, Result, IUser, IModule, IQuestion, IResult } from './models';

export { default as User } from './User';
export { default as Module } from './Module';
export { default as Question } from './Question';
export { default as Result } from './Result';

export type { IUser } from './User';
export type { IModule } from './Module';
export type { IQuestion } from './Question';
export type { IResult } from './Result';

