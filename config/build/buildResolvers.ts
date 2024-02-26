import { ResolveOptions } from "webpack";

export function buildResilvers(): ResolveOptions{
    return {
        extensions: ['.tsx', '.ts', '.js'],
      }
}