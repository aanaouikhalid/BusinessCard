export async function onRequestGet(context) {
  try {
    // Check if DB binding exists
    if (!context.env || !context.env.DB) {
      return Response.json(
        {
          success: false,
          error: "DB binding is not configured"
        },
        { status: 500 }
      );
    }

    // Test database connection
    const result = await context.env.DB
      .prepare(`
        SELECT name
        FROM sqlite_master
        WHERE type = 'table'
        ORDER BY name
      `)
      .all();

    return Response.json({
      success: true,
      database: "businesscard-db",
      tables: result.results || []
    });

  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error?.message || "Database error"
      },
      { status: 500 }
    );
  }
}
