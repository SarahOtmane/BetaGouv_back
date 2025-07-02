import request from 'supertest';
import app from '../src/config/service';
import sequelize from '../src/config/database';
import { connectDB } from '../src/config/database';

beforeAll(async () => {
    connectDB();
});

afterAll(async () => {
    await sequelize.close();
});

describe('Auth API', () => {
    const testUser = {
        email: 'test@example.com',
        password: 'Password123',
        phone_number: '0123456789',
        name: 'Test User',
        role: 'company',
        id_role: 1,
    };

    describe('Register', () => {
        it('should register a user successfully', async () => {
            const res = await request(app).post('/auth/register').send(testUser);
            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe('User registered successfully');
        });

        it('should not register with duplicate email', async () => {
            const res = await request(app).post('/auth/register').send(testUser);
            expect(res.statusCode).toBe(400);
        });

        it('should fail if email is missing', async () => {
            const { email, ...rest } = testUser;
            const res = await request(app).post('/auth/register').send(rest);
            expect(res.statusCode).toBe(400);
        });

        it('should fail if password is missing', async () => {
            const { password, ...rest } = testUser;
            const res = await request(app).post('/auth/register').send(rest);
            expect(res.statusCode).toBe(400);
        });

        it('should fail if phone_number is missing', async () => {
            const { phone_number, ...rest } = testUser;
            const res = await request(app).post('/auth/register').send(rest);
            expect(res.statusCode).toBe(400);
        });

        it('should fail if name is missing', async () => {
            const { name, ...rest } = testUser;
            const res = await request(app).post('/auth/register').send(rest);
            expect(res.statusCode).toBe(400);
        });

        it('should fail if role is missing', async () => {
            const { role, ...rest } = testUser;
            const res = await request(app).post('/auth/register').send(rest);
            expect(res.statusCode).toBe(400);
        });
    });


    describe('Login', () => {
        it('should login successfully with correct credentials', async () => {
            const res = await request(app).post('/auth/login').send({
                email: testUser.email,
                password: testUser.password,
            });
            expect(res.statusCode).toBe(200);
            expect(res.body.token).toBeDefined();
        });

        it('should fail login with wrong password', async () => {
            const res = await request(app).post('/auth/login').send({
                email: testUser.email,
                password: 'wrongpassword',
            });
            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Invalid email or password');
        });

        it('should fail login with non-existing email', async () => {
            const res = await request(app).post('/auth/login').send({
                email: 'nonexistent@example.com',
                password: 'whatever',
            });
            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Invalid email or password');
        });
    });
});
