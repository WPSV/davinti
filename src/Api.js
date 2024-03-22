export const API_URL = "http://localhost:3001/api";

export function CONTACT_GET() {
  return {
    url: `${API_URL}/contacts`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}

export function CONTACT_GET_FILTERED({nome, numero}) {
  return {
    url: `${API_URL}/contacts/filtered?nome=${nome}&numero=${numero}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}

export function CONTACT_POST(body) {
  return {
    url: `${API_URL}/contact`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    },
  };
}

export function CONTACT_DELETE(id) {
  return {
    url: `${API_URL}/contact/delete/${id}`,
    options: {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  }
}

export function CONTACT_PUT(body) {
  return {
    url: `${API_URL}/contact/update`,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    },
  };
}

export function TELEFONE_DELETE(id) {
  return {
    url: `${API_URL}/telefone/delete/${id}`,
    options: {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  }
}
