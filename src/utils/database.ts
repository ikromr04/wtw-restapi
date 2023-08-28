export const createURI = (
  user: string,
  password: string,
  host: string,
  port: string,
  name: string,
): string =>
  `mongodb://${user}:${password}@${host}:${port}/${name}?authSource=admin`
