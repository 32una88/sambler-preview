const members = {
  bruna: { pass: "1006", name: "Bruna" },
  andressa: { pass: "fogo", name: "Andressa" }
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método não permitido" })
    };
  }

  try {
    const { user, pass } = JSON.parse(event.body);

    if (!user || !pass) {
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: false, error: "Usuário e senha obrigatórios" })
      };
    }

    const userData = members[user.toLowerCase()];
    
    if (!userData || userData.pass !== pass) {
      return {
        statusCode: 401,
        body: JSON.stringify({ ok: false, error: "Usuário ou senha inválido" })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, name: userData.name })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: "Erro interno do servidor" })
    };
  }
};
