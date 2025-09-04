import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const methodology = searchParams.get('methodology');

    let query = 'SELECT * FROM projects WHERE 1=1';
    const params = [];
    let paramCount = 0;

    if (status) {
      paramCount++;
      query += ` AND status = $${paramCount}`;
      params.push(status);
    }

    if (methodology) {
      paramCount++;
      query += ` AND methodology = $${paramCount}`;
      params.push(methodology);
    }

    query += ' ORDER BY created_at DESC';

    const projects = await sql(query, params);
    return Response.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return Response.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, methodology = 'agile', start_date, end_date } = body;

    if (!name) {
      return Response.json({ error: 'Project name is required' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO projects (name, description, methodology, start_date, end_date)
      VALUES (${name}, ${description}, ${methodology}, ${start_date}, ${end_date})
      RETURNING *
    `;

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return Response.json({ error: 'Failed to create project' }, { status: 500 });
  }
}