export function extractTokenFromHeaders(headers) {
  const bearerToken = headers['authorization'];
  return bearerToken?.substring(7, bearerToken.length)
}
