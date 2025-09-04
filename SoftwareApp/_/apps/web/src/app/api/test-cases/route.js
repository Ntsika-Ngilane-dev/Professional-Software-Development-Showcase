import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const project_id = searchParams.get('project_id');
    const task_id = searchParams.get('task_id');
    const test_type = searchParams.get('test_type');
    const status = searchParams.get('status');

    let query = `
      SELECT tc.*, t.title as task_title, p.name as project_name
      FROM test_cases tc
      LEFT JOIN tasks t ON tc.task_id = t.id
      LEFT JOIN projects p ON tc.project_id = p.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 0;

    if (project_id) {
      paramCount++;
      query += ` AND tc.project_id = $${paramCount}`;
      params.push(project_id);
    }

    if (task_id) {
      paramCount++;
      query += ` AND tc.task_id = $${paramCount}`;
      params.push(task_id);
    }

    if (test_type) {
      paramCount++;
      query += ` AND tc.test_type = $${paramCount}`;
      params.push(test_type);
    }

    if (status) {
      paramCount++;
      query += ` AND tc.status = $${paramCount}`;
      params.push(status);
    }

    query += ' ORDER BY tc.created_at DESC';

    const testCases = await sql(query, params);
    return Response.json(testCases);
  } catch (error) {
    console.error('Error fetching test cases:', error);
    return Response.json({ error: 'Failed to fetch test cases' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      project_id, 
      task_id, 
      name, 
      description, 
      test_type = 'unit', 
      status = 'pending' 
    } = body;

    if (!project_id || !name) {
      return Response.json({ error: 'Project ID and test name are required' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO test_cases (project_id, task_id, name, description, test_type, status)
      VALUES (${project_id}, ${task_id}, ${name}, ${description}, ${test_type}, ${status})
      RETURNING *
    `;

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating test case:', error);
    return Response.json({ error: 'Failed to create test case' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, name, description, test_type, status } = body;

    if (!id) {
      return Response.json({ error: 'Test case ID is required' }, { status: 400 });
    }

    const setClauses = [];
    const values = [];
    let paramCount = 0;

    if (name !== undefined) {
      paramCount++;
      setClauses.push(`name = $${paramCount}`);
      values.push(name);
    }

    if (description !== undefined) {
      paramCount++;
      setClauses.push(`description = $${paramCount}`);
      values.push(description);
    }

    if (test_type !== undefined) {
      paramCount++;
      setClauses.push(`test_type = $${paramCount}`);
      values.push(test_type);
    }

    if (status !== undefined) {
      paramCount++;
      setClauses.push(`status = $${paramCount}`);
      values.push(status);
    }

    if (setClauses.length === 0) {
      return Response.json({ error: 'No fields to update' }, { status: 400 });
    }

    paramCount++;
    values.push(id);

    const query = `
      UPDATE test_cases 
      SET ${setClauses.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await sql(query, values);
    
    if (result.length === 0) {
      return Response.json({ error: 'Test case not found' }, { status: 404 });
    }

    return Response.json(result[0]);
  } catch (error) {
    console.error('Error updating test case:', error);
    return Response.json({ error: 'Failed to update test case' }, { status: 500 });
  }
}