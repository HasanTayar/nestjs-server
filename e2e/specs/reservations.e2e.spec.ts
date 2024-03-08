describe('Reservations', () => {
  beforeAll(async () => {
    const user = {
      email: 'test@test.com',
      password: 'StrongPassword123!',
    };
    await fetch('http://auth:3001/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });
    const jwt = await res.text();
    console.log(jwt);
  });
  test('Create', () => {
    expect(true).toBeTruthy();
  });
});
