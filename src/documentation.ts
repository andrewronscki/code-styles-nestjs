import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from '@nicholas.braun/nestjs-redoc';

export const documentation = async (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Authentication Service')
    .setDescription('The authentication service API description')
    .setVersion('1.0')
    .addTag('healthcheck')
    .build();

  const redocOptions: RedocOptions = {
    title: 'Code styles nestjs',
    logo: {
      url: 'https://redocly.github.io/redoc/petstore-logo.png',
      backgroundColor: '#F0F0F0',
      altText: 'Code styles nestjs Logo',
    },
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
    // auth: {
    //   enabled: true,
    //   user: 'admin',
    //   password: '123',
    // },
    tagGroups: [
      {
        name: 'Healthcheck resource',
        tags: ['healthcheck'],
      },
      {
        name: 'Cat resources',
        tags: ['cats'],
      },
    ],
  };
  const document = SwaggerModule.createDocument(app, config);
  await RedocModule.setup('/docs', app, document, redocOptions);

  SwaggerModule.setup('docs', app, document);
};
