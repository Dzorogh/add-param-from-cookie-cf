import { parse } from 'cookie'

export async function addParamFromCookie(request: Request, cookieName: string) {
  let url = new URL(request.url)

  const cookieValue = getCookie(request, cookieName)

  url = await addCookieToQuery(url, cookieName, cookieValue)

  return new Request(url, request)
}

function addCookieToQuery(url: URL, cookieName: string, cookieValue: string, ) {
  url.searchParams.set('_CF_CACHE_' + cookieName, cookieValue);

  return url
}

function getCookie(request: Request, cookieName:string): string {
  const cookie = parse(request.headers.get("Cookie") || "");
  if (cookie[cookieName] != null) {
    return String(cookie[cookieName])
  } else {
    return ''
  }
}
