import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const role = searchParams.get('role');

    let query = 'SELECT * FROM team_members WHERE 1=1';
    const params = [];
    let paramCount = 0;

    if (status) {
      paramCount++;
      query += ` AND status = $${paramCount}`;
      params.push(status);
    }

    if (role) {
      paramCount++;
      query += ` AND role ILIKE $${paramCount}`;
      params.push(`%${role}%`);
    }

    query += ' ORDER BY created_at DESC';

    const teamMembers = await sql(query, params);
    return Response.json(teamMembers);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return Response.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, role, skills = [], status = 'active' } = body;

    if (!name || !email || !role) {
      return Response.json({ error: 'Name, email, and role are required' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO team_members (name, email, role, skills, status)
      VALUES (${name}, ${email}, ${role}, ${skills}, ${status})
      RETURNING *
    `;

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    if (error.message.includes('duplicate key')) {
      return Response.json({ error: 'Email already exists' }, { status: 409 });
    }
    return Response.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, name, email, role, skills, status } = body;

    if (!id) {
      return Response.json({ error: 'Team member ID is required' }, { status: 400 });
    }

    const setClauses = [];
    const values = [];
    let paramCount = 0;

    if (name !== undefined) {
      paramCount++;
      setClauses.push(`name = $${paramCount}`);
      values.push(name);
    }

    if (email !== undefined) {
      paramCount++;
      setClauses.push(`email = $${paramCount}`);
      values.push(email);
    }

    if (role !== undefined) {
      paramCount++;
      setClauses.push(`role = $${paramCount}`);
      values.push(role);
    }

    if (skills !== undefined) {
      paramCount++;
      setClauses.push(`skills = $${paramCount}`);
      values.push(skills);
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
      UPDATE team_members 
      SET ${setClauses.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await sql(query, values);
    
    if (result.length === 0) {
      return Response.json({ error: 'Team member not found' }, { status: 404 });
    }

    return Response.json(result[0]);
  } catch (error) {
    console.error('Error updating team member:', error);
    if (error.message.includes('duplicate key')) {
      return Response.json({ error: 'Email already exists' }, { status: 409 });
    }
    return Response.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}