export async function onRequestGet(context) {
  try {
    const result = await context.env.DB
      .prepare("SELECT name FROM sqlite_master WHERE type='table'")
      .all();

    return Response.json({
      success: true,
      database: "businesscard-db",
      tables: result.results
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
