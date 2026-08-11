export async function onRequestGet(context) {
  return new Response(
    JSON.stringify({
      success: true,
      message: "TEST DB FUNCTION WORKS",
      hasDB: !!context.env?.DB
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
