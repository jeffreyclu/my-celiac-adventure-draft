export const isAuthorized = async () => {
  try {
    const req = await fetch(`/api/auth`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!req.ok) {
      return false;
    }
    const resp = await req.json();
    if (!resp.success) {
      return false;
    }
    return resp;
  } catch (err) {
    return err;
  }
};

export const isAdminAuthorized = async () => {
  try {
    const req = await fetch(`/api/auth-admin`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!req.ok) {
      return false;
    }
    const resp = await req.json();
    if (!resp.success) {
      return false;
    }
    return resp;
  } catch (err) {
    return err;
  }
};
