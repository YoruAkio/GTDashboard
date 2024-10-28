export default async function handler(req) {
  let responseText = 'Hello World'

  return new Response(responseText)
}
