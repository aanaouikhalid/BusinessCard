export async function onRequestGet(context) {
  try {
    const result = await context.env.DB
      .prepare(`
        SELECT
          p.id,
          p.name,
          p.slug,
          p.description,
          p.price,
          p.compare_price,
          p.stock,
          p.sku,
          p.image_url,
          p.is_active,
          p.featured,
          p.category_id,
          c.name AS category_name
        FROM products p
        LEFT JOIN categories c
          ON p.category_id = c.id
        WHERE p.is_active = 1
        ORDER BY p.created_at DESC
      `)
      .all();

    return Response.json({
      success: true,
      products: result.results
    });

  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
