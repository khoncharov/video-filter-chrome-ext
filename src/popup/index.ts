import './style.scss';
import RootComponent from './app';

function bootstrap() {
  const app = new RootComponent();
  app.init();
}

bootstrap();
