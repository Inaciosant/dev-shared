import dotenv from 'dotenv';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';

import { router } from './routes';

dotenv.config();

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Dev Shared API',
    version: '1.0.0',
    description: 'Documentacao da API de setups, usuarios e comentarios.'
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT ?? 3333}`,
      description: 'Local'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'Mensagem de erro' }
        }
      },
      AuthRegisterInput: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string', example: 'Inacio' },
          email: { type: 'string', format: 'email', example: 'inacio@email.com' },
          password: { type: 'string', minLength: 6, example: '123456' }
        }
      },
      AuthLoginInput: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' }
        }
      },
      AuthResponse: {
        type: 'object',
        properties: {
          user: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' }
            }
          },
          token: { type: 'string' }
        }
      },
      GearItem: {
        type: 'object',
        required: ['category', 'name'],
        properties: {
          category: {
            type: 'string',
            enum: ['Keyboard', 'Mouse', 'Monitor', 'Headset', 'Chair', 'Desk', 'PC/Laptop', 'Other']
          },
          name: { type: 'string' },
          brand: { type: 'string' },
          model: { type: 'string' },
          link: { type: 'string' },
          details: { type: 'string' }
        }
      },
      SetupInput: {
        type: 'object',
        required: ['title', 'workRole', 'thumbnail'],
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          workRole: { type: 'string' },
          workModality: { type: 'string', enum: ['Remote', 'Hybrid', 'Office'] },
          thumbnail: { type: 'string' },
          gears: {
            type: 'array',
            items: { $ref: '#/components/schemas/GearItem' }
          },
          softwareStack: {
            type: 'array',
            items: { type: 'string' }
          },
          tags: {
            type: 'array',
            items: { type: 'string' }
          }
        }
      },
      CommentInput: {
        type: 'object',
        required: ['content'],
        properties: {
          content: { type: 'string', example: 'Setup muito bom!' }
        }
      },
      UserUpdateInput: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          bio: { type: 'string' },
          avatar: { type: 'string' },
          githubUrl: { type: 'string' },
          password: { type: 'string' }
        }
      },
      SetupMultipartInput: {
        type: 'object',
        required: ['title', 'workRole'],
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          workRole: { type: 'string' },
          workModality: { type: 'string', enum: ['Remote', 'Hybrid', 'Office'] },
          thumbnail: { type: 'string', format: 'binary' },
          gears: {
            type: 'string',
            description: 'JSON string. Ex: [{\"category\":\"Keyboard\",\"name\":\"K70\"}]'
          },
          softwareStack: {
            type: 'string',
            description: 'JSON string. Ex: [\"VSCode\",\"Figma\"]'
          },
          tags: {
            type: 'string',
            description: 'JSON string. Ex: [\"react\",\"ts\"]'
          }
        }
      },
      UserUpdateMultipartInput: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          bio: { type: 'string' },
          avatar: { type: 'string', format: 'binary' },
          githubUrl: { type: 'string' },
          password: { type: 'string' }
        }
      },
      UploadImageResponse: {
        type: 'object',
        properties: {
          url: { type: 'string', format: 'uri' },
          publicId: { type: 'string' },
          width: { type: 'number' },
          height: { type: 'number' },
          bytes: { type: 'number' },
          format: { type: 'string' }
        }
      }
    }
  },
  tags: [
    { name: 'Health' },
    { name: 'Auth' },
    { name: 'Setups' },
    { name: 'Comments' },
    { name: 'Users' },
    { name: 'Uploads' }
  ],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Healthcheck da API',
        responses: {
          200: {
            description: 'API online',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { status: { type: 'string', example: 'ok' } }
                }
              }
            }
          }
        }
      }
    },
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Registrar usuario',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AuthRegisterInput' }
            }
          }
        },
        responses: {
          201: {
            description: 'Usuario criado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthResponse' }
              }
            }
          },
          400: { description: 'Erro', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
        }
      }
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AuthLoginInput' }
            }
          }
        },
        responses: {
          200: {
            description: 'Sucesso',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthResponse' }
              }
            }
          },
          401: { description: 'Credenciais invalidas', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
        }
      }
    },
    '/setups': {
      get: {
        tags: ['Setups'],
        summary: 'Listar setups',
        parameters: [
          { in: 'query', name: 'role', schema: { type: 'string' }, required: false },
          { in: 'query', name: 'tag', schema: { type: 'string' }, required: false }
        ],
        responses: {
          200: { description: 'Lista de setups' },
          500: { description: 'Erro interno', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
        }
      },
      post: {
        tags: ['Setups'],
        summary: 'Criar setup',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/SetupInput' } },
            'multipart/form-data': { schema: { $ref: '#/components/schemas/SetupMultipartInput' } }
          }
        },
        responses: {
          201: { description: 'Setup criado' },
          400: { description: 'Dados invalidos', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          401: { description: 'Nao autenticado' }
        }
      }
    },
    '/setups/{id}': {
      get: {
        tags: ['Setups'],
        summary: 'Detalhar setup',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Detalhes do setup e comentarios' },
          404: { description: 'Nao encontrado' }
        }
      },
      put: {
        tags: ['Setups'],
        summary: 'Atualizar setup',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/SetupInput' } },
            'multipart/form-data': { schema: { $ref: '#/components/schemas/SetupMultipartInput' } }
          }
        },
        responses: {
          200: { description: 'Setup atualizado' },
          403: { description: 'Sem permissao' },
          404: { description: 'Nao encontrado' }
        }
      },
      delete: {
        tags: ['Setups'],
        summary: 'Apagar setup',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          204: { description: 'Removido' },
          403: { description: 'Sem permissao' },
          404: { description: 'Nao encontrado' }
        }
      }
    },
    '/setups/{setupId}/comments': {
      post: {
        tags: ['Comments'],
        summary: 'Criar comentario em setup',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'setupId', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/CommentInput' } } }
        },
        responses: {
          201: { description: 'Comentario criado' },
          404: { description: 'Setup nao encontrado' }
        }
      }
    },
    '/comments/{id}': {
      delete: {
        tags: ['Comments'],
        summary: 'Apagar comentario',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          204: { description: 'Removido' },
          403: { description: 'Sem permissao' },
          404: { description: 'Comentario nao encontrado' }
        }
      }
    },
    '/uploads/image': {
      post: {
        tags: ['Uploads'],
        summary: 'Upload de imagem para Cloudinary (max 5MB)',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['image'],
                properties: {
                  image: {
                    type: 'string',
                    format: 'binary'
                  },
                  folder: {
                    type: 'string',
                    enum: ['avatars', 'setups', 'general'],
                    default: 'general'
                  }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Imagem enviada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UploadImageResponse' }
              }
            }
          },
          400: { description: 'Arquivo invalido ou > 5MB' },
          401: { description: 'Nao autenticado' }
        }
      }
    },
    '/users/me': {
      put: {
        tags: ['Users'],
        summary: 'Atualizar usuario autenticado',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/UserUpdateInput' } },
            'multipart/form-data': { schema: { $ref: '#/components/schemas/UserUpdateMultipartInput' } }
          }
        },
        responses: {
          200: { description: 'Usuario atualizado' },
          404: { description: 'Usuario nao encontrado' }
        }
      },
      delete: {
        tags: ['Users'],
        summary: 'Deletar conta autenticada',
        security: [{ bearerAuth: [] }],
        responses: {
          204: { description: 'Conta removida' },
          500: { description: 'Erro interno' }
        }
      }
    }
  }
};

app.get('/', (_req, res) => {
  res.redirect('/api-docs');
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
app.use(router);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'Imagem excede o limite de 5MB.' });
    }

    return res.status(400).json({ error: `Erro no upload: ${err.message}` });
  }

  if (err instanceof Error && (err.message.includes('Arquivo invalido') || err.message.includes('Cloudinary nao configurado'))) {
    return res.status(400).json({ error: err.message });
  }

  console.error(err);
  return res.status(500).json({ error: 'Erro interno do servidor' });
});

const port = Number(process.env.PORT ?? 3333);
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.warn('MONGO_URI nao definida. A API vai iniciar sem conectar ao MongoDB.');
  app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
    console.log(`Swagger: http://localhost:${port}/api-docs`);
  });
} else {
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log('MongoDB conectado');
      app.listen(port, () => {
        console.log(`API rodando na porta ${port}`);
        console.log(`Swagger: http://localhost:${port}/api-docs`);
      });
    })
    .catch((error) => {
      console.error('Erro ao conectar no MongoDB:', error);
      process.exit(1);
    });
}
