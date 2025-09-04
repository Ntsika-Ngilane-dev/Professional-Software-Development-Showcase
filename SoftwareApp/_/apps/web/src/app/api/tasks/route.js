import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const project_id = searchParams.get('project_id');
    const status = searchParams.get('status');

    let query = `
      SELECT t.*, tm.name as assigned_name, tm.role as assigned_role
      FROM tasks t
      LEFT JOIN team_members tm ON t.assigned_to = tm.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 0;

    if (project_id) {
      paramCount++;
      query += ` AND t.project_id = $${paramCount}`;
      params.push(project_id);
    }

    if (status) {
      paramCount++;
      query += ` AND t.status = $${paramCount}`;
      params.push(status);
    }

    query += ' ORDER BY t.created_at DESC';

    const tasks = await sql(query, params);
    return Response.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return Response.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      project_id, 
      title, 
      description, 
      status = 'backlog', 
      priority = 'medium', 
      story_points = 1, 
      assigned_to 
    } = body;

    if (!project_id || !title) {
      return Response.json({ error: 'Project ID and title are required' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO tasks (project_id, title, description, status, priority, story_points, assigned_to)
      VALUES (${project_id}, ${title}, ${description}, ${status}, ${priority}, ${story_points}, ${assigned_to})
      RETURNING *
    `;

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return Response.json({ error: 'Failed to create task' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, status, priority, story_points, assigned_to, title, description } = body;

    if (!id) {
      return Response.json({ error: 'Task ID is required' }, { status: 400 });
    }

    const setClauses = [];
    const values = [];
    let paramCount = 0;

    if (status !== undefined) {
      paramCount++;
      setClauses.push(`status = $${paramCount}`);
      values.push(status);
    }

    if (priority !== undefined) {
      paramCount++;
      setClauses.push(`priority = $${paramCount}`);
      values.push(priority);
    }

    if (story_points !== undefined) {
      paramCount++;
      setClauses.push(`story_points = $${paramCount}`);
      values.push(story_points);
    }

    if (assigned_to !== undefined) {
      paramCount++;
      setClauses.push(`assigned_to = $${paramCount}`);
      values.push(assigned_to);
    }

    if (title !== undefined) {
      paramCount++;
      setClauses.push(`title = $${paramCount}`);
      values.push(title);
    }

    if (description !== undefined) {
      paramCount++;
      setClauses.push(`description = $${paramCount}`);
      values.push(description);
    }

    if (setClauses.length === 0) {
      return Response.json({ error: 'No fields to update' }, { status: 400 });
    }

    paramCount++;
    setClauses.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE tasks 
      SET ${setClauses.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await sql(query, values);
    
    if (result.length === 0) {
      return Response.json({ error: 'Task not found' }, { status: 404 });
    }

    return Response.json(result[0]);
  } catch (error) {
    console.error('Error updating task:', error);
    return Response.json({ error: 'Failed to update task' }, { status: 500 });
  }
}