import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";


export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;


    if (!token) {
      console.log('ROUTE GET Token no encontrado')
      return NextResponse.json({ err: "Token no encontrado" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.log('ROUTE GET JWT_SECRET no está configurado')
      return NextResponse.json({ err: "JWT_SECRET no está configurado" }, { status: 500 });
    }

    let payload;
    try {
      ({ payload } = await jwtVerify(token, new TextEncoder().encode(secret)));
    } catch (error) {
      console.log('ROUTE GET error al verificar el token', error)
      return NextResponse.json({ err: "Token inválido o expirado" }, { status: 403 });
    }

    const url = `http://localhost:3001/api/v1/tasks/${payload.sub}`;

    try {
      const tasksResponse = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!tasksResponse.ok) {
        return NextResponse.json({ err: "No se pudo obtener las tareas" }, { status: tasksResponse.status });
      }

      const tasks = await tasksResponse.json();
      return NextResponse.json({ tasks });
    } catch (error) {
      return NextResponse.json({ err: "Error de conexión con la API externa" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ err: "Error inesperado en la API", details: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Obtener y validar el body
    let body;
    try {
      body = await request.json();
      if (!body || Object.keys(body).length === 0) {
        return NextResponse.json({ err: "El cuerpo de la solicitud está vacío" }, { status: 400 });
      }
    } catch (error) {
      return NextResponse.json({ err: "Error al parsear el cuerpo de la solicitud" }, { status: 400 });
    }

    // Obtener token de cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      console.log("ROUTE POST Token no encontrado");
      return NextResponse.json({ err: "Token no encontrado" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.log('ROUTE GET JWT_SECRET no está configurado')
      return NextResponse.json({ err: "JWT_SECRET no está configurado" }, { status: 500 });
    }

    let payload;
    try {
      ({ payload } = await jwtVerify(token, new TextEncoder().encode(secret)));
    } catch (error) {
      console.log('ROUTE GET error al verificar el token', error)
      return NextResponse.json({ err: "Token inválido o expirado" }, { status: 403 });
    }

    const data = {
      description: body.description,
      userId: payload.sub.toString(),
    }

    // Realizar la petición a la API externa
    try {
      const taskResponse = await fetch("http://localhost:3001/api/v1/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      console.log("taskResponse status:", taskResponse.status);

      if (!taskResponse.ok) {
        const errorData = await taskResponse.json().catch(() => ({ err: "Error desconocido en la API" }));
        return NextResponse.json({ err: "No se pudo crear la tarea", details: errorData }, { status: taskResponse.status });
      }

      const taskData = await taskResponse.json();
      return NextResponse.json({ status: 200, msg: "Tarea creada", task: taskData });

    } catch (error) {
      console.error("Error en la petición a la API externa:", error);
      return NextResponse.json({ err: "Error de conexión con la API externa" }, { status: 500 });
    }

  } catch (error) {
    return NextResponse.json({ msg: "Error inesperado en la API", details: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      console.log('ROUTE DELETE Token no encontrado')
      return NextResponse.json({ err: "Token no encontrado" }, { status: 401 });
    }

    let body;
    try {
      body = await request.json();
      if (!body || Object.keys(body).length === 0) {
        return NextResponse.json({ err: "El cuerpo de la solicitud está vacío" }, { status: 400 });
      }
    } catch (error) {
      return NextResponse.json({ err: "Error al parsear el cuerpo de la solicitud" }, { status: 400 });
    }

    const taskId = body.id;
    const url = `http://localhost:3001/api/v1/tasks/${taskId}`;

    try {
      const taskResponse = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!taskResponse.ok) {
        return NextResponse.json({ err: "No se pudo eliminar la tarea" }, { status: taskResponse.status });
      }

      return NextResponse.json({ status: 200, msg: "Tarea eliminada" });
    } catch (error) {
      return NextResponse.json({ err: "Error de conexión con la API externa" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ err: "Error inesperado en la API", details: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
      if (!body || Object.keys(body).length === 0) {
        return NextResponse.json({ err: "El cuerpo de la solicitud está vacío" }, { status: 400 });
      }
    } catch (error) {
      return NextResponse.json({ err: "Error al parsear el cuerpo de la solicitud" }, { status: 400 });
    }

    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      console.log('ROUTE PATCH Token no encontrado')
      return NextResponse.json({ err: "Token no encontrado" }, { status: 401 });
    }

    let payload;
    try {
      ({ payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET)));
    } catch (error) {
      console.log('ROUTE PATCH error al verificar el token', error)
      return NextResponse.json({ err: "Token inválido o expirado" }, { status: 403 });
    }

    const taskId = body.id;
    const url = `http://localhost:3001/api/v1/tasks/${taskId}`;

    try {
      const taskResponse = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description: body.description }),
      });

      if (!taskResponse.ok) {
        return NextResponse.json({ err: "No se pudo actualizar la tarea" }, { status: taskResponse.status });
      }

      return NextResponse.json({ status: 200, msg: "Tarea actualizada" });
    } catch (error) {
      return NextResponse.json({ err: "Error de conexión con la API externa" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ err: "Error inesperado en la API", details: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
      if (!body || Object.keys(body).length === 0) {
        return NextResponse.json({ err: "El cuerpo de la solicitud está vacío" }, { status: 400 });
      }
    } catch (error) {
      return NextResponse.json({ err: "Error al parsear el cuerpo de la solicitud" }, { status: 400 });
    }

    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      console.log('ROUTE PATCH Token no encontrado')
      return NextResponse.json({ err: "Token no encontrado" }, { status: 401 });
    }

    const taskId = body.id;
    const url = `http://localhost:3001/api/v1/tasks/${taskId}/complete`;

    try {
      const taskResponse = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ done: body.done }),
      });

      if (!taskResponse.ok) {
        return NextResponse.json({ err: "No se pudo actualizar la tarea" }, { status: taskResponse.status });
      }

      return NextResponse.json({ status: 200, msg: "Tarea actualizada" });
    } catch (error) {
      return NextResponse.json({ err: "Error de conexión con la API externa" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ err: "Error inesperado en la API", details: error.message }, { status: 500 });
  }
}